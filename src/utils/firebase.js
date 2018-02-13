import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/messaging';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyClgI2ZhEdWsE7zXfoPd7KovKMLvMETabU',
  projectId: 'brainwave-gmlta',
  messagingSenderId: '40338152301',
};

const firebaseInstance = firebase.initializeApp(config);

const errorCodesLocale = {
  'ru': {
    'auth/user-not-found': 'Пользователь с таким адресом электронной почты не найден',
  },
};

export function translateError(error, locale = 'ru') {
  if (errorCodesLocale.hasOwnProperty(locale)) {
    if (errorCodesLocale[locale].hasOwnProperty(error.code)) {
      return errorCodesLocale[locale][error.code];
    }
  }
  return error.message;
}

export const verifier = firebase.auth.RecaptchaVerifier;
export { firebaseInstance };

export default firebaseInstance;
