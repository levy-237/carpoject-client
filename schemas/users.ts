import * as z from "zod";

export const UpdateProfileSchema = z.object({
  first_name: z.string().min(1, "Bitte gib einen Vornamen ein."),
  last_name: z.string().min(1, "Bitte gib einen Nachnamen ein."),
  username: z.string().min(1, "Bitte gib einen Benutzernamen ein."),
  phone: z.string().min(1, "Bitte gib eine Telefonnummer ein."),
  streetname_number: z
    .string()
    .min(1, "Bitte gib eine Straße und Hausnummer ein."),
  province: z.number().min(1, "Bitte wähle eine Provinz aus."),
  city: z.number().min(1, "Bitte wähle eine Stadt aus."),
  isCompany: z.boolean().optional(),
  company_name: z.string().optional(),
  picture_file: z.instanceof(File).optional(),
});

export type UpdateProfileFormValues = z.infer<typeof UpdateProfileSchema>;

export const CreateProfileSchema = z.object({
  first_name: z.string().min(1, "Bitte gib einen Vornamen ein."),
  last_name: z.string().min(1, "Bitte gib einen Nachnamen ein."),
  username: z.string().min(1, "Bitte gib einen Benutzernamen ein."),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string().min(8, "Bitte gib ein Passwort ein."),
  phone: z.string().min(1, "Bitte gib eine Telefonnummer ein."),
  streetname_number: z
    .string()
    .min(1, "Bitte gib eine Straße und Hausnummer ein."),
  province: z.number().min(1, "Bitte wähle eine Provinz aus."),
  city: z.number().min(1, "Bitte wähle eine Stadt aus."),
  isCompany: z.boolean().optional(),
  company_name: z.string().optional(),
  picture_file: z.instanceof(File).optional(),
});

export type CreateProfileFormValues = z.infer<typeof CreateProfileSchema>;
