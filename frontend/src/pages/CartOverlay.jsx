import { useState } from "react";
import CartItem from "../components/CartItem";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router";

function CartOverlay({
  currentActiveCategory,
  cartItems,
  onChangeItemCount,
  onPlaceOrder,
}) {
  const [items, setItems] = useState(cartItems);
  const totalPrice = items
    .reduce((acc, cur) => (acc += cur.price * cur.count), 0)
    .toFixed(2);
  const totalItemsCount = items.reduce((acc, cur) => (acc += cur.count), 0);
  const currency = items[0] ? items[0].currency : "$";

  onChangeItemCount(items);

  function handleChangeItemCount(id, count) {
    setItems((current) => {
      return current.map((item) => {
        if (item.id === id) item.count = count;
        return item;
      });
    });
  }

  function handlePlaceOrder() {
    let selectedKeys = [];
    const orderItems = items.map((item) => {
      const selectedAttributesKeys = Object.keys(item.selectedAttributes);
      selectedAttributesKeys.forEach((k) => {
        selectedKeys.push(k);
      });
      const selectedOptions = selectedKeys.map((option) => {
        return {
          name: option,
          value: item.selectedAttributes[option],
        };
      });
      selectedKeys = [];
      return {
        productId: item.productId,
        quantity: item.count,
        selectedOptions: selectedOptions,
      };
    });
    const order = { items: orderItems, total: +totalPrice, currency };
    setItems([]);
    onPlaceOrder(order);
  }

  return (
    <div className="container cart-container bg-light">
      <span>
        <strong>My Bag, </strong>
        {totalItemsCount} item{`${totalItemsCount === 1 ? "" : "s"}`}
      </span>
      <div className="row flex-column mt-3">
        {items.map((item) =>
          item.count ? (
            <CartItem
              key={`${item.id}-${Math.random}`}
              item={item}
              onChangeCount={handleChangeItemCount}
            />
          ) : (
            ""
          ),
        )}
      </div>
      <div className="row justify-content-start">
        <div className="col-6">
          <span>
            <strong>Total</strong>
          </span>
        </div>
        <div className="col-6">
          <span>
            <strong>
              {currency}
              {totalPrice}
            </strong>
          </span>
        </div>
      </div>
      <div className="my-4 w-100">
        <Link to={`/category/${currentActiveCategory}`}>
          <CustomButton onClick={handlePlaceOrder}>PLACE ORDER</CustomButton>
        </Link>
      </div>
    </div>
  );
}

export default CartOverlay;
