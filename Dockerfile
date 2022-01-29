FROM node:14.18.3

WORKDIR /src

COPY ["package.json", "package-lock.json", "./"] 

COPY . .

RUN echo "Asia/Shanghai" > /etc/timezone \
    && npm i nrm -g \
    && nrm use taobao \
    && npm i pm2 -g

CMD ["pm2-runtime", "start.js"]
