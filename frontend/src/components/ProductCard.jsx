import { useState } from "react";
import { Link } from "react-router";

function ProductCard({ product, onFastShopping }) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    product_id,
    id,
    name,
    gallery,
    prices,
    inStock,
    category,
    attributes,
  } = product;
  const { amount, currency } = prices[0];
  function handleFastShopping() {
    let selectedAttributes = {};
    attributes.forEach(
      (attribute) =>
        (selectedAttributes[attribute.name] = attribute.items[0].value),
    );
    const cartProduct = {
      productId: product_id,
      id: id + Object.values(selectedAttributes).join("-"),
      name,
      price: amount,
      currency,
      attributes,
      count: 1,
      selectedAttributes,
      image: gallery[0],
    };
    onFastShopping(cartProduct);
  }
  return (
    <div
      className={`col-4 p-5 my-5 product-container ${inStock ? "instock" : "outstock"}-product`}
      data-testid={`product-${name.split(" ").join("-")}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!inStock && <span className="outstock-span">OUT OF STOCK</span>}
      {inStock && isHovered && (
        <img
          src="/add-to-cart.png"
          className="add-to-cart-icon"
          onClick={handleFastShopping}
        />
      )}
      <Link
        to={`/category/${category}/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={`product-card ${isHovered ? "hovered" : ""}`}>
          <img
            src={gallery[0]}
            className="card-img-top product-image"
            alt={name}
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              {currency}
              {amount}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
