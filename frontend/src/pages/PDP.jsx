import { useState } from "react";
import AttributesList from "../components/AttributesList";
import BoldPTag from "../components/BoldPTag";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router";

function PDP({ product, onAddToCart }) {
  const {
    product_id,
    id,
    name,
    attributes,
    prices,
    gallery,
    description,
    inStock,
  } = product;
  const { amount, currency } = prices[0];

  const [mainSliderImage, setMainSliderImage] = useState(gallery[0]);

  let fullAttributeObject = {};

  function parseDescription(desc) {
    const parser = new DOMParser();
    const parsedDoc = parser.parseFromString(desc, "text/html");
    return parsedDoc.body.textContent;
  }

  function getFullAttribute(attributeObject) {
    fullAttributeObject = { ...attributeObject };
  }

  function handleNextImage() {
    const currentImageIndex = gallery.indexOf(mainSliderImage);
    if (currentImageIndex === gallery.length - 1)
      setMainSliderImage(gallery[0]);
    else setMainSliderImage(gallery[currentImageIndex + 1]);
  }

  function handlePreviousImage() {
    const currentImageIndex = gallery.indexOf(mainSliderImage);
    if (currentImageIndex === 0)
      setMainSliderImage(gallery[gallery.length - 1]);
    else setMainSliderImage(gallery[currentImageIndex - 1]);
  }

  function addProductToCart() {
    const attributesValues = Object.values(fullAttributeObject);
    if (!attributesValues.length || attributesValues.includes("") || !inStock)
      return;
    const cartProduct = {
      productId: product_id,
      id: id + attributesValues.join("-"),
      name,
      price: amount,
      currency,
      attributes,
      count: 1,
      selectedAttributes: fullAttributeObject,
      image: gallery[0],
    };
    onAddToCart(cartProduct);
  }

  function handleClickImage(e) {
    setMainSliderImage(e.target.src);
  }

  parseDescription(description);
  return (
    <div className="container text-left pdp-container p-5">
      <div className="row">
        <div className="col-7">
          <div className="row justify-content-end">
            <div className="col-2">
              <div className="gallery-container" data-testid="product-gallery">
                <div className="d-flex flex-column">
                  {gallery.map((galleryImage) => (
                    <div key={galleryImage} className="slider-image">
                      <img
                        src={galleryImage}
                        alt={name}
                        onClick={handleClickImage}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-8 position-relative">
              <button
                className="next-btn position-absolute"
                onClick={handleNextImage}
              >
                <img src="/rightArrow.png" alt="" />
              </button>
              <button
                className="previous-btn position-absolute"
                onClick={handlePreviousImage}
              >
                <img src="/leftArrow.png" alt="" />
              </button>
              <div>
                <img
                  src={mainSliderImage}
                  className="main-slider-image"
                  alt={name}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <h3>{name}</h3>
          <AttributesList
            attributes={attributes}
            onCompleteAttribute={getFullAttribute}
          />
          <BoldPTag>PRICE:</BoldPTag>
          <BoldPTag>
            {currency}
            {amount}
          </BoldPTag>
          <p>
            {inStock ? (
              <Link to={`/category/all`}>
                <CustomButton
                  dataTestID={"add-to-cart"}
                  onClick={addProductToCart}
                  disabled={!inStock}
                >
                  ADD TO CART
                </CustomButton>
              </Link>
            ) : (
              <CustomButton
                dataTestID={"add-to-cart"}
                onClick={addProductToCart}
                disabled={!inStock}
              >
                ADD TO CART
              </CustomButton>
            )}
          </p>
          <p data-testid="product-description">
            {parseDescription(description)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PDP;
