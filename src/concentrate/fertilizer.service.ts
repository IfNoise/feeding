import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Concentrate,
  ConcentrateDocument,
} from 'src/schemas/concentrate.schema';
import { Fertilizer, FertilizerDocument } from 'src/schemas/fertilizer.schema';
import { AddFertilizerDto } from './dto/add-fertilizer.dto';
import { UpdateFertilizerDto } from './dto/update-fertilizer.dto';

/**
 * Service class for managing fertilizers in a concentrate.
 */
@Injectable()
export class FertilizerService {
  /**
   * Logger instance.
   */
  private readonly logger = new Logger(FertilizerService.name);
  /**
   *  Constructor for the FertilizerService class.
   * @param fertilizerModel
   * @param concentrateModel
   */
  constructor(
    @InjectModel(Fertilizer.name)
    private readonly fertilizerModel: Model<FertilizerDocument>,
    @InjectModel(Concentrate.name)
    private readonly concentrateModel: Model<ConcentrateDocument>,
  ) {}

  /**
   * Finds all fertilizers in a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @returns An array of fertilizers.
   */
  async findAll(concentrateId: string): Promise<Fertilizer[]> {
    const concentrate: Concentrate =
      await this.concentrateModel.findById(concentrateId);
    const fertilizers = await Promise.all(
      concentrate.fertilizers.map(async (f: any) => {
        return await this.fertilizerModel.findById(f.fertilizer);
      }),
    );
    return fertilizers;
  }

  /**
   * Adds a new fertilizer to a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @param addFertilizerDto - The data transfer object containing fertilizer details.
   * @returns The updated concentrate.
   */
  async addFertilizer(
    concentrateId: string,
    addFertilizerDto: AddFertilizerDto,
  ): Promise<Concentrate> {
    const concentrate = await this.concentrateModel.findById(concentrateId);
    concentrate.fertilizers.push(addFertilizerDto);
    await concentrate.save();
    await this.calculateComposition(concentrate);
    return concentrate;
  }

  /**
   * Updates a fertilizer in a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @param fertilizerId - The ID of the fertilizer.
   * @param updateFertilizerDto - The data transfer object containing updated fertilizer details.
   * @returns The updated concentrate.
   * @throws NotFoundException if the fertilizer is not found.
   */
  async updateFertilizer(
    concentrateId: string,
    fertilizerId: string,
    updateFertilizerDto: UpdateFertilizerDto,
  ): Promise<Concentrate> {
    const concentrate = await this.concentrateModel.findById(concentrateId);
    const fertilizer = concentrate.fertilizers.find(
      (f: any) => f._id == fertilizerId,
    );
    if (!fertilizer) {
      throw new NotFoundException(
        `Fertilizer with ID ${fertilizerId} not found`,
      );
    }
    fertilizer.concentration = updateFertilizerDto.concentration;
    concentrate.save().then((concentrate) => {
      this.calculateComposition(concentrate);
    });
    return concentrate;
  }

  /**
   * Removes a fertilizer from a concentrate.
   * @param concentrateId - The ID of the concentrate.
   * @param fertilizerId - The ID of the fertilizer.
   * @returns The updated concentrate.
   * @throws NotFoundException if the fertilizer is not found.
   */
  async removeFertilizer(
    concentrateId: string,
    fertilizerId: string,
  ): Promise<ConcentrateDocument> {
    const concentrate = await this.concentrateModel.findById(concentrateId);
    const index = concentrate.fertilizers.findIndex(
      (f: any) => f.fertilizer == fertilizerId,
    );
    concentrate.fertilizers.splice(index, 1);
    await concentrate.save();
    await this.calculateComposition(concentrate);
    return concentrate;
  }

  /**
   * Calculates the composition of a concentrate.
   * @param concentrate - The concentrate document.
   * @returns The updated concentrate.
   */
  async calculateComposition(
    concentrate: ConcentrateDocument,
  ): Promise<ConcentrateDocument> {
    const fertilizers = await Promise.all(
      concentrate.fertilizers.flatMap(async (f: any) => {
        const fertilizer: FertilizerDocument =
          await this.fertilizerModel.findById(f.fertilizer);
        if (!fertilizer) {
          throw new NotFoundException('Fertilizer not found');
        }
        return { ...fertilizer.toObject(), concentration: f.concentration };
      }),
    );
    this.logger.debug(fertilizers);
    const content: any[] = fertilizers
      .flatMap((f) =>
        f.content.map((e) => {
          return {
            ...e,
            concentration: (e.concentration * f.concentration) / 1000,
          };
        }),
      )
      .reduce((acc, curr) => {
        const existing = acc.find((item) => item.element === curr.element);
        if (existing) {
          existing.concentration += curr.concentration;
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);

    let kationes = 0;
    let aniones = 0;
    fertilizers.forEach((f) => {
      kationes += f.kationes * f.concentration;
      aniones += f.aniones * f.concentration;
    });
    concentrate.kationes = kationes;
    concentrate.aniones = aniones;
    concentrate.content = content;
    return await concentrate.save();
  }
}
