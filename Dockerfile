# Usar una imagen oficial y ligera de Node.js
FROM node:22-alpine

# Definir el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de configuración de dependencias
COPY package*.json ./

# Instalar todas las dependencias (necesarias para la compilación con esbuild)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar el proyecto usando el script definido en el package.json
RUN npm run build

# Exponer el puerto en el que corre la API (ajusta si tu app usa uno distinto)
EXPOSE 3000

# Comando para iniciar el servidor compilado
CMD ["npm", "start"]