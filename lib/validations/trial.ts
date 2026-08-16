import { z } from "zod";

export const trialRegistrationSchema = z
  .object({
    student_name: z.string().min(2, "Student name is required"),
    date_of_birth: z.string().optional().or(z.literal("")),
    age: z.coerce.number().min(3).max(80).optional().or(z.nan()),
    parent_guardian_name: z.string().optional().or(z.literal("")),
    phone: z
      .string()
      .min(10, "Valid phone number required")
      .regex(/^[+]?[\d\s-]{10,15}$/, "Invalid phone format"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    preferred_class: z.string().optional().or(z.literal("")),
    preferred_day_time: z.string().optional().or(z.literal("")),
    previous_experience: z.string().optional().or(z.literal("")),
    message: z.string().max(1000).optional().or(z.literal("")),
    consent: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms" }),
    }),
  })
  .superRefine((data, ctx) => {
    // Require parent/guardian for minors (age < 18)
    const age = data.age;
    if (age !== undefined && !Number.isNaN(age) && age < 18) {
      if (!data.parent_guardian_name || data.parent_guardian_name.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parent/Guardian name is required for minors",
          path: ["parent_guardian_name"],
        });
      }
    }
  });

export type TrialRegistrationInput = z.infer<typeof trialRegistrationSchema>;
