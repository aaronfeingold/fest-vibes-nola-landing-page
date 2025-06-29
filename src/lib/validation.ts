import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .min(1, "Email is required")
  .max(255, "Email is too long");

export const betaSignupSchema = z.object({
  email: emailSchema,
  wantsDonation: z.boolean().default(false),
  hasSeenDonationModal: z.boolean().default(false),
});

export type EmailValidation = z.infer<typeof emailSchema>;
export type BetaSignupData = z.infer<typeof betaSignupSchema>;
