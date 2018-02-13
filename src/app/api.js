import firebase from 'utils/firebase';

export const storeNotificationToken = (token) => {
  const userId = firebase.auth().currentUser.uid;
  return firebase.firestore().collection('users').doc(userId).update({
    notificationToken: token,
  });
};
