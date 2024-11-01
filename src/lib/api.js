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
    `/api/global?fields[0]=sitename&fields[1]=description&populate[cover][fields][0]=url`,
    {
      cache: "no-store",
    }
  );
  return dataGlobal.data;
};

// ABOUT PAGE
export const getAbout = async () => {
  const dataAbout = await fetchAPI(
    `/api/about?fields[0]=title&fields[1]=description&fields[2]=email&fields[3]=phone&fields[4]=short&fields[5]=agencies&populate[profile][fields][0]=url&populate[logos][fields][0]=url&populate[logos][fields][1]=alternativeText`,
    {
      cache: "no-store",
    }
  );
  return dataAbout.data;
};

// PRIVACY PAGE
export const getPrivacy = async () => {
  const dataPrivacy = await fetchAPI(
    `/api/privacy?fields[0]=title&fields[1]=date&fields[2]=content`,
    {
      cache: "no-store",
    }
  );
  return dataPrivacy.data;
};

// TERMS PAGE
export const getTerms = async () => {
  const dataTerms = await fetchAPI(
    `/api/terms-of-use?fields[0]=title&fields[1]=date&fields[2]=content`,
    {
      cache: "no-store",
    }
  );
  return dataTerms.data;
};

// WORKS INDEX
export const getWorks = async (page = 1, pageSize = 12) => {
  const dataWorks = await fetchAPI(
    `/api/works?fields[0]=title&fields[1]=slug&fields[2]=client&populate[cover][fields][0]=url&populate[disciplines][fields][0]=title&sort[0]=date:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    {
      cache: "no-store",
    }
  );
  return {
    data: dataWorks.data,
    meta: dataWorks.meta,
  };
};

// WORK PAGE
export const getWorkBySlug = async (slug) => {
  const dataWorkBySlug = await fetchAPI(
    `/api/works?filters[slug]=${slug}&fields[0]=title&fields[1]=slug&fields[2]=client&fields[3]=campaign&fields[4]=agency&fields[5]=country&fields[6]=creative&fields[7]=strategy&fields[8]=lead&fields[9]=design&fields[10]=copywriting&fields[11]=illustration&fields[12]=animation&fields[13]=photo&fields[14]=team&fields[15]=description&populate[images][fields][0]=url&populate[images][fields][1]=alternativeText&populate[cover][fields][0]=url&populate[disciplines][fields][0]=title`,
    {
      cache: "no-store",
    }
  );

  if (dataWorkBySlug.data.length === 0) {
    throw new Error("Work not found");
  }

  const dataWork = dataWorkBySlug.data[0];
  return dataWork;
};

// DISCIPLINES FILTER
export const getDisciplines = async () => {
  const dataDisciplines = await fetchAPI(`/api/disciplines?fields[0]=title`, {
    cache: "no-store",
  });
  return dataDisciplines.data;
};

// HOME HERO
export const getHomeHero = async () => {
  const dataHomeHero = await fetchAPI(
    `/api/home-hero?fields[0]=title&fields[1]=quote&populate[cover][fields][0]=url`,
    {
      cache: "no-store",
    }
  );
  return dataHomeHero.data;
};
