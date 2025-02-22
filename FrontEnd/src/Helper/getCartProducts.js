import { SummeryAPI } from "../Common/ApiEndPoint";

export const getcartProducts = async () => {
  console.log("Yes I am fetching");
  const response = await fetch(SummeryAPI.addToCartProductView.URL, {
    method: SummeryAPI.addToCartProductView.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
  if (responseData.success) {
    const productPromises = responseData.data?.map(async (item) => {
      const prod = await fetchProductDetails(item?.["productId"]);
      const producrDetails = { ...prod.data, quantity: item["quantity"] };
      console.log("price inside promise", prod?.data?.sellingPrice);
      return producrDetails;
    });

    const product = await Promise.all(productPromises);
    const totalPrice = product.reduce((acc, item) => {
      return acc + item.quantity * item.sellingPrice; 
  }, 0);
    console.log("totalPrice",totalPrice)
    return {product,totalPrice};
  }
};
const fetchProductDetails = async (item) => {
  const res = await fetch(SummeryAPI.productdetails.URL, {
    method: SummeryAPI.productdetails.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ productId: item }),
  });
  const product = await res.json();
  return product;
};
