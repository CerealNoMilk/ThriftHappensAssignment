//Kodie Wojewski
//COMP2013 - Thrift Happens Assignment
//Nov.9th.2026

import { useState } from "react";
import { type ClothingProduct } from "../data/data";
import ItemContainer from "./ItemsContainer";
import CheckoutContainer from "./CheckoutContainer";

export interface ProductInfo {
  id: number;
  quantity: number;
  price: number;
}

export interface ProductContainerProps {
  data: ClothingProduct[];
}

export interface CartItem {
  id: number;
  image: string;
  product: string;
  price: number;
  quantity: number;
  total: number;
}

//Stoers user selected items and prices
export default function ThriftHappensApp({ data }: ProductContainerProps) {
  const [productInfo, setProductInfo] = useState<ProductInfo[]>(
    data.map((clothingProduct: ClothingProduct) => ({
      id: clothingProduct.id,
      quantity: clothingProduct.itemQuantity,
      price: clothingProduct.price,
    })),
  );

  //Stores items that are added to the cart
  const [cartItems, setCartItem] = useState<CartItem[]>([]);

  //Determines what is left from stock after user chooses each item
  const stockAvailable = data.map((product) => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    return {
      ...product,
      quantity: product.quantity - (cartItem ? cartItem.quantity : 0),
    };
  });

  //Handlers
  //Handle Change Quantity function (does not go below 0 & available stock left)
  function handleChangeQuantity(id: number, delta: number) {
    setProductInfo((prevData) => {
      return prevData.map((info) =>
        info.id === id
          ? {
              ...info,
              quantity: Math.max(
                0,
                Math.min(
                  info.quantity + delta,
                  stockAvailable.find((product) => product.id === id)!.quantity,
                ),
              ),
            }
          : info,
      );
    });
  }
  //handle Add to Cart function

  function handleAddToCart(cartItem: CartItem) {
    const product = stockAvailable.find((item) => item.id === cartItem.id);

    //Checks if product isn't there and makes sure selected quantity is0 or negative
    if (!product || cartItem.quantity <= 0) return;
    //Makes sure the selected amount does not go over stock available
    const quantity = Math.min(cartItem.quantity, product.quantity);
    //MAkes sure if a user adds 0 or negative, nothing should be added to cart
    if (quantity <= 0) return;

    setCartItem((prevItems) => {
      const currentItem = prevItems.find((item) => item.id === cartItem.id);

      //Checks if the same product is ALREADY in cart and then updates its new qauntity
      //and price. If not then it should add as a new item
      if (currentItem) {
        return prevItems.map((item) =>
          item.id === cartItem.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                total: (item.quantity + quantity) * item.price,
              }
            : item,
        );
      }

      return [
        ...prevItems,
        { ...cartItem, quantity: quantity, total: quantity * cartItem.price },
      ];
    });

    setProductInfo((prevData) => {
      return prevData.map((info) =>
        info.id === cartItem.id ? { ...info, quantity: 0 } : info,
      );
    });
  }

  //Removes all items currently in cart
  //handle Empty Cart button
  function handleEmptyCart() {
    setCartItem([]);
  }
  //Handle delete cart button
  function handleDeleteCart(id: number) {
    setCartItem((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }

  return (
    <div>
      <ItemContainer
        data={stockAvailable}
        productInfo={productInfo}
        handleChangeQuantity={handleChangeQuantity}
        handleAddToCart={handleAddToCart}
      />
      <CheckoutContainer
        cartData={cartItems}
        handleEmptyCart={handleEmptyCart}
        handleRemoveOneFromCart={handleDeleteCart}
      />
    </div>
  );
}
