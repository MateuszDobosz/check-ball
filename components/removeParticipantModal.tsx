"use client";

import { removeParticipant } from "@/app/actions/removeParticipant.action";
import { singUpForGame } from "@/app/actions/signUpForGame.action";
import {
  TAddUserSchema,
  TRemoveParticipantSchema,
  addUserSchema,
  removeParticipantSchema,
} from "@/lib/types";
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
  gameId: string;
  participantId: string;
}
export const RemoveParticipantModal = ({
  gameId,
  participantId,
}: ISignUpModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAddUserSchema>({
    mode: "onBlur",
    resolver: zodResolver(removeParticipantSchema),
  });
  const handleRemoveParticipant = async (data: TRemoveParticipantSchema) => {
    await removeParticipant(gameId, {
      password: data.password,
      participantToRemoveId: participantId,
    });

    onClose();
    reset();
  };
  return (
    <>
      <Button onPress={onOpen} color="danger" variant="flat">
        Usuń
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(handleRemoveParticipant)}>
                <ModalHeader className="flex flex-col gap-1">
                  Zapisz się na grę
                </ModalHeader>
                <ModalBody>
                  <Input
                    type="password"
                    label="Hasło do zapisów"
                    isRequired
                    placeholder="Podaj hasło aby się zapisać"
                    {...register("password")}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Zamknij
                  </Button>
                  <Button type="submit" color="danger" variant="flat">
                    Usuń
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
