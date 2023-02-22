FROM node:16-alpine
# VOLUME /usr/app/server/uploads/api
EXPOSE 3000
WORKDIR /app

# Copy Files to container
COPY . .
# Build Front-end
RUN yarn

CMD npm run start
