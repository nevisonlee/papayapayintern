## My NestJS version of the API request codes

### How to run it
i) Type npm run start:dev in the terminal

ii) If the terminal writes 'Connected to database!', it indicates that it has connected to the MongoDB Atlas server

iii) Since after multiple attempts of trying to request API using Postman, it seems Github Codespace's URL doesn't work for Postman. So instead, I downloaded REST Client which has similar features to Postman.

iv) To undergo a request, you have to be authenticated first before being able to do a request. First of all, go to auth.http located in the http folder and register yourself if you haven't register yet. After inputing your desired username and password, hover to the endpoint, right click it then click 'Send Request'. Once registered, it should show something like this:

{
  "username": "xxx",
  "password": "$2b$10$1lrGrp0G3V32trS2SBHU1uViMHUS0rElxpnnQ6D7HC2K/mvopi20K",
  "_id": "xxx",
  "__v": 0
}

v) Then login by inputing your username and password at the bottom. Once successful, you will receive an access token. Copy the access token. 

vi) When you want to undergo any requests, just simply go to the http folder I've created and you can see there is a get.http, post.http, put.http and delete.http file. Before requesting, paste your access token behind the Authorization: 'Bearer'. This is essential to ensure you are authorized for the request. For example:

#### Authorization: Bearer eyJhbGciOiJIUz............

v) For all requests, same like the authentication, just hover your cursor to the endpoint which is http://localhost:3000/products then right click it, then click 'Send Request'.

vi) For those which require ID, just copy the product id and paste it at the back of the URL. The get.http file works for getting all products and getting one product, getting all products just simply uses http://localhost:3000/products meanwhile getting one product just simply add the product id at the back of the URL. 


