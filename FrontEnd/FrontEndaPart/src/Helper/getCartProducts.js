import { SummeryAPI } from "../Common/ApiEndPoint";

export const getcartProducts = async () => {
    console.log("Yes I am fetching")
    const response = await fetch(SummeryAPI.addToCartProductView.URL, {
      method: SummeryAPI.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();
    if (responseData.success) {
      let product = [];
      responseData.data?.map((item) => {
        fetchProductDetails(item?.["productId"]).then((prod) => {
          const producrDetails = { ...prod.data, quantity: item["quantity"] };
          console.log("price inside promise", prod?.data?.sellingPrice);
          
          product.push(producrDetails);
        });
      });

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