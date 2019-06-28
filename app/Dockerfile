FROM node

ENV NODEDIR=/nodeapp

RUN mkdir $NODEDIR

WORKDIR /nodeapp

COPY package.json /nodeapp/

RUN npm install

COPY . /nodeapp/

CMD ["npm", "start"]