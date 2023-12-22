import { fetchGame } from "@/app/actions/fetchGame.action";
import { ListTable } from "@/components/listTable";
import { SignUpModal } from "@/components/signUpModal";
import { Chip, CircularProgress } from "@nextui-org/react";

export interface IGameParams {
  params: any;
}

export default async function Game({ params }: IGameParams) {
  const game = await fetchGame(params.id);
  const participants = game && game.participants ? game?.participants : [];
  return game ? (
    <div>
      <div className="flex flex-row justify-between items-center ">
        <h1 className="text-2xl font-bold my-4 sm:text-4xl">
          {game.place} {game.date} - {game.time}{" "}
        </h1>
        <SignUpModal id={params.id} />
      </div>
      <h1 className="text-xl font-bold my-4 sm:text-2xl">
        Lista zapisanych: {game?.participants.length}/{game?.quantity}
      </h1>
      <div>{game.info && <Chip className="my-4">{game.info}</Chip>}</div>
      <ListTable
        gameId={game._id}
        participants={participants}
        quantity={game.quantity}
      />
    </div>
  ) : (
    <CircularProgress
      color="default"
      aria-label="Ładowanie..."
      label="Ładowanie..."
    />
  );
}
