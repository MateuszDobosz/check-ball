import { z } from "zod";

export const gameSchema = z.object({
  place: z.string(),
  date: z.string(),
  time: z.string(),
  quantity: z.number(),
  password: z.string(),
  info: z.string().optional(),
});

export type TGameSchema = z.infer<typeof gameSchema>;

export const addUserSchema = z.object({
  name: z.string(),
  password: z.string(),
  note: z.string().optional(),
});

export type TAddUserSchema = z.infer<typeof addUserSchema>;

export const removeParticipantSchema = z.object({
  password: z.string(),
});

export type TRemoveParticipantSchema = z.infer<typeof removeParticipantSchema>;
