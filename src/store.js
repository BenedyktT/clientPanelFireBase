import { createStore } from "redux";
import firebase from "firebase";
import rootReducer from "./reducers/rootReducer";
import "firebase/auth";
import "firebase/firestore";

import { createFirestoreInstance } from "redux-firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "react-client-panel-d5126.firebaseapp.com",
  databaseURL: "https://react-client-panel-d5126.firebaseio.com",
  projectId: "react-client-panel-d5126",
  storageBucket: "react-client-panel-d5126.appspot.com",
  messagingSenderId: "892443631804",
  appId: "1:892443631804:web:06d572bcc49579574470b9"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
if (!localStorage.getItem("settings")) {
  const initialSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: true
  };
  localStorage.setItem("settings", JSON.stringify(initialSettings));
}
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};

export default store;
