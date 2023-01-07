import { combineReducers } from "redux";
import contactsReducer from "./contacts-reducer";

const rootReducer = combineReducers({
  contactsReducer,
});

export default rootReducer;
