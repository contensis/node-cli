FROM node:18-alpine as builder

# RUN apk add --no-cache libsecret-dev
WORKDIR /usr/src/app
COPY package.json .
COPY lerna.json .
COPY .yarn .yarn
COPY .yarnrc .
COPY yarn.lock .
COPY packages/contensis-cli/esbuild.config.js .
COPY packages/contensis-cli/package.json .
COPY packages/contensis-cli/package-lock.json .
COPY packages/contensis-cli/tsconfig.json .
COPY packages/contensis-cli/patches patches
RUN npm ci --prefer-offline --no-audit --loglevel error
RUN npm run postinstall
COPY packages/contensis-cli/src src
RUN npm run build

FROM node:18-alpine
# needs this to install keytar npm package
# adds almost 80MB to the container 
# RUN apk add --no-cache libsecret-dev 
WORKDIR /usr/src/app
# copy assets from source folder
COPY packages/contensis-cli/package.json .
COPY packages/contensis-cli/package-lock.json .
COPY packages/contensis-cli/cli.js .
COPY packages/contensis-cli/patches patches
# adds almost 100MB to the container
RUN npm install --prefer-offline --no-audit --production --loglevel error
RUN npm run postinstall
# copy ./dist folder from builder container
COPY --from=builder /usr/src/app/dist dist
# npx link will create the npm binaries in /node_modules/.bin
# exit 0 allows the script to bypass errors with creating symlinks
RUN npx link .; exit 0
# add our ./node_modules/.bin folder to PATH
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
# call the executable
CMD [ "/usr/src/app/node_modules/.bin/contensis" ]
