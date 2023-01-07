import { takeLatest, call, put } from "redux-saga/effects";
import { GET_CONTACTS_API } from "../../../constants/APIsConstants";
import { httpClient } from "../../../services/rest-client";
import contactActionTypes from "../../actions/contacts-actions/contactActionTypes";
import {
  actionGetContactListResponse,
  actionGetContactListError,
} from "../../actions/contacts-actions/contactsActions";

function* getContactsWorkerSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(getContactsCall, payload);
    if (response.status === 200) {
      yield put(actionGetContactListResponse(response.data));
    } else {
      yield put(actionGetContactListError(response));
    }
  } catch (error) {
    yield put(actionGetContactListError(error));
  }
}

async function getContactsCall(payload) {
  const { page, companyId, searchText } = payload;
  const url =
    GET_CONTACTS_API +
    `?companyId=${companyId}&page=${page}&query=${searchText}`;
  const response = await httpClient.get(url);
  return response;
}

export function* contactsWatcherSaga() {
  yield takeLatest(
    contactActionTypes.GET_CONTACTS_REQUEST,
    getContactsWorkerSaga
  );
}
