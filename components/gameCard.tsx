"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Chip,
  Button,
} from "@nextui-org/react";

export interface IGameCardProps {
  id: string;
  time: string;
  place: string;
  quantity: number;
  maxQuantity: number;
  info?: string;
}
export default function GameCard({
  id,
  time,
  place,
  quantity,
  maxQuantity,
  info,
}: IGameCardProps) {
  return (
    <div className="mb-4">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">{time} </p>
            <p className="text-small text-default-500">{place}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            Lista obecności {quantity}/{maxQuantity}
          </p>
        </CardBody>
        <Divider />
        {info && (
          <>
            <CardBody>
              <Chip>{info}</Chip>
            </CardBody>
            <Divider />
          </>
        )}
        <CardFooter>
          <Button href={`/game/${id}`} as={Link} showAnchorIcon size="sm">
            Zapisz się!
          </Button>
          {
            // TODO: time check
          }
        </CardFooter>
      </Card>
    </div>
  );
}
