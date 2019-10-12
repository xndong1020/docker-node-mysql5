FROM node:10-alpine

# Changing permissions for directories recursively
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile.
WORKDIR /home/node/app

COPY package*.json ./

# run as user 'node'
USER node

RUN npm install

# COPY --chown=<user>:<group> <hostPath> <containerPath>
COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]
