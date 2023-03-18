import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./historyReducer";

const store = configureStore({ reducer: historyReducer });

export default store;
