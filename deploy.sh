#!/bin/bash
git clone https://github.com/manjulive89/fe-docker.git
cd fe-docker
npm ci
npm build run
docker build -t sanjay app .
docker run -d -p 5000:5000 --name app1.0 sanjayapp

