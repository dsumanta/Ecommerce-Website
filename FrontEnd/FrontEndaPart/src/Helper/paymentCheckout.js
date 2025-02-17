import { SummeryAPI } from "../Common/ApiEndPoint";

export const getOrderId = async (payload) => {
  console.log("Yes I am fetching");
  const response = await fetch(SummeryAPI.createOrder.URL, {
    method: SummeryAPI.createOrder.method,
    credentials: "include",
    body:JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  });

  const responseData = await response.json();
  console.log("response",responseData)
  if (responseData.success) {
    return responseData
  }
};
