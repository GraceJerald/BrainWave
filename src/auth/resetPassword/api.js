import firebase from 'utils/firebase';

export const resetPassword = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};
