FROM node:18

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (para melhor cache)
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Gera o Prisma Client no build
RUN npx prisma generate

# Torna o script de entrypoint executável
RUN chmod +x ./entrypoint.sh

EXPOSE 3002

# Usa o entrypoint para garantir que tudo esteja pronto
ENTRYPOINT ["./entrypoint.sh"]
