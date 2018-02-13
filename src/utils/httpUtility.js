import {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} from 'http-status';

import { isString } from 'utils/misc';

const prepareHeaders = (headers) => {
  return {
    ...headers,
    'Accept' : 'application/json',
    'Content-Type': 'application/json',
  };
};

// todo: still needs rewrite
async function prepareResponse (responseInfo) {
  const statusCode = responseInfo.status;

  if (statusCode >= INTERNAL_SERVER_ERROR) {
    throw {
      statusCode,
      data : [ 'Sorry, we have some technical issues. Try your request later' ],
    };
  }

  let data;

  if (statusCode != NOT_FOUND) {
    data = await responseInfo.text();
    if (isString(data) && data.length !== 0) {
      data = JSON.parse(data);
    }
  }

  switch (statusCode) {
  case OK:
    return {
      statusCode,
      data,
    };

  case BAD_REQUEST:
    throw {
      statusCode,
      data,
    };

  default:
    throw {
      statusCode,
      data : data ? data : [ responseInfo.statusText ],
    };
  }
}

export const httpUtility = {
  post : async (url, headers, data) => {
    const responseInfo = await fetch(url, {
      method : 'POST',
      headers : prepareHeaders(headers),
      body : isString(data) ? data : JSON.stringify(data),
    });

    return await prepareResponse(responseInfo);
  },

  put : async (url, headers, data) => {
    const responseInfo = await fetch(url, {
      method : 'PUT',
      headers : prepareHeaders(headers),
      body : isString(data) ? data : JSON.stringify(data),
    });

    return await prepareResponse(responseInfo);
  },

  get : async (url, headers) => {
    const responseInfo = await fetch(url, {
      method : 'GET',
      headers : prepareHeaders(headers),
    });

    return await prepareResponse(responseInfo);
  },
};

export const buildQueryStringByObject = (obj) => {
  return Object.keys(obj).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
};
