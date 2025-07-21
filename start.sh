#!/bin/bash

echo "Construindo containers..."
docker-compose build

echo "Subindo containers..."
docker-compose up -d

echo "API e bancos estão rodando!"
