FROM node:alpine

ENV CI=true

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY . .

EXPOSE 3010

CMD ["yarn", "run", "dev"]
