/* eslint-disable react-refresh/only-export-components */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../App/User/userSlice";
import createSagaMiddleware from "@redux-saga/core";
import userSaga from "./User/userSaga";
import taskReducer from "../App/Task/taskSlice";

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(userSaga);
