"use client";

import { singUpForGame } from "@/app/actions/signUpForGame.action";
import { TAddUserSchema, addUserSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";

export interface ISignUpModalProps {
  id: string;
}
export const SignUpModal = ({ id }: ISignUpModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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
    await singUpForGame(id, {
      name: data.name,
      password: data.password,
      note: data.note,
    });

    onClose();
    reset();
  };
  return (
    <>
      <Button onPress={onOpen}>Zapisz się</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(handleAddParticipant)}>
                <ModalHeader className="flex flex-col gap-1">
                  Zapisz się na grę
                </ModalHeader>
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Zamknij
                  </Button>
                  <Button type="submit">Zapisz się!</Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
