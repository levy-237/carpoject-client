import * as z from "zod";

const requiredNumber = (message: string, min = 1) =>
  z.number({ error: message }).min(min, message);

export const AddListingSchema = z.object({
  title: z.string().min(1, "Bitte gib einen Titel ein."),
  description: z.string({ error: "Bitte gib eine Beschreibung ein." }),
  brand: z.number({ error: "Bitte wähle eine Marke aus." }),
  model: z.number({ error: "Bitte wähle ein Modell aus." }),
  model_trim: z.number({ error: "Bitte wähle einen Trim aus." }),
  makeyear: z
    .string({ error: "Bitte wähle ein Baujahr aus." })
    .min(1, "Bitte wähle ein Baujahr aus."),
  price: requiredNumber("Bitte gib einen Preis ein."),
  body_type: z.number({ error: "Bitte wähle eine Karosserie aus." }),
  mileage: requiredNumber("Bitte gib den Kilometerstand ein.", 0),
  condition: z.number({ error: "Bitte wähle einen Zustand aus." }),
  power: requiredNumber("Bitte gib die Leistung ein."),
  battery_health: z
    .number({ error: "Bitte gib den Batteriezustand ein." })
    .min(0)
    .max(100)
    .optional(),
  real_summer_range: z
    .number({ error: "Bitte gib die Sommerreichweite ein." })
    .min(0)
    .optional(),
  real_winter_range: z
    .number({ error: "Bitte gib die Winterreichweite ein." })
    .min(0)
    .optional(),
  heat_pump: z.boolean(),
  garantie: z.boolean(),
  pickerl: z.boolean(),
  is_sold: z.boolean(),
  is_reserved: z.boolean(),
});

export type AddListingFormValues = z.infer<typeof AddListingSchema>;
