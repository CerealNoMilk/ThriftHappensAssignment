import type { ClothingProduct } from "../data/data";
import type { ProductInfo, CartItem } from "./ThriftHappensApp";
import ProductCard from "./ItemCard";

interface productData {
  data: ClothingProduct[];
  productInfo: ProductInfo[];
  handleChangeQuantity: (id: number, delta: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
}

export default function ItemContainer({
  data,
  productInfo,
  handleChangeQuantity,
  handleAddToCart,
}: productData) {
  return (
    <div className="ItemContainer">
      {data.map((products) => {
        const info = productInfo.find(
          (information) => information.id === products.id,
        );

        if (!info) return null;

        return (
          <ProductCard
            key={products.id}
            {...products}
            productInfo={info}
            handleChangeQuantity={handleChangeQuantity}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </div>
  );
}
