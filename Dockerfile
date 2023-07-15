FROM node:16-alpine AS build
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine
WORKDIR /frontend
COPY --from=build /app/.next /frontend/.next
COPY --from=build /app/public /frontend/public
COPY --from=build /app/package.json /frontend/package.json
COPY --from=build /app/node_modules/ /frontend/node_modules/
COPY --from=build /app/.env /frontend/.env

EXPOSE 3000

CMD [ "npm", "start" ]
