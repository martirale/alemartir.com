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

// METADATA GLOBAL
export const getGlobal = async () => {
  const dataGlobal = await fetchAPI(
    "/api/global?fields[0]=sitename&fields[1]=description",
    {
      cache: "no-store",
    }
  );
  return dataGlobal.data;
};

// ABOUT PAGE
export const getAbout = async () => {
  const dataAbout = await fetchAPI(
    "/api/about?fields[0]=title&fields[1]=description&fields[2]=email&fields[3]=phone&populate[profile][fields][0]=url",
    {
      cache: "no-store",
    }
  );
  return dataAbout.data;
};

// PRIVACY PAGE
export const getPrivacy = async () => {
  const dataPrivacy = await fetchAPI(
    "/api/privacy?fields[0]=title&fields[1]=date&fields[2]=content",
    {
      cache: "no-store",
    }
  );
  return dataPrivacy.data;
};
