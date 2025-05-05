import express from 'express';
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator';
import {createUserValidationSchema} from './utils/validationSchemas.mjs'

const app = express();

app.use(express.json());

const loggingMiddleware = (request, response, next) => {
    console.log(`${request.method} - ${request.url}`);
 next();
};

const resolveIndexbyUserId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).send({ msg: "Invalid ID" });
  
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index === -1) return res.status(404).send({ msg: "User not found" });
  
    req.userIndex = index; // pass index along to route handler
    req.userId = id;
    next();
  };
  

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

app.get("/", (request, response) => {
       response.status(201).send({ msg: "Hello"});
    });

app.use(loggingMiddleware, (request, response, next) => {
    console.log("Finished Logging...");
    next();
});
  
app.get('/api/products', (request, response) => {
    response.send([{ id: 123, name: 'chicken breast', price: 12.99 }])
})