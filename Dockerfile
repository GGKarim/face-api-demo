FROM node:8.9.3-alpine
RUN mkdir -p /usr/src
COPY ./js/* /usr/src/
COPY ./css/* /usr/src/
COPY ./* /usr/src/
WORKDIR /usr/src
RUN npm install
CMD node /usr/src/index.html