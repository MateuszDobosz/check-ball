import GameCard from "@/components/gameCard";
import { fetchGames } from "./actions/fetchGames.action";

export default async function Home() {
  const games = await fetchGames(3);

  return (
    <div>
      <h1 className="text-4xl font-bold">Zapisz się na grę!</h1>
      <p className="mt-4 mb-4"> Ostatnio dodane gry: </p>
      <div>
        {games.map((game) => (
          <GameCard
            key={game._id.toString()}
            id={game._id.toString()}
            time={`${game.date} - ${game.time}`}
            place={game.place}
            quantity={game.participants.length}
            maxQuantity={game.quantity}
            info={game.info}
          />
        ))}
      </div>
    </div>
  );
}
