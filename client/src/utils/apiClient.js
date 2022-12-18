const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = async (endpoint, { data, headers: customHeaders, ...customConfig } = {}) => {
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
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data.errors);
    }
  });
};

export { apiClient };
