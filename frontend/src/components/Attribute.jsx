import { useState } from "react";
import AttributeItem from "./AttributeItem";
import BoldPTag from "./BoldPTag";

function Attribute({
  attribute,
  selectedAttribute,
  inCart = false,
  selectedAttributeCart = "",
}) {
  const { items, name, type } = attribute;
  const [selected, setSelected] = useState(selectedAttributeCart);
  function handleSelectAttribute(value) {
    if (!inCart) {
      setSelected(value);
      selectedAttribute({ [name]: value });
    }
  }
  return (
    <div
      className="row g-1"
      data-testid={`${inCart ? "cart-item" : "product"}-attribute-${name.split(" ").join("-")}`}
    >
      <BoldPTag>{name.toUpperCase()}:</BoldPTag>
      {items.map((item, index) => (
        <AttributeItem
          attributeName={name}
          item={item}
          key={`${item.id}-${index}-${type}`}
          type={type}
          selected={selected === item.value}
          onSelect={() => handleSelectAttribute(item.value)}
        />
      ))}
    </div>
  );
}

export default Attribute;
