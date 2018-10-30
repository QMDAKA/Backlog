FROM node:latest
LABEL Name=backlog Version=1.0.0

# make the 'app' folder the current working directory
WORKDIR /app
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# install project dependencies
RUN npm install sails@~0.12.0 --force --save
COPY . .
RUN cd ./views/Frontlog && npm run build
RUN cd /app
EXPOSE 80
CMD ["node","app.js","--prod"]


