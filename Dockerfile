FROM node:20-bullseye

RUN apt-get update -y && apt-get upgrade -y
        
WORKDIR /app

COPY . .

RUN chmod +x wait-for-it.sh

RUN chmod +x start.sh

RUN npm install

ENTRYPOINT ["./wait-for-it.sh" , "172.17.0.2:3306"  , "--timeout=300" , "--"]

CMD ["./start.sh"]





