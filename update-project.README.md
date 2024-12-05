# rentx_prod


1- BUILD THE PROJECT

go in dev project

go in angular folder

run npm run build

go in nesjs folder

run npm run build-prod

go in this repository

git add .

git push origin main

2- RUN IN INSTANCE

in the key repository (in dev project)

sudo ssh -i "prod_rentx.pem" admin@ec2-13-36-119-43.eu-west-3.compute.amazonaws.com

cd rentx_prod

sudo git pull origin main

sudo docker-compose down

sudo docker-compose up -d --build
