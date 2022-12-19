/**
 * Read from the .env.local file to get a setup / change the default values for the environment
 * @type {*|string}
 */
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Customizable API function using Fetch API to get data from the API
 * @param endpoint { string}
 * @param data { object}
 * @param customHeaders { object}
 * @param user { object}
 * @param customConfig { object }
 * @returns {Promise<Response>}
 */
const apiClient = async (
  endpoint,
  { data, headers: customHeaders, user, ...customConfig } = {},
) => {
  let authorizationToken;

  if (user) {
    authorizationToken = btoa(`${user.emailAddress || user.email}:${user.password}`);
  }

  /**
   * Fetch config
   * @type {{headers: {Authorization: (string|undefined), 'Content-Type': (string|undefined)}, method: (string), body: (string|undefined)}}
   */
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

  /**
   * call the API using fetch and return the data as a Promise
   */
  return window.fetch(`${apiUrl}/${endpoint}`, clientConfig).then(async (response) => {
    console.log('RESPONSE: ,', response);
    /**
     * if requests are OK then return true ( no content response )
     */
    if (response.status === 201 || response.status === 204) {
      return true;
    }

    /**
     * if a server error occurs just reject the HTTP call for error handling
     */
    if (response.status === 500) {
      return Promise.reject(500);
    }

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data.errors);
    }
  });
};

export { apiClient };
