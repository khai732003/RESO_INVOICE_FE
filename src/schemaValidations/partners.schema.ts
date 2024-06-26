import z from "zod";
export const PartnersBody = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  apiUrl: z.string(),
  type: z.number().int(),
  environment: z.number().int(),
  status: z.number().int(),
  schemaConfig: z.string(),
  code: z.string(),
  username: z.string(),
});

export type TUpdatePartnersBody = z.TypeOf<typeof PartnersBody>;

export const CreatePartnersBody = z.object({
  name: z.string(),
  description: z.string(),
  apiUrl: z.string(),
  type: z.number().int(),
  environment: z.number().int(),
  schemaConfig: z.string(),
  code: z.string(),
  username: z.string(),
  password: z.string(),
});

export type TCreatePartnersBody = z.TypeOf<typeof CreatePartnersBody>;
