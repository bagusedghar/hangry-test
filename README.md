# Hangry Test - Bagus Edghar Saputra

This service is using node.js + express.js and postgresql
Please import this postman collection and env to better experience
Collection: 
https://drive.google.com/file/d/14QK3VUTRis6VkBLfJ34Wz0zTLrtHocLb/view?usp=sharing
Env: 
https://drive.google.com/file/d/1oYsUkUyTaw_CKtJmNO1sU4WUy4xrriiV/view?usp=sharing
> Note: I didn't create a logout service, because logout should be handled in FE by remove token from local storage or cookies


## Installation
- Duplicate .env.example to .env and setup your local postgres
- run ``npm install``
- run ``node_modules/sequelize-cli/lib/sequelize db:migrate``
- run ``npm run watch`` to run the project


## Features
- If login success in postman, it will automaticallly update variable token in postman env, so dont need to update it manually 


Thank you