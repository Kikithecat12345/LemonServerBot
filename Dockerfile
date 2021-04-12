FROM melon/debian-for-discord-vc-with-ffmpeg

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm audit fix

COPY . .
COPY FranklinGothic.ttf /usr/share/fonts

EXPOSE 8080
CMD [ "npm", "start" ]
