# rentx_prod


1- BUILD THE PROJECT

go in dev project

go in angular folder

run npm run build

go in nesjs folder

run npm run build

copy .en.production from nestjs folder to here back folder

copy .env from dev folder to here root folder

2- RUN IN INSTANCE

- Connect to instance.

sudo git clone https://github.com/innoestate/rentx_prod.git

- allow permissions to rentx_prod folder:

sudo chmod -R 777 rentx_prod

Copy envs files:

sudo scp -i "prod_rentx.pem" ../.env admin@ec2-13-36-119-43.eu-west-3.compute.amazonaws.com:/home/admin/rentx/.env

sudo sudo scp -i "prod_rentx.pem" ../nestjs/.env.production admin@ec2-13-36-119-43.eu-west-3.compute.amazonaws.com:/home/admin/rentx/nestjs/.env.production
