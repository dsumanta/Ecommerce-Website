const backEndDomain = "http://localhost:8080";
export const SummeryAPI = {
  signUp: {
    URL: `${backEndDomain}/api/signUp`,
    method: "post",
  },
  signIn: {
    URL: `${backEndDomain}/api/signIn`,
    method: "post",
  },
  current_user: {
    URL: `${backEndDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    URL: `${backEndDomain}/api/userLogout`,
    method: "get",
  },
  allUser: {
    URL: `${backEndDomain}/api/all-user`,
    method: "get",
  },
  updateUser: {
    URL: `${backEndDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    URL: `${backEndDomain}/api/upload-product`,
    method: "post",
  },
  getAllProduct: {
    URL: `${backEndDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    URL: `${backEndDomain}/api/update-product`,
    method: "post",
  },
  getProductByCatagory: {
    URL: `${backEndDomain}/api/get-productCatagory`,
    method: "get",
  },
  catagoryWiseProduct: {
    URL: `${backEndDomain}/api/catagoryWise-product`,
    method: "post",
  },
  productdetails: {
    URL: `${backEndDomain}/api/product-details`,
    method: "post",
  },
  addToCart: {
    URL: `${backEndDomain}/api/addToacrt`,
    method: "post",
  },
  countAddToCartProductCount: {
    URL: `${backEndDomain}/api/countProductIncart`,
    method: "get",
  },
  addToCartProductView :{
    URL: `${backEndDomain}/api/view-addToCart-product`,
    method: "get",
  },
  updateCart :{
    URL: `${backEndDomain}/api/cartUpdate`,
    method: "post",
  }
};
