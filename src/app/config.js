import urljoin from 'url-join';

export const SERVER_ROOT_URL = process.env.SERVER_URL;
export const API_URL = urljoin(SERVER_ROOT_URL, '/api');
export const AUTH_URL = SERVER_ROOT_URL;
