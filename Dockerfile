FROM node:6.11.2
MAINTAINER Taller2 Team APGB

COPY . /nodeapp
WORKDIR /nodeapp
RUN apt-get update
RUN apt-get install -y sqlite3
RUN npm install

RUN chmod +x /nodeapp/start.sh
CMD ["/nodeapp/start.sh"] 