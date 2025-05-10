import Button from "@/components/buttons/Button";

type Props = {
  total: number;
};

export default function CheckoutFooter({ total }: Props) {
  return (
    <div className="fixed bottom-0 md:bottom-5 p-4 md:p-0 left-0 right-0 z-30 mx-auto w-full">
      <div className="mx-auto flex items-center gap-4 w-full md:max-w-[640px] p-4 bg-zinc-100 rounded-xl">
        <div className="flex flex-col w-full">
          <p className="text-xl font-bold">Rp {total.toLocaleString()}</p>
          <p className="text-md font-medium">Total</p>
        </div>

        <Button size="base" className="h-fit">
          Bayar
        </Button>
      </div>
    </div>
  );
}
