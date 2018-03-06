FROM node:9.7.1-alpine
COPY . /e2e
WORKDIR /e2e
# https://stackoverflow.com/questions/18136746/npm-install-failed-with-cannot-run-in-wd
RUN npm install --unsafe-perm
EXPOSE 5858
ENTRYPOINT ["npm", "run", "test-container-chrome"]