interface FetchApiProps {
  endpoint: string;
  options?: RequestInit;
  body?: object;
}

const baseUrl = "http://localhost:3001";

export const fetchApi = async ({ endpoint, options, body }: FetchApiProps) => {
  const url = baseUrl + endpoint;
  const preparedBody = body && { body: JSON.stringify(body) };
  const preparedOptions = {
    ...options,
    ...(preparedBody && preparedBody),
    headers: {
      "Access-Control-Allow-Origin": "*",
      ...(body && { "Content-Type": "application/json" }),
    },
  };

  console.log(preparedOptions);

  const response = await fetch(url, preparedOptions);
  return response.json();
};

export const fetchApiGet = async (fetchConfig: FetchApiProps) =>
  fetchApi({
    ...fetchConfig,
    options: { ...fetchConfig.options, method: "GET" },
  });

export const fetchApiPost = async (fetchConfig: FetchApiProps) =>
  fetchApi({
    ...fetchConfig,
    options: { ...fetchConfig.options, method: "POST" },
  });

export const fetchApiPatch = async (fetchConfig: FetchApiProps) =>
  fetchApi({
    ...fetchConfig,
    options: { ...fetchConfig.options, method: "PATCH" },
  });

export const fetchApiDelete = async (fetchConfig: FetchApiProps) =>
  fetchApi({
    ...fetchConfig,
    options: { ...fetchConfig.options, method: "DELETE" },
  });
