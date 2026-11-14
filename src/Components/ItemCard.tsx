import type { ClothingProduct } from "../data/data";
import type { CartItem, ProductInfo } from "./ThriftHappensApp";

interface ItemCardProps extends ClothingProduct {
  productInfo: ProductInfo;
  handleChangeQuantity: (id: number, delta: number) => void;
  handleAddToCart: (CartItem: CartItem) => void;
}

export default function ProductCard({
  id,
  image,
  name,
  fit,
  category,
  color,
  description,
  size,
  price,
  quantity,
  productInfo,
  handleChangeQuantity,
  handleAddToCart,
}: ItemCardProps) {
  interface productInfo {
    itemQuantity: number;
    price: number;
  }

  // //Compund state for quantity and price selected
  // const [productInfo, setProductInfo] = useState<productInfo>({
  //   itemQuantity,
  //   price,
  // });

  return (
    <div className="ItemCard">
      <h2>{name}</h2>
      <img src={image} alt="" height="100px" />
      <p>Fit: {fit}</p>
      <p>Category: {category}</p>
      <p>Color: {color}</p>
      <p>Description: {description}</p>
      <p>Size: {size}</p>
      <p>Cost: ${price}</p>
      <p>{quantity === 0 ? "Out of Stock" : `Stock: ${quantity}`}</p>
      <br />
      <button onClick={() => handleChangeQuantity(id, -1)}>-</button>
      <span> {productInfo.quantity} </span>
      <button onClick={() => handleChangeQuantity(id, 1)}>+</button>
      <br />
      <button
        onClick={() =>
          handleAddToCart({
            id: id,
            image: image,
            product: name,
            price,
            quantity: productInfo.quantity,
            total: productInfo.price * productInfo.quantity,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}
