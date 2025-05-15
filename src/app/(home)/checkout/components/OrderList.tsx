import OrderItem from "./OrderItem";
import { CartItem } from "@/context/CartContext";

type Props = {
  orders: CartItem[];
  methods: any;
  onIncrement: (id: number | string) => void;
  onDecrement: (id: number | string) => void;
  onDelete: (id: number | string) => void;
  onNoteChange: (id: number | string, note: string) => void;
};

export default function OrderList({
  orders,
  methods,
  onIncrement,
  onDecrement,
  onDelete,
  onNoteChange,
}: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-white p-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Pesanan</h2>
        {orders.length > 0 && (
          <p className="text-sm text-gray-500">
            dari <span className="font-medium">{orders[0].tenantName}</span>
          </p>
        )}
      </div>

      {orders.map((order, index) => (
        <div key={order.id} className="flex flex-col gap-4">
          <OrderItem
            order={order}
            methods={methods}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
            onNoteChange={onNoteChange}
          />
          {index !== orders.length - 1 && <hr className="border" />}
        </div>
      ))}
    </div>
  );
}
