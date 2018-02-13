import urljoin from 'url-join';

import { API_URL } from '../../app/config';
import { httpUtility } from '../../utils/httpUtility';

export const signUp = (signUpData) => {
  const headers = {
    'Content-type' : 'application/json',
  };

  const body = {
    Name : signUpData.name,
    Login : signUpData.email,
    Password : signUpData.password,
  };

  return httpUtility.post(urljoin(API_URL, '/account/register'), headers, body);
};
