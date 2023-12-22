"use client";

import { Participant } from "@/models/Game";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Button,
} from "@nextui-org/react";
import { RemoveParticipantModal } from "./removeParticipantModal";

export interface IListTableProps {
  participants: Participant[];
  quantity: number;
  gameId: string;
}

const columns = [
  { key: "lp", label: "#" },
  { key: "name", label: "Zawodnik" },
  {
    key: "createdAt",
    label: "Czas zapisu",
  },
  {
    key: "note",
    label: "Notatka",
  },
  {
    key: "action",
    label: "Akcja",
  },
];
export const ListTable = ({
  participants,
  quantity,
  gameId,
}: IListTableProps) => {
  return (
    <Table aria-label="Tabela z zawodnikami">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        items={participants}
        emptyContent={"Nikt się jeszcze nie zapisał"}
      >
        {/* {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )} */}
        {participants.map((participant: any, i) => (
          <TableRow
            key={participant._id}
            className={i > quantity - 1 ? "bg-red-500 bg-opacity-10" : ""}
          >
            <TableCell>{i + 1}</TableCell>
            <TableCell>{participant.name}</TableCell>
            <TableCell>
              {new Date(participant.createdAt).toLocaleString()}
            </TableCell>
            <TableCell>
              {participant.note && <Chip>{participant.note}</Chip>}
            </TableCell>
            <TableCell>
              <RemoveParticipantModal
                gameId={gameId}
                participantId={participant._id}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
