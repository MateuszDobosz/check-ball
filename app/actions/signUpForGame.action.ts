"use server";

import connectDB from "@/lib/connectDB";
import Game from "@/models/Game";
import { revalidatePath } from "next/cache";
interface ISignUpForGameArgs {
  name: string;
  password: string;
  note?: string;
}

export async function singUpForGame(
  _id: string,
  { name, password, note }: ISignUpForGameArgs
) {
  try {
    await connectDB();
    const game = await Game.findOne({
      _id,
    });
    if (!game) {
      return null;
    }
    if (password !== game.password) {
      return {
        status: "Not forbidden",
      };
    }
    if (!game) {
      return {
        status: "Game not found",
      };
    }
    game.participants.push({
      name,
      createdAt: new Date(),
      note,
    });
    await game.save();
    revalidatePath(`game/${_id}`);
    revalidatePath("");
    const saveStatus = game.participants.length > game.quantity;
    return {
      savedToList: !saveStatus,
      savedToReservedList: saveStatus,
    };
  } catch (error) {
    return {
      savedToList: false,
      savedToReservedList: false,
    };
  }
}
