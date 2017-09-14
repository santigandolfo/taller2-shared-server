FROM node:6.11.2
MAINTAINER Taller2 Team APGB

COPY . /nodeapp
WORKDIR /nodeapp
RUN npm install --production

RUN chmod +x /nodeapp/start.sh
CMD ["/nodeapp/start.sh"] 