// Get all products (for product listing page)
export const getAllProductsQuery = (category) => {
  return {
    query: `
    {
        products(category: "${category}") {
            product_id
            id
            name
            category
            description
            inStock
            attributes {
                    name
                    type
                    items {
                        value
                        displayValue
                    }
            }
            prices {
                amount
                currency
            }
            gallery
        }
    }
`,
  };
};

export const getCategoriesQuery = () => {
  return {
    query: `
    {
       categories {
      id
      name
    }
      }
`,
  };
};

// Place order (checkout)
export const createOrderMutation = ({items, total}) => {
  const itemsGraphQL = items
    .map(
      (item) => `
        {
            productId: ${item.productId},
            quantity: ${item.quantity},
            selectedOptions: ${
              item.selectedOptions
                ? `[${item.selectedOptions
                    .map(
                      (opt) => `
                { name: "${opt.name}", value: "${opt.value}" }
            `,
                    )
                    .join(",")}]`
                : "[]"
            }
        }
    `,
    )
    .join(",");
  return {
    query: `
  mutation {
        placeOrder(items: [${itemsGraphQL}], total: ${total}){
            total
            createdAt
            items{
                product_id
                quantity
                selectedOptions{
                    name
                    value
                }
            }
  }

  }
`,
  };
};
