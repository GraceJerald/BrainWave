import firebase from 'utils/firebase';

export const fetchPatients = () => {
  return firebase.firestore().collection('patients').get()
    .then(patientsSnapshot => {
      if (patientsSnapshot.empty) {
        return Promise.resolve([]);
      }
      let patients = [];
      patientsSnapshot.forEach(patient => patients.push({
        id: patient.id,
        ...patient.data(),
      }));
      return Promise.resolve(patients);
    });
};

export const savePatient = (patient) => {
  if (patient.hasOwnProperty('id')) {
    const { name, disability, comfort, stimuli} = patient;
    return firebase.firestore().collection('patients').doc(patient.id).set({name, disability, comfort, stimuli})
      .then(() => {
        const savedPatient = {
          ...patient,
        };
        return Promise.resolve(savedPatient);
      });
  } else {
    return firebase.firestore().collection('patients').add(patient)
      .then((patientRef) => {
        const savedPatient = {
          id: patientRef.id,
          ...patient,
        };
        return Promise.resolve(savedPatient);
      });
  }
};

export const deletePatient = (patientId) => {
  return firebase.firestore().collection('patients').doc(patientId).delete()
    .then(() => {
      return Promise.resolve(patientId);
    });
};
