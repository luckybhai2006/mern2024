const { z } = require("zod");

// CREATING AN OBJECT SCHEMA

const signupSchema = z.object({
   username: z.string({ required_message: "Username is required" })
      .trim()
      .min(3, { message: "Name must be at lest 3 characters." })
      .max(100, { message: "Name must not be more than 100 characters." }),
   email: z.string({ required_message: "Email is required" })
      .trim()
      .min(10, { message: "Email must be at lest 10 characters." })
      .max(100, { message: "Email must not be more than 100 characters." }),
   phone: z.string({ required_message: "Phone no. is required" })
      .trim()
      .min(10, { message: "Phone must be in no." })
      .max(10, { message: "Phone must not be more than 10 characters." }),
   password: z.string({ required_message: "Password is required" })
      .trim()
      .min(5, { message: "Password must be at lest 5 characters." })
      .max(100, { message: "Password must not be more than 100 characters." }),
});

module.exports = signupSchema;