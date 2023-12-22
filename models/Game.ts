import mongoose from "mongoose";

export interface Participant {
  name: string;
  createdAt: string;
  note: string;
}

export interface GameDocument extends Document {
  _id: string;
  quantity: number;
  place: string;
  date: string;
  time: string;
  info: string;
  password: string;
  participants: Participant[];
}

const Game = new mongoose.Schema<GameDocument>(
  {
    quantity: Number,
    place: String,
    date: String,
    time: String,
    info: String,
    password: String,
    participants: [{ name: String, createdAt: Date, note: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Game || mongoose.model("Game", Game);
