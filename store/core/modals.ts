import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActionType } from "../slices/Action";
import { ActivityType } from "../slices/Activity";
import { CarType } from "../slices/Car";

export type appMessageType = {
  type: "" | "success" | "error" | "warning" | "info";
  title: string;
  desc: string;
};

export type modals = "mainModal" | "customMessageModal";

export type coreType = {
  modals: {
    [key in modals]?: {
      isOpen?: boolean;
      actionType?: ActionType;
      activity?: ActivityType;
      car?: CarType;
    };
  };
  message: appMessageType;
};

const initialState: coreType = {
  modals: {},
  message: {
    type: "",
    title: "",
    desc: "",
  },
};

const coreSlice = createSlice({
  name: "coreSlice",
  initialState,
  reducers: {
    changeMessage: (state, action: PayloadAction<appMessageType>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = {
        type: "",
        title: "",
        desc: "",
      };
    },
    openModal: (
      state,
      action: PayloadAction<{
        name: modals;
        actionType: ActionType;
        activity?: ActivityType;
        car?: CarType;
      }>
    ) => {
      state.modals[action.payload.name] = {
        isOpen: true,
        actionType: action.payload.actionType,
        activity: action.payload.activity,
      };
    },
    closeModal: (state, action: PayloadAction<modals>) => {
      state.modals[action.payload] = undefined;
    },
  },
});

export default coreSlice.reducer;
export const { changeMessage, clearMessage, openModal, closeModal } =
  coreSlice.actions;
