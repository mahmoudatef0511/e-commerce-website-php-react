function AttributeItem({ item, type, selected, onSelect, attributeName }) {
  const { displayValue, value } = item;
  return (
    <div
      className="col-2"
      data-testid={`cart-item-attribute-${attributeName.split(" ").join("-")}-${attributeName.split(" ").join("-")}${selected ? "-selected" : ""}`}
    >
      {type === "text" && (
        <p
          className={`attribute-item ${selected ? "attribute-item-text-selected" : ""}`}
          onClick={onSelect}
        >
          {value}
        </p>
      )}
      {type === "swatch" && (
        <p
          className={`attribute-item attribute-item-swatch ${selected ? "attribute-item-swatch-selected" : ""}`}
          style={{ backgroundColor: `${value}` }}
          onClick={onSelect}
        ></p>
      )}
    </div>
  );
}

export default AttributeItem;
