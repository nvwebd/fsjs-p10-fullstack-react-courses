const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = async (
  endpoint,
  { data, headers: customHeaders, user, ...customConfig } = {},
) => {
  let authorizationToken;

  if (user) {
    authorizationToken = btoa(`${user.emailAddress}:${user.password}`);
  }

  console.log('authorizationToken: ', authorizationToken);

  const clientConfig = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : undefined,
      Authorization: user ? `Basic ${authorizationToken}` : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(`${apiUrl}/${endpoint}`, clientConfig).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log('data ERRORS CLIENT: ', data);
      return Promise.reject(data.errors);
    }
  });
};

export { apiClient };
