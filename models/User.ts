export default class User {
   id: number;
   // @ts-ignore
   email: string;
   // @ts-ignore
   password: string;

   // Constructor function for Users
   constructor(id: number, email: string, password: string) {
      this.id = id;
      this.errorValidations(email, password);
   }

   // This method will be called to validate the paramaters passed to the constructor
   errorValidations(email: string, password: string) {
      if (email.length <= 2) throw new Error("Invalid email format.");
      if (!email.includes("@")) throw new Error("Invalid email format.");
      if (password.length <= 2) throw new Error("Invalid password value.");

      this.email = email;
      this.password = password;
   }

   // Will return a boolean value indicating whether the password is the same as the user password
   validatePassword(password: string): boolean {
      return password === this.password;
   }

   changePassword(newPassword: string) {
      if (newPassword === this.password)
         throw new Error("Passoword cannot be the same previous.");
      this.password = newPassword;
   }
}
