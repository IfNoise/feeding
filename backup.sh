#!/bin/bash

# Путь к папке для резервных копий
BACKUP_DIR="/tmp/mongodb/backups"

# Текущая дата
DATE=$(date +%Y-%m-%d_%H-%M-%S)

# Команда для резервного копирования
mongodump --uri="mongodb://ddweed.org:27017/SurinAgro" --gzip --out="$BACKUP_DIR/$DATE"

# Проверка успешности выполнения команды
if [ $? -eq 0 ]; then
  echo "Backup completed successfully at $DATE"
else
  echo "Backup failed at $DATE"
fi
