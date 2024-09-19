# Usa una imagen base de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instala pnpm globalmente
RUN npm install -g pnpm && pnpm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Construye la aplicación
RUN pnpm run build

# Expone el puerto que utilizará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["pnpm", "run", "start:prod"]
