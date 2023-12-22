"use server";

import connectDB from "@/lib/connectDB";
import Game from "@/models/Game";
import { revalidatePath } from "next/cache";
interface IRemoveParticipantArgs {
  participantToRemoveId: string;
  password: string;
}

export async function removeParticipant(
  _id: string,
  { participantToRemoveId, password }: IRemoveParticipantArgs
) {
  try {
    await connectDB();
    const game = await Game.findOne({
      _id,
    });
    if (password !== game.password) {
      return {
        status: "Forbidden",
      };
    }
    if (!game) {
      return {
        status: "Game not found",
      };
    }
    const participants = game.participants.filter(
      (participant: any) => participant._id.toString() !== participantToRemoveId
    );
    game.participants = participants;
    await game.save();
    revalidatePath("/");
    revalidatePath(`game/${_id}`);
    return {
      removed: true,
    };
  } catch (error) {
    return {
      removed: false,
    };
  }
}
