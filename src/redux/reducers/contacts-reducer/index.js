import contactActionTypes from "../../actions/contacts-actions/contactActionTypes";

const initialState = {
  isFetchingContacts: false,
  contactsList: null,
  error: null,
};

const contactsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case contactActionTypes.GET_CONTACTS_REQUEST:
      return {
        ...state,
        isFetchingContacts: true,
        contactsList: null,
        error: null,
      };
    case contactActionTypes.GET_CONTACTS_RESPONSE:
      return {
        ...state,
        isFetchingContacts: false,
        contactsList: payload,
        error: null,
      };
    case contactActionTypes.GET_CONTACTS_ERROR:
      return {
        ...state,
        isFetchingContacts: false,
        contactsList: null,
        error: payload,
      };
    case contactActionTypes.GET_CONTACTS_CLEAR:
      return initialState;
    default:
      return state;
  }
};

export default contactsReducer;
