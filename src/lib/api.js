const strapiUrl = process.env.STRAPI_API_URL;
const strapiToken = process.env.STRAPI_API_TOKEN;

const fetchAPI = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${strapiToken}`,
      "Content-Type": "application/json",
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const response = await fetch(`${strapiUrl}${endpoint}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}`);
  }

  return response.json();
};

// ABOUT PAGE
export const getAbout = async () => {
  const dataAbout = await fetchAPI(
    "/api/about?fields[0]=title&fields[1]=description&fields[2]=email&fields[3]=phone&populate[profile][fields][0]=url"
  );
  return dataAbout.data;
};
