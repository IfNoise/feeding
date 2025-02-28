#!/bin/bash

# Путь к папке для резервных копий
BACKUP_DIR="/tmp/mongodb/backups"

# Текущая дата
DATE=$(date +%Y-%m-%d_%H-%M-%S)

# Команда для резервного копирования
mongodump --uri="$MONGO_URI/$MONGO_DB" --gzip --out="$BACKUP_DIR/$DATE"

# Проверка успешности выполнения команды
if [ $? -eq 0 ]; then
  echo "Backup completed successfully at $DATE"
else
  echo "Backup failed at $DATE"
fi
