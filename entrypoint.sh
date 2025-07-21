#!/bin/bash

echo "Gerando Prisma Client (caso necessário)..."
npx prisma generate

echo "Iniciando aplicação..."
npm run start-dev
