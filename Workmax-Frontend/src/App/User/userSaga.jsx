// import { onAuthStateChanged } from "firebase/auth";
// import { call, put, takeEvery } from "redux-saga/effects";
// import { auth } from "../../firebaseConfig";
// import { setUserLoginDetails } from "./userSlice";

// function* workGetUsersApi() {
//   const user = yield call(() => {
//     onAuthStateChanged(auth, (res) => {
//       console.log(res);
//       return res;
//     });
//   });
//   yield put(setUserLoginDetails(user));
//   console.log("SAGA", user);
// }

function* userSaga() {
  //   yield takeEvery("user/getUserStatus", workGetUsersApi);
}

export default userSaga;
