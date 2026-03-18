import ProductCard from "./ProductCard";

function ProductsList({products, category, onFastShopping }) {
  function handleFastShopping(product){
    onFastShopping(product);
  }
  const currentProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);
  return (
    <div className="row">
      {currentProducts.map((product) => (
        <ProductCard product={product} key={product.id} onFastShopping={handleFastShopping}/>
      ))}
    </div>
  );
}

export default ProductsList;
