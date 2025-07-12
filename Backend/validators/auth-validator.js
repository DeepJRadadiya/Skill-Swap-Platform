const z = require('zod');

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(5, {
            message: "Email must contain at least 5 characters."
        }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(5, {
            message: "Password must contain at least 5 characters."
        }),
});


module.exports = {loginSchema};
