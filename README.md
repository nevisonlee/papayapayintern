## My NestJS version of the API request codes

### How to run it
i) Type npm run start:dev in the terminal

ii) If the terminal writes 'Connected to database!', it indicates that it has connected to the MongoDB Atlas server

iii) Since after multiple attempts of trying to request API using Postman, it seems Github Codespace's URL doesn't work for Postman. So instead, I downloaded REST Client which has similar features to Postman.

iv) To undergo a request, simply go to the http folder I've created and you can see there is a get.http, post.http, put.http and delete.http file.

v) For all requests, just hover your cursor to the endpoint which is http://localhost:3000/products then right click it, then click 'Send Request'.

vi) For those which require ID, just copy the product id and paste it at the back of the URL. The get.http file works for getting all products and getting one product, getting all products just simply uses http://localhost:3000/products meanwhile getting one product just simply add the product id at the back of the URL. 


