import contactActionTypes from "./contactActionTypes";

export const actionGetContactList = (page, companyId, searchText) => {
  return {
    type: contactActionTypes.GET_CONTACTS_REQUEST,
    payload: {
      page,
      companyId,
      searchText,
    },
  };
};

export const actionGetContactListResponse = (payload) => {
  return {
    type: contactActionTypes.GET_CONTACTS_RESPONSE,
    payload: payload,
  };
};

export const actionGetContactListError = (payload) => {
  return {
    type: contactActionTypes.GET_CONTACTS_ERROR,
    payload: payload,
  };
};

export const actionGetContactListClear = () => {
  return {
    type: contactActionTypes.GET_CONTACTS_CLEAR,
  };
};
