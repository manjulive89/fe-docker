#!/bin/bash
echo "Docker Container check"
sudo docker ps -aq
sudo docker stop $(docker ps -aq)
sudo docker rm $(docker ps -aq)
sudo docker rmi $(docker images -q)
cd /home/sanjay
rm -rf fe-docker
git clone https://github.com/manjulive89/fe-docker.git
npm ci
npm build run
docker build -t sanjay app .
docker run -d -p 5000:5000 --name app1.0 sanjayapp
