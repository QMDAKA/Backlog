#!/bin/bash
#Define bash global variable
#This variable is global and can be used anywhere in this bash script
#stop all container
docker stop $(docker ps -a -q)
#remove container
docker rm $(docker ps -a -q) -f
#remove image backlog
docker rmi backlog -f
#remove iamge zz
docker rmi zzzdakazzz095/backlog -f
#build image
docker build -t backlog .
#tagging image
docker tag backlog zzzdakazzz095/backlog
#push
docker push zzzdakazzz095/backlog

