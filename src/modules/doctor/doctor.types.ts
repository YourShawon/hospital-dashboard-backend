// Types for Doctor domain (kept modest to start)

export type Department =
  | "CARDIOLOGY"
  | "NEUROLOGY"
  | "PEDIATRICS"
  | "ORTHOPEDICS"
  | "RADIOLOGY"
  | "DERMATOLOGY"
  | "GENERAL_MEDICINE"
  | "GYNECOLOGY"
  | "ONCOLOGY"
  | "UROLOGY";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type SocialLinks = Record<string, string> | undefined;

export interface CreateDoctorInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: Department;
  gender: Gender;
  bio: string;
  images?: string[];
  socialLinks?: SocialLinks;
  specialties?: string[]; // list of specialty names
}
