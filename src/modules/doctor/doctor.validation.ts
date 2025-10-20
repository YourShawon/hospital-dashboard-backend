import { z } from "zod";

// Enum schemas matching Prisma enums
const DepartmentEnum = z.enum([
  "CARDIOLOGY",
  "NEUROLOGY",
  "PEDIATRICS",
  "ORTHOPEDICS",
  "RADIOLOGY",
  "DERMATOLOGY",
  "GENERAL_MEDICINE",
  "GYNECOLOGY",
  "ONCOLOGY",
  "UROLOGY",
]);

const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);

// Schema for creating a new doctor
export const createDoctorSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters")
    .trim(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters")
    .trim(),
  email: z.string().email("Invalid email format").toLowerCase().trim(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format")
    .trim(),
  department: DepartmentEnum,
  gender: GenderEnum,
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio must be less than 500 characters")
    .trim(),
  images: z.array(z.string().url("Invalid image URL")).optional().default([]),
  socialLinks: z
    .record(z.string(), z.string().url("Invalid URL in social links"))
    .optional(),
  specialties: z
    .array(z.string().min(1, "Specialty name cannot be empty"))
    .optional()
    .default([]),
});

// Infer TypeScript type from schema (optional, but useful)
export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;
