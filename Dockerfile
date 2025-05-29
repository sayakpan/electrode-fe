# frontend/Dockerfile
FROM node:22.16.0

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]