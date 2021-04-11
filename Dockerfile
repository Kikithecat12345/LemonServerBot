FROM melon/debian-for-discord-vc

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get install ffmpeg -y

RUN npm install
RUN npm audit fix

COPY . .
COPY FranklinGothic.ttf /usr/share/fonts

EXPOSE 8080
CMD [ "npm", "start" ]
