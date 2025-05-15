# CRUD Mongo DB API

### So basically to run the crud API, here is what you need to run in the terminal to setup.


i) npm init -y

ii) node index.js

iii) npm run serve - input this into the terminal everytime you want to run the server (also better input this everytime after you make a change to make sure the server is up to date)

iv) npm i express 

v) npm i nodemon -D

vi) npm install mongodb

vii) npm install mongoose


### Node version: v20.19.0


### Things to note:

i) In Postman, always run http://localhost:3000/ for the front part of the endpoint link. 

ii) Everytime you open the codespace, it usually will get a new ip address which will be needed to be pasted at the 'Network Access' section at MongoDB Atlas. However, I already set a 0.0.0.0/0 so the api should work for everyone. To get the codespace ip address to be pasted at MongoDB Atlas, just run $ curl ifconfig.me at the terminal.
