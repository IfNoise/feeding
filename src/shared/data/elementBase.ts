export const elementBase: any = [
  {
    name: 'Nitrogen',
    symbol: 'N',
    mMass: 14,
    forms: [
      {
        name: 'Nitrate',
        symbol: 'NO3',
        ione: {
          symbol: 'NO3-',
          charge: -1,
          mMass: 62,
          сonductivityCoefficient: 71.4, // Удельная проводимость
          atomCount: 1,
        },
        mMass: 14,
      },
      {
        name: 'Ammonium',
        symbol: 'NH4',
        ione: {
          symbol: 'NH4+',
          charge: 1,
          mMass: 18,
          сonductivityCoefficient: 73.4,
          atomCount: 1,
        },
        mMass: 14,
      },
    ],
  },
  {
    name: 'Phosphorus',
    symbol: 'P',
    mMass: 62,
    forms: [
      {
        name: 'Phosphate',
        symbol: 'P2O5',
        ione: {
          symbol: 'PO4-3',
          charge: -3,
          mMass: 95,
          сonductivityCoefficient: 79.0, //Удельная проводимость ионов PO4-3 79,0 см2/моль
          atomCount: 1, // В P2O5 содержится 2 атома фосфора
        },
        mMass: 142,
      },
    ],
  },
  {
    name: 'Potassium',
    symbol: 'K',
    mMass: 39,
    forms: [
      {
        name: 'Potassium Oxide',
        symbol: 'K2O',
        ione: {
          symbol: 'K+',
          charge: 1,
          mMass: 39,
          сonductivityCoefficient: 73.4, //Удельная проводимость ионов K+ 73,4 см2/моль
          atomCount: 2, // В K2O содержится 2 атома калия
        },
        mMass: 94,
      },
      {
        name: 'Potassium',
        symbol: 'K',
        ione: {
          symbol: 'K+',
          charge: 1,
          mMass: 39,
          сonductivityCoefficient: 73.4, //Удельная проводимость ионов K+ 73,4 см2/моль
        },
        mMass: 39,
      },
    ],
  },
  {
    name: 'Calcium',
    symbol: 'Ca',
    mMass: 40,
    forms: [
      {
        name: 'Calcium Oxide',
        symbol: 'CaO',
        ione: {
          symbol: 'Ca+2',
          charge: 2,
          mMass: 40,
          сonductivityCoefficient: 61.2, //Удельная проводимость ионов Ca+2 61,2 см2/моль
          atomCount: 1, // В CaO содержится 1 атом кальция
        },
        mMass: 56,
      },
      {
        name: 'Calcium Chelate',
        symbol: 'Ca',
        ione: null,
        charge: 0,
        mMass: 40,
      },
    ],
  },
  {
    name: 'Magnesium',
    symbol: 'Mg',
    mMass: 24,
    forms: [
      {
        name: 'Magnesium Oxide',
        symbol: 'MgO',
        ione: {
          symbol: 'Mg+2',
          charge: 2,
          mMass: 24,
          сonductivityCoefficient: 53.0, //Удельная проводимость ионов Mg+2 53,0 см2/моль
          atomCount: 1, // В MgO содержится 1 атом магния
        },
        mMass: 40,
      },
      {
        name: 'Magnesium Chelate',
        symbol: 'Mg',
        ione: null,
        mMass: 24,
      },
    ],
  },
  {
    name: 'Sulfur',
    symbol: 'S',
    mMass: 32,
    forms: [
      {
        name: 'Sulfate',
        symbol: 'SO4',
        ione: {
          symbol: 'SO4-2',
          charge: -2,
          mMass: 96,
          сonductivityCoefficient: 79.0, //Удельная проводимость ионов SO4-2 79,0 см2/моль
          atomCount: 1, // В SO4 содержится 1 атом серы
        },
        mMass: 96,
      },
    ],
  },
  {
    name: 'Iron',
    symbol: 'Fe',
    mMass: 56,
    forms: [
      {
        name: 'Iron Oxide',
        symbol: 'Fe2O3',
        ione: {
          symbol: 'Fe+3',
          charge: 3,
          mMass: 56,
          сonductivityCoefficient: 61.2, //Удельная проводимость ионов Fe+3 61,2 см2/моль
          atomCount: 2, // В Fe2O3 содержится 2 атома железа
        },
        mMass: 160,
      },
      {
        name: 'Iron Chelate',
        symbol: 'Fe',
        ione: null,
        charge: 0,
        mMass: 56,
      },
    ],
  },
  {
    name: 'Manganese',
    symbol: 'Mn',
    mMass: 55,
    forms: [
      {
        name: 'Manganese Oxide',
        symbol: 'MnO',
        ione: {
          symbol: 'Mn+2',
          charge: 2,
          mMass: 55,
          сonductivityCoefficient: 53.0, //Удельная проводимость ионов Mn+2 53,0 см2/моль
        },
        mMass: 71,
      },
      {
        name: 'Manganese Chelate',
        symbol: 'Mn',
        ione: null,
        charge: 0,
        mMass: 55,
      },
    ],
  },
  {
    name: 'Zinc',
    symbol: 'Zn',
    mMass: 65,
    forms: [
      {
        name: 'Zinc Oxide',
        symbol: 'ZnO',
        ione: {
          symbol: 'Zn+2',
          charge: 2,
          mMass: 65,
          сonductivityCoefficient: 61.2, //Удельная проводимость ионов Zn+2 61,2 см2/моль
        },
        mMass: 81,
      },
      {
        name: 'Zinc Chelate',
        symbol: 'Zn',
        ione: null,
        charge: 0,
        mMass: 65,
      },
    ],
  },
  {
    name: 'Copper',
    symbol: 'Cu',
    mMass: 63,
    forms: [
      {
        name: 'Copper Oxide',
        symbol: 'CuO',
        ione: {
          symbol: 'Cu+2',
          charge: 2,
          mMass: 63,
          сonductivityCoefficient: 61.2, //Удельная проводимость ионов Cu+2 61,2 см2/моль
        },
        mMass: 79,
      },
      {
        name: 'Copper Chelate',
        symbol: 'Cu',
        ione: null,
        mMass: 63,
      },
    ],
  },
  {
    name: 'Boron',
    symbol: 'B',
    mMass: 11,
    forms: [
      {
        name: 'Boric Acid',
        symbol: 'H3BO3',
        ione: null,
        mMass: 61,
      },
      {
        name: 'Boron',
        symbol: 'B',
        ione: null,
        mMass: 11,
      },
    ],
  },
  {
    name: 'Molybdenum',
    symbol: 'Mo',
    mMass: 96,
    forms: [
      {
        name: 'Molybdenum Chelate',
        symbol: 'Mo',
        ione: null,
        charge: 6,
        mMass: 96,
      },
    ],
  },
  {
    name: 'Nickel',
    symbol: 'Ni',
    mMass: 59,
    forms: [
      {
        name: 'Nickel',
        symbol: 'Ni',
        ione: {
          symbol: 'Ni+2',
          charge: 2,
          mMass: 59,
          сonductivityCoefficient: 50.0,
          atomCount: 1,
        },
        mMass: 59,
      },
    ],
  },
  {
    name: 'Cobalt',
    symbol: 'Co',
    mMass: 59,
    forms: [
      {
        name: 'Cobalt',
        symbol: 'Co',
        ione: {
          symbol: 'Co+2',
          charge: 2,
          mMass: 59,
          сonductivityCoefficient: 53.0,
          atomCount: 1,
        },
        mMass: 59,
      },
    ],
  },
  {
    name: 'Sodium',
    symbol: 'Na',
    mMass: 23,
    forms: [
      {
        name: 'Sodium',
        symbol: 'Na',
        ione: {
          symbol: 'Na+',
          charge: 1,
          mMass: 23,
          сonductivityCoefficient: 50.1,
          atomCount: 1,
        },
        mMass: 23,
      },
    ],
  },
  {
    name: 'Silicon',
    symbol: 'Si',
    mMass: 28,
    forms: [
      {
        name: 'Silicon',
        symbol: 'Si',
        ione: {
          symbol: 'Si+4',
          charge: 4,
          mMass: 28,
          сonductivityCoefficient: 40.0,
          atomCount: 1,
        },
        mMass: 28,
      },
    ],
  },
];
