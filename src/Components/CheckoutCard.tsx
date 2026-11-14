//Kodie Wojewski
//COMP2013 - Thrift Happens Assignment
//Nov.9th.2026

import type { CartItem } from "./ThriftHappensApp";

interface CartCardProps extends CartItem {
  handleRemoveOneFromCart: (id: number) => void;
}

export default function CheckoutCard({
  id,
  image,
  product,
  price,
  quantity,
  total,
  handleRemoveOneFromCart,
}: CartCardProps) {
  return (
    <div className="CartCard">
      <img src={image} alt={product} height="50px" />
      <p>{product}</p>
      <p>Price: {price.toFixed(2)}$</p>
      <p>Quantity: {quantity}</p>
      <p>Total: ${total.toFixed(2)}</p>
      <button onClick={() => handleRemoveOneFromCart(id)}>Delete</button>
    </div>
  );
}
// <p>Total: {(productInfo.itemQuantity * productInfo.price).toFixed(2)}</p>
