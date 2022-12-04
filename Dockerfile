ARG app_image
ARG builder_image
FROM ${builder_image} AS prepare

# RUN apk add --no-cache libsecret-dev
WORKDIR /usr/src/app
COPY .yarn .yarn
COPY .yarnrc .
COPY packages/contensis-cli/package.json .
COPY packages/contensis-cli/patches patches
RUN yarn global add patch-package --silent --non-interactive --cache-folder ./cache
RUN yarn install --silent --non-interactive --prefer-offline --cache-folder ./cache && patch-package
# RUN yarn run postinstall

FROM ${builder_image} AS build
COPY packages/contensis-cli/esbuild.config.js .
COPY packages/contensis-cli/tsconfig.json .
COPY packages/contensis-cli/src src
RUN yarn run build

FROM ${app_image} AS final
WORKDIR /usr/src/app
RUN apk add jq -q
# copy assets from source folder
COPY packages/contensis-cli/package.json .
COPY packages/contensis-cli/cli.js .
COPY packages/contensis-cli/patches patches
# adds almost 100MB to the container
RUN npm install patch-package --global --prefer-offline --no-audit
RUN npm install --prefer-offline --no-audit --production --loglevel error && patch-package
# RUN npm run postinstall
# copy ./dist folder from build layer
COPY --from=build /usr/src/app/dist dist
# npx link will create the npm binaries in /node_modules/.bin
# exit 0 allows the script to bypass errors with creating symlinks
RUN npx link .; exit 0
# add our ./node_modules/.bin folder to PATH
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
# set an env var so we can alter app behaviour when running inside the container
ENV CONTAINER_CONTEXT=true
# call the executable
CMD [ "/usr/src/app/node_modules/.bin/contensis" ]
