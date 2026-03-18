import ProductsList from "../components/ProductsList";

function Category({products, category, onFastShopping }) {
  function handleFastShopping(product){
    onFastShopping(product);
  }
  return (
    <div className="container plp-container">
      <h4>{category.toUpperCase()}</h4>
      <ProductsList products={products} category={category} onFastShopping={handleFastShopping}/>
    </div>
  );
}

export default Category;
