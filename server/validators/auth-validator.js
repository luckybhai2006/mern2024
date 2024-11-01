const { z } = require("zod");

// CREATING AN OBJECT SCHEMA
const signupSchema = z.object({
   username: z.string({ required_message: "Username is required" })
      .trim()
      .min(3, { message: "Name must be at least 3 characters." })
      .max(100, { message: "Name must not be more than 100 characters." }),
   email: z.string({ required_message: "Email is required" })
      .trim()
      .email({ message: "Invalid email format." })
      .min(10, { message: "Email must be at least 10 characters." })
      .max(100, { message: "Email must not be more than 100 characters." }),
   phone: z.string({ required_message: "Phone no. is required" })
      .trim()
      .length(10, { message: "Phone number must be exactly 10 characters long." })
      .regex(/^\d{10}$/, { message: "Phone number must be numeric." }),
   password: z.string({ required_message: "Password is required" })
      .trim()
      .min(5, { message: "Password must be at least 5 characters." })
      .max(100, { message: "Password must not be more than 100 characters." })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: "Password must include uppercase, lowercase, number, and special character." }),
});

module.exports = signupSchema;
