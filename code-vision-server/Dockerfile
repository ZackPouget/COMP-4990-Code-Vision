# Fetching the minified node image on apline linux
FROM node:16

# Setting up the work directory
WORKDIR /express-docker

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Exposing server port
EXPOSE 5000

# Starting our application
CMD [ "node", "server.js" ]