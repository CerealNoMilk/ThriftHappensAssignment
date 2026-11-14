//Kodie Wojewski
//COMP2013 - Thrift Happens Assignment
//Nov.9th.2026

import CheckoutCard from "./CheckoutCard";
import type { CartItem } from "./ThriftHappensApp";

interface CartContainerProps {
  cartData: CartItem[];
  handleEmptyCart: () => void;
  handleRemoveOneFromCart: (id: number) => void;
}

export default function CheckoutContainer({
  cartData,
  handleEmptyCart,
  handleRemoveOneFromCart,
}: CartContainerProps) {
  return (
    <div>
      <div className="CartContainer">
        {cartData.map((item) => (
          <CheckoutCard
            key={item.id}
            {...item}
            handleRemoveOneFromCart={handleRemoveOneFromCart}
          />
        ))}
      </div>
      <div>
        <h2>
          {cartData.length > 0
            ? `Total: ${cartData.reduce((acc, item) => acc + item.total, 0).toFixed(2)}$`
            : `Cart Is Empty`}
        </h2>
        <button onClick={() => handleEmptyCart()}>Empty Cart</button>
      </div>
    </div>
  );
}
