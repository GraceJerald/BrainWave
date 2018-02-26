import firebase from 'utils/firebase';

export const fetchSensorSchemas = () => {
  return firebase.firestore().collection('settings').doc('sensors').collection('schemas').get()
    .then(schemaSnapshot => {
      if (schemaSnapshot.empty) {
        return Promise.resolve([]);
      }
      let schemas = {};
      schemaSnapshot.forEach(schema => schemas[schema.id] = schema.data());
      return Promise.resolve(schemas);
    });
};

export const storeSensorSchema = (schema) => {
  return firebase.firestore()
    .collection('settings')
    .doc('sensors')
    .collection('schemas')
    .doc(`${schema.disability}-${schema.stimuli}-${schema.comfort}`)
    .set(schema);
};
