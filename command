CREATE DATABASE mydatabase CHARACTER SET utf8 COLLATE utf8_general_ci;


db.articles.updateMany({}, { $set: {"flag": true} })


7401573336

6603935673
ssh -i "qunagminh-58.pem" ubuntu@ec2-52-221-235-60.ap-southeast-1.compute.amazonaws.com



docker-compose.yml -> dockerfile

dockerfile đại khái là khai báo 1 file sử dụng service của OS hay là Env, dĩ nhiên trên đó sẽ có các lệnh



//git flow 

** switch branch tu develop

git checkout -b feature/ten/tenchucnang

** su dung rebase de update 

git commit --amend

git checkout develop

git pull

git checkout feature/ten/tenchucnang

git rebase origin develop

** gop commit 
git rebase -i HEAD~(so commit)
 
ko sua cai dau tien
cac cai sau chuyen pick -> s

** commit lien tiep

git commit --amend

** push lien tiep

git push -f 
docker run -v /abc:/abc -p 80:80 -it ubuntu /bin/bash


** bo commit 1 file 
git checkout -- <tenfile>
git rm --cache  api/controllers/ContactController.js
##Migration##
php artisan migrate 
php artisan make:migration add_votes_to_users_table --table=users
##Auth##
php artisan make:auth
Eloquent
Model 
