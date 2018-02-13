export const OperationState = {
  IDLE : 0,
  FETCHING : 1,
  FETCHED : 2,
  EDITING : 3,
  SAVING : 4,
  SAVED : 5,
  ERROR : 6,
};

export const Time = {
  SECOND : 1000,
  MINUTE : 60 * 1000,
  HOUR : 60 * 60 * 1000,
  DAY : 24 * 60 * 60 * 1000,
};

export const UserRole = {
  ADMIN : 0,
  CARETAKER : 1,
};
