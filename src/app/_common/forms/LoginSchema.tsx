import { z } from "zod";

export const loginSchema = z.object({
	usercode: z.string().length(3, { message: "Usercode must be 3 characters" }),
	password: z
		.string()
		.min(3, { message: "Password must be at least 3 characters" }),
});
