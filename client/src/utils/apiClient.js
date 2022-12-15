const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const client = async (endpoint, { data, headers: customHeaders, ...customConfig } = {}) => {
  const clientConfig = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`${apiUrl}/${endpoint}`, clientConfig).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      return Promise.reject(data);
    }
  });
};

export { client };
