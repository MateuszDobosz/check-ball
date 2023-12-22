"use client";

import { singUpForGame } from "@/app/actions/signUpForGame.action";
import { TAddUserSchema, addUserSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

export interface ISignUpProps {
  id: string;
}

export const SignUpForm = ({ id }: ISignUpProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAddUserSchema>({
    mode: "onBlur",
    resolver: zodResolver(addUserSchema),
  });
  const handleAddParticipant = async (data: TAddUserSchema) => {
    console.log(data);
    await singUpForGame(id, {
      name: data.name,
      password: data.password,
      note: data.note,
    });

    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(handleAddParticipant)}
      className="flex flex-col"
    >
      <Input
        className="my-4"
        type="text"
        label="Nazwa"
        isRequired
        placeholder="Podaj swoją nazwę aby się zapisać"
        {...register("name")}
      />
      <Input
        type="password"
        label="Hasło do zapisów"
        isRequired
        placeholder="Podaj hasło aby się zapisać"
        {...register("password")}
      />
      <Input
        className="my-4"
        label="Notatka"
        placeholder="Tutaj możesz wpisać dodatkowe informacje"
        {...register("note")}
      />
      <Button type="submit">Zapisz się!</Button>
    </form>
  );
};
