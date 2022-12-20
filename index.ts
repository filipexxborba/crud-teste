import express, { Request, Response } from "express";
import User from "./models/User";
import usersData from "./data/users.json";
import {
   deleteUser,
   getAllUsers,
   getUserById,
   passwordUpdate,
   saveUserInDatabase,
} from "./services/userServices";
import { IUser } from "./@types/User";

const app = express();

app.use(express.json());

app.get("/api", (_, res: Response) => {
   res.status(200).json({ message: "Its running!" });
});

// Get all Users in database
app.get("/api/users", (req: Request, res: Response) => {
   try {
      res.status(200).json(getAllUsers());
   } catch (error: any) {
      res.status(400).send({ message: error.message });
   }
});

// Get user by ID
app.get("/api/users/:id", (req: Request, res: Response) => {
   try {
      const user = getUserById(parseInt(req.params.id));
      res.status(200).send(user);
   } catch (error: any) {
      res.status(400).send({ message: error.message });
   }
});

// Create a new User and save it in database
app.post("/api/users", (req: Request, res: Response) => {
   const { email, password } = req.body;
   try {
      const user = new User(usersData.length + 1, email, password);
      saveUserInDatabase(user);
      res.status(201).json(user);
   } catch (error: any) {
      res.status(400).send({ message: error.message });
   }
});

// Update password of user in database
app.put("/api/users/:id", (req: Request, res: Response) => {
   const { newPassword } = req.body;
   try {
      const user: IUser = passwordUpdate(parseInt(req.params.id), newPassword);
      res.status(200).json(user);
   } catch (error: any) {
      res.status(400).send({ message: error.message });
   }
});

// Delete the user passed in id parameter
app.delete("/api/users/:id", (req: Request, res: Response) => {
   try {
      deleteUser(parseInt(req.params.id));
      res.status(204).send({
         message: `User with ID ${req.params.id} is deleted.`,
      });
   } catch (error: any) {
      res.status(400).send({ message: error.message });
   }
});

app.listen(3000, () => {
   console.log("Servidor iniciado e rodando na porta 3000");
});
