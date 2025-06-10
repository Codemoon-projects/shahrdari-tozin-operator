import { ThunkAction, Action, configureStore } from "@reduxjs/toolkit";
import modals from "@/store/core/modals";
import confirm from "@/store/core/confirm";
import auth from "@/store/core/auth";
import ActionReducer from "@/store/slices/Action";
import ActivityReducer from "@/store/slices/Activity";
import CarReducer from "@/store/slices/Car";
import tempReducer from "@/store/slices/temp";

export const store = configureStore({
  reducer: {
    modals,
    confirm,
    auth,
    Action: ActionReducer,
    Activity: ActivityReducer,
    Car: CarReducer,
    temp: tempReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
