How to run it
i) Type npm run start:dev in the terminal

ii) If the terminal writes 'Connected to database!', it indicates that it has connected to the MongoDB Atlas server

iii) Since after multiple attempts of trying to request API using Postman, it seems Github Codespace's URL doesn't work for Postman. So instead, I downloaded REST Client which has similar features to Postman.

iv) Before undergoing a request, you have to register a user account. Simply go to auth.http, input your desired username and password. Input your email so once you send request, the verification email will go to your registered email. (Recommended use gmail)

v) For all requests including logging in and register, just hover your cursor to the endpoint which is http://localhost:3000/..... then right click it, then click 'Send Request'.

iv) After verifying your account, now you can log in using your username and password. Once you log in, there will be an access token given, copy the token. It'll look something like this:

#### "access_token": "eyJhbGciOiJIUz........"

v) To undergo any requests which includes get, post, put and delete, paste your token to the authorization bearer. For example:

#### Authorization: Bearer eyJhbGciOiJIUz........

vi) Once pasting the access token, you can now send requests with the same method in v).

vi) For those which require ID, just copy the product id and paste it at the back of the URL. The get.http file works for getting all products and getting one product, getting all products just simply uses http://localhost:3000/products meanwhile getting one product just simply add the product id at the back of the URL.