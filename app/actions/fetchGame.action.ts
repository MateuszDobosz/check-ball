"use server";

import connectDB from "@/lib/connectDB";
import Game, { GameDocument } from "@/models/Game";

export async function fetchGame(_id: string) {
  {
    try {
      await connectDB();
      const game = (await Game.findOne({
        _id,
      }).lean()) as GameDocument;
      return game;
    } catch (error) {
      return null;
    }
  }
}
