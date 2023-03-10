import axios from "axios";

const DEFAULT_HOST = 'https://app.chatwoot.com';
const DEFAULT_API_VERSION = 'api/v1';

export const buildClient = ({
  config: {
    host = DEFAULT_HOST,
    apiVersion = DEFAULT_API_VERSION,
    apiAccessToken
  }
}) => {
  return axios.create({
    baseURL: `${host}/${apiVersion}`,
    timeout: 20000,
    headers: { api_access_token: apiAccessToken, "Content-Type": "application/json; charset=utf-8" }
  });
};
