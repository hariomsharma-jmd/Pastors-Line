import { all, fork } from "redux-saga/effects";
import { contactsWatcherSaga } from "./contacts-saga";

export default function* rootSaga() {
  yield all([fork(contactsWatcherSaga)]);
}
