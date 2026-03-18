import Attribute from "./Attribute";
import BoldPTag from "./BoldPTag";
function CartItem({ item, onChangeCount }) {
  const {
    id,
    name,
    currency,
    price,
    attributes,
    selectedAttributes,
    count,
    image,
  } = item;
  function handleIncrementItem() {
    onChangeCount(id, count + 1);
  }
  function handleDecrementItem() {
    if (count) onChangeCount(id, count - 1);
  }
  return (
    <div className="container mt-3">
      <div className="row justify-content-start w-100">
        <div className="col-7">
          <h3>{name}</h3>
          <BoldPTag>
            {currency}
            {price}
          </BoldPTag>
          {attributes.map((attribute, index) => (
            <Attribute
              attribute={attribute}
              key={`${attribute.id}-${index}`}
              inCart={true}
              selectedAttributeCart={selectedAttributes[attribute.name]}
            />
          ))}
        </div>
        <div className="col-5 my-2">
          <div className="d-flex">
            <div>
              <button
                className="col-2 my-2"
                style={{ width: "25px" }}
                onClick={handleIncrementItem}
                data-testid='cart-item-amount-decrease'
              >
                +
              </button>
              <p className="col-2">{count}</p>
              <button
                className="col-2 my-2"
                style={{ width: "25px" }}
                onClick={handleDecrementItem}
                data-testid='cart-item-amount-increase'
              >
                -
              </button>
            </div>
            <div style={{ marginLeft: "1rem" }}>
              <img className="w-50" src={image} alt={name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
