"use server";

import connectDB from "@/lib/connectDB";
import Game, { GameDocument } from "@/models/Game";
import { revalidatePath } from "next/cache";

export async function fetchGames(limit?: number) {
  await connectDB();
  const games = (await Game.find()
    .sort({ createdAt: -1 })
    .limit(limit ? limit : 10)) as GameDocument[];
  revalidatePath("/");
  return games;
}
