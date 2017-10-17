#!/bin/bash
set -e

if [ "$ENV" = 'DEVELOPMENT' ]; then
  echo "Running Development Server"
  cd /nodeapp
  exec npm run build^start
else
  echo "Running Production Server"
  cd /nodeapp
  exec npm run build^start
fi