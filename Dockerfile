FROM node:15

WORKDIR /app

COPY package.json .

ARG NODE_ENV
# if we are in development mode run npm install
# if we are in production mode run npm install --only=production

RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . ./

ENV PORT 3000
EXPOSE $PORT

CMD ["node", "index.js"]