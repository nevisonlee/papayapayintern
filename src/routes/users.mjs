import { Router } from "express";
import { query, validationResult, matchedData, checkSchema } from 'express-validator';
import { mockUsers } from '../mockData/users.mjs';
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { resolveIndexbyUserId } from '../middleware/resolveIndexbyUserId.mjs';

const router = Router();

router.get(
        "/api/users",
        [
          query("filter")
            .optional()
            .isString()
            .withMessage("Must be a string")
            .isLength({ min: 3, max: 10 })
            .withMessage("Must be 3-10 characters long"),
        ],
        (request, response) => {
          const result = validationResult(request);
          if (!result.isEmpty()) {
            return response.status(400).json({ errors: result.array() });
          }
      
          const {
            query: { filter, value },
          } = request;
      
          if (filter && value) {
            return response.send(
              mockUsers.filter((user) => user[filter]?.includes(value))
            );
          }
      
          return response.send(mockUsers);
        }
      );

router.get("/api/users/:id", resolveIndexbyUserId, (request, response) => {
    const { findUserIndex } = request;
    const findUser = mockUsers[findUserIndex];
if (!findUser) return response.sendStatus(404);
return response.send(findUser);
});
    
router.post(
    "/api/users",
    checkSchema(createUserValidationSchema),
    (request, response) => {
      const result = validationResult(request);

      if (!result.isEmpty()) {
        return response.status(400).json({ errors: result.array() });
      }
      
      const data = matchedData(request);

      const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
      mockUsers.push(newUser);
      return response.status(201).send(newUser);
    }
  );

router.put('/api/users/:id', resolveIndexbyUserId, (req, res) => {
    mockUsers[req.userIndex] = { id: req.userId, ...req.body };
    res.sendStatus(200);
  });

router.patch('/api/users/:id', (request, response) => {
    const { 
        body, 
        params: { id },
     } = request;
    
     const parsedId = parseInt(id);
     if (isNaN(parsedId)) return response.sendStatus(400);
     const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);   
     if (findUserIndex === -1) return response.sendStatus(404);
     mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
     return response.sendStatus(200);
})

router.delete("/api/users/:id", (request, response) => {
    const { params: { id },
 } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
}) 

export default router;
