"use client";

import { Button } from "@nextui-org/button";
import {
  Autocomplete,
  AutocompleteItem,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TGameSchema, gameSchema } from "@/lib/types";
import { addGameAction } from "../actions/addGame.action";

const places = [
  { id: 1, label: "Hala Poczesna" },
  {
    id: 2,
    label: "Orlik - Konopiska",
  },
  {
    id: 3,
    label: "Orlik - Huta Stara",
  },
];
export default function AddGame() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TGameSchema>({
    mode: "onBlur",
    resolver: zodResolver(gameSchema),
    defaultValues: {
      quantity: 12,
    },
  });

  const onSubmit = async (data: TGameSchema) => {
    await addGameAction(data);
  };

  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mt-4 mb-4 text-xl font-bold">Dodaj grę!</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-4"
      >
        <div>
          <div className="mb-3 ">
            <Autocomplete
              allowsCustomValue
              isRequired
              label="Miejsce"
              variant="bordered"
              className="max-w-xs"
              placeholder="Wpisz gdzie będzie gra"
              defaultItems={places}
              {...register("place")}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
              )}
            </Autocomplete>
          </div>
          <div className="mb-3">
            <Input
              type="date"
              label="Data"
              className="max-w-xs appearance-none"
              placeholder="Data"
              variant="bordered"
              {...register("date")}
            />
          </div>

          <div className="mb-3">
            <Input
              isRequired
              type="time"
              label="Czas"
              className="max-w-xs"
              variant="bordered"
              placeholder="Wybierz godzinę gry"
              {...register("time")}
            />
          </div>
          <div className="mb-3">
            <Input
              isRequired
              label="Liczba miejsc"
              type="number"
              inputMode="numeric"
              className="max-w-xs"
              variant="bordered"
              placeholder="Wpisz liczbę zawodników"
              {...register("quantity", { valueAsNumber: true })}
              description="Gracze ponad wybraną liczbę będą się mogli zapisywać na listę rezerwowych"
            />
          </div>

          <div className="mb-3">
            <Input
              isRequired
              type="password"
              label="Hasło"
              defaultValue=""
              className="max-w-xs"
              variant="bordered"
              placeholder="Ustal hasło do zapisów"
              {...register("password", { required: true })}
            />
          </div>
          <div className="mb-3">
            <Textarea
              variant="bordered"
              label="Dodatkowe informacje"
              {...register("info")}
            />
          </div>
          <Button type="submit" className="btn btn-primary">
            Stwórz
          </Button>
        </div>
      </form>
    </div>
  );
}
