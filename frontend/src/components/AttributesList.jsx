import Attribute from "./Attribute";

function AttributesList({ attributes, onCompleteAttribute }) {
  const attributeObject = {};
  attributes.forEach(({ name }) => {
    attributeObject[name] = "";
  });
  function handleCompleteAttribute(selectedAttribute) {
    Object.keys(selectedAttribute).forEach((key) => {
      attributeObject[key] = selectedAttribute[key];
    });
    onCompleteAttribute(attributeObject);
  }
  return (
    <div>
      {attributes.map((attribute, index) => (
        <Attribute
          attribute={attribute}
          key={`${attribute.id}-${index}`}
          selectedAttribute={handleCompleteAttribute}
        />
      ))}
    </div>
  );
}

export default AttributesList;
