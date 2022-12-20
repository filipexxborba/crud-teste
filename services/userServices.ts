import { IUser } from "../@types/User";
import fs from "fs";
import User from "../models/User";

// Will return a JSON object containing all Users
export const getAllUsers = () => {
   return JSON.parse(
      fs.readFileSync("./data/users.json", {
         encoding: "utf-8",
         flag: "r",
      })
   );
};

// Will check if exist user with the given ID and will return a ERROR message or return a JSON Object with the user information
export const getUserById = (id: number) => {
   const data: IUser[] = getAllUsers();
   if (data.filter((user: IUser) => user.id === id).length === 0)
      throw new Error(`Not found user with ID: ${id}`);

   return data.filter((user: IUser) => user.id === id)[0];
};

// Will save the user passed to the function in the JSON object
export const saveUserInDatabase = (newUser: IUser) => {
   const data: IUser[] = getAllUsers();
   if (data.filter((user: IUser) => user.email === newUser.email))
      throw new Error(`This e-mail: ${newUser.email} already exists.`);
   data.push(newUser);
   fs.writeFileSync("./data/users.json", JSON.stringify(data));
};

// Will save the new user password in the database file
export const patchUserPasswordInDatabase = (
   findId: number,
   newPassword: string
) => {
   const data: IUser[] = getAllUsers();
   const index = data.findIndex((user: IUser) => user.id === findId);
   data[index].password = newPassword;
   fs.writeFileSync("./data/users.json", JSON.stringify(data));
};

// Will try update the user password
export const passwordUpdate = (findId: number, newPassword: string) => {
   const { id, email, password } = getUserById(findId);
   const user = new User(id, email, password);
   user.changePassword(newPassword);
   patchUserPasswordInDatabase(findId, newPassword);
   return user;
};

// Will try delete the user from the database
export const deleteUser = (findId: number) => {
   const data: IUser[] = getAllUsers();
   const findIndex = data.findIndex((user: IUser) => user.id === findId);
   if (findIndex === -1)
      throw new Error(`Not found user with this ID: ${findId}.`);
   const newUserList: IUser[] = [];
   data.map((user: IUser, index: number) => 
      index !== findIndex ? newUserList.push(user) : null
   );
   fs.writeFileSync("./data/users.json", JSON.stringify(newUserList));
};
