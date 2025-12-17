export const API_URL = `https://fakestoreapi.com/`;

const getHeaders = async (method = "get", body = {}) => {
  let headers = {};

  headers = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (method !== "get" && method !== "delete" && body !== null) {
    headers.body = JSON.stringify(body);
  }

  return headers;
};

export const fetchData = async (apiName, method = "get", data = {}) => {
  const object = await getHeaders(method, data);

  let api = apiName.includes("https") ? apiName : `${API_URL}${apiName}`;

  return fetch(api, object)
    .then((res) => {
      return res.json().then((data) => {
        return data;
      });
    })
    .catch((err) => {
      return err;
    });
};
