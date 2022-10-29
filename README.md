# Pitch Deck Client

Pitch Deck Client is a [Create React App](https://create-react-app.dev) [Node.js](https://nodejs.org) project and is using [Yarn](https://yarnpkg.com) as a dependency manager. It uses [Pitch Deck Server](https://github.com/jokka/pitch-deck-server) as a backend, so make sure you have it running.

## How to run

If you have [Yarn](https://yarnpkg.com) installed, just run the following command.

```shell
yarn && yarn start
```

If you don’t, you could try with [NPM](https://www.npmjs.com), which is most likely going to work just as well.

```shell
npm i && npm run start
```

Alternatively, you can use [Docker.](https://www.docker.com)

```shell
docker run -it --rm \
  --entrypoint /bin/bash \
  --workdir /home/node/app \
  --name pitch-deck-client \
  -p 3000:3000 \
  -v $(pwd):/home/node/app \
  node:16 \
  -c "yarn && yarn build && npx --yes serve -s build"
```

And finally open [http://localhost:3000.](http://localhost:3000) 🥳
