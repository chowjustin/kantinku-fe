import OrderItem from "./OrderItem";

type Props = {
  orders: any[];
  methods: any;
  onIncrement: (id: number) => void;
  onDecrement: (id: number) => void;
  onDelete: (id: number) => void;
  onNoteChange: (id: number, note: string) => void;
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
      <h2 className="font-semibold">Pesanan</h2>

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
