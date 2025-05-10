"use client";
import Image from "next/image";
import Input from "@/components/form/Input";
import IconButton from "@/components/buttons/IconButton";
import { Minus, Plus, Trash2 } from "lucide-react";
import { FormProvider } from "react-hook-form";

type Props = {
  order: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    note: string;
    imageUrl: string;
  };
  methods: any;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onDelete: (id: number) => void;
  onNoteChange: (id: number, note: string) => void;
};

export default function OrderItem({
  order,
  methods,
  onIncrement,
  onDecrement,
  onDelete,
  onNoteChange,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
      <div className="flex items-start gap-3 w-full">
        <div className="flex h-[90px] w-[80px] shrink-0 items-center justify-center overflow-hidden rounded-xl">
          <Image
            src={order.imageUrl}
            alt={order.name}
            className="h-full w-full object-cover"
            width={40}
            height={40}
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <h3 className="text-sm font-semibold">{order.name}</h3>

          <p className="text-sm font-medium">
            Rp {order.price.toLocaleString()}
          </p>

          <FormProvider {...methods}>
            <Input
              id={`notes-${order.id}`}
              placeholder="masukkan catatan pesanan"
              value={order.note}
              onChange={(e) => onNoteChange(order.id, e.target.value)}
              className="w-full"
            />
          </FormProvider>
        </div>
      </div>

      <div className="flex md:flex-col md:items-end justify-between gap-4 w-full md:w-fit">
        <div className="flex gap-4 items-center">
          <IconButton
            size="sm"
            variant="outline"
            icon={Minus}
            onClick={() => onDecrement(order.id)}
          />
          <p>{order.quantity}</p>
          <IconButton
            size="sm"
            variant="outline"
            icon={Plus}
            onClick={() => onIncrement(order.id)}
          />
          <IconButton
            size="sm"
            variant="red"
            icon={Trash2}
            onClick={() => onDelete(order.id)}
          />
        </div>

        <p className="text-md font-medium">
          Rp {(order.price * order.quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
