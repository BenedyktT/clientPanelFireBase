import { createStore, combineReducers } from "redux";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYQ8uT8orecgEBW3Dj4AIMXKUqaDLrJbs",
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

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

const initialState = {};

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
