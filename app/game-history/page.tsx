import GameCard from "@/components/gameCard";
import { fetchGames } from "../actions/fetchGames.action";

export default async function GameHistory() {
  const games = await fetchGames();
  return (
    <div>
      {games.map((game: any) => (
        <GameCard
          key={game._id.toString()}
          id={game._id.toString()}
          time={`${game.date} - ${game.time}`}
          place={game.place}
          quantity={game.participants.length}
          maxQuantity={game.quantity}
        />
      ))}
    </div>
  );
}
