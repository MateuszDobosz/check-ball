"use server";

import connectDB from "@/lib/connectDB";
import { TGameSchema, gameSchema } from "@/lib/types";
import Game from "@/models/Game";
import { redirect } from "next/navigation";

export async function addGameAction(data: TGameSchema) {
  const result = gameSchema.safeParse(data);
  if (!result.success) return { status: "failed" };
  await connectDB();
  const game = new Game(data);
  await game.save();
  redirect(`game/${game.id}`);
}
