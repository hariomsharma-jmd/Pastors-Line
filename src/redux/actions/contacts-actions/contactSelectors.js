import { createSelector } from "reselect";

const contactsReducer = (state) => state.contactsReducer;

export const isfetchingContacts = createSelector(
  [contactsReducer],
  (state) => state.isFetchingContacts
);

export const contactsList = createSelector(
  [contactsReducer],
  (state) => state.contactsList
);

export const contactsError = createSelector(
  [contactsReducer],
  (state) => state.error
);
