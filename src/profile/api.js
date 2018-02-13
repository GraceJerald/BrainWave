import firebase from 'utils/firebase';

export const fetchUser = (userId) => {
  return firebase.firestore().collection('users').doc(userId).get();
};

export const fetchTeam = (userId) => {
  return firebase.firestore().collection('teams').doc(userId).get();
};

export const saveUser = (userData) => {
  const {id, ...data} = userData;
  return firebase.firestore().collection('users').doc(id).update(data);
};

export const saveTeam = (teamData) => {
  const {id, ...data} = teamData;
  return firebase.firestore().collection('teams').doc(id).set(data);
};

export const verifyPhone = (phoneNumber) => {
  return firebase.auth().currentUser.linkWithPhoneNumber(phoneNumber, window.recaptchaVerifier);
};

export const verifyPhoneConfirmRequest = (confirmationResult, code) => {
  return confirmationResult.confirm(code);
};

export const joinGameToggled = (gameId, teamId, joined) => {
  if (joined) {
    return firebase.firestore().collection('gameStatus').doc(gameId).collection('teams').doc(teamId).set({
      bonuses: 0,
    });
  } else {
    return firebase.firestore().collection('gameStatus').doc(gameId).collection('teams').doc(teamId).delete();
  }
};

export const fetchTeamGameData = (teamId) => {
  return new Promise((resolve, reject) => {
    firebase.firestore().collection('gameStatus').get()
      .then(games => {
        let gameStatusesRefs = [];
        games.forEach(game => {
          gameStatusesRefs.push(game.ref.collection('teams').doc(teamId).get());
        });
        Promise.all(gameStatusesRefs)
          .then(gameStatuses => {
            resolve(gameStatuses
              .filter(gameStatus => gameStatus.exists)
              .map(gameStatus => ({
                id: gameStatus.ref.parent.parent.id,
                ...gameStatus.data(),
              })));
          })
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
  });
};
