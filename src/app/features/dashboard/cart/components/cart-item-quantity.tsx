import { useDebounce } from "@/hooks/use-debounced";
import { Minus, Plus, Trash } from "lucide-react";
import React, { useEffect } from "react";
import { useDeleteCartItem } from "../api/use-delete-cart-item";
import { useUpdateCartItemQuantity } from "../api/use-update-cart-item-quantity";

type AppProps = {
  cartItemId: number;
  quantity: number;
  stock: number;
};

export default function CartItemQuantity({
  quantity,
  stock,
  cartItemId,
}: AppProps) {
  const [amountDebounced, setAmount, amount] = useDebounce(quantity);

  const increaseAmount = () =>
    setAmount((prev) => (prev >= stock ? prev : prev + 1));

  const decreaseAmount = () =>
    setAmount((prev) => (prev === 1 ? prev : prev - 1));

  const { mutate: deleteCartItem } = useDeleteCartItem();
  const { mutate: updateQuantity } = useUpdateCartItemQuantity();

  useEffect(() => {
    if (amountDebounced !== quantity) {
      updateQuantity({
        cartItemId: cartItemId,
        quantity: amountDebounced,
      });
    }
  }, [amountDebounced, cartItemId, updateQuantity, quantity]);

  return (
    <div className="border border-gray-200 rounded-md flex w-full h-8 justify-between items-center px-1">
      {amount === 1 ? (
        <button
          onClick={() => deleteCartItem(cartItemId)}
          className="cursor-pointer text-primary active:text-primary/70"
        >
          <Trash className="size-4" />
        </button>
      ) : (
        <button
          onClick={decreaseAmount}
          className="cursor-pointer text-primary active:text-primary/70"
        >
          <Minus className="size-4" />
        </button>
      )}
      <span>{amount}</span>
      <button
        onClick={increaseAmount}
        className="cursor-pointer text-primary active:text-primary/70 disabled:opacity-35 disabled:cursor-auto disabled:pointer-events-none"
        disabled={amount >= stock}
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
