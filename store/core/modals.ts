import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActionType, ActionWorkType } from "../slices/Action";
import { ActivityType } from "../slices/Activity";
import { CarType } from "../slices/Car";

export type appMessageType = {
  type: "" | "success" | "error" | "warning" | "info";
  title: string;
  desc: string;
};

export enum ModalStep {
  PLAQUE,
  WEIGHTING_FULL,
  WEIGHTING_EMPTY,
  CONFIRM,
}

export type coreType = {
  modals?: {
    step: ModalStep;
    actionType: ActionType;
    activity?: ActivityType;
    car?: CarType;
    selectedWork?: ActionWorkType;
    fullWeghting?: number;
    empltyWeghting?: number;
    address?: string;
  };
  message: appMessageType;
};

const initialState: coreType = {
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
        step: ModalStep;
        actionType: ActionType;
        activity?: ActivityType;
        car?: CarType;
        selectedWork?: ActionWorkType;
        fullWeghting?: number;
        empltyWeghting?: number;
        address?: string;
      }>
    ) => {
      console.log("payload", action.payload);

      state.modals = { ...state.modals, ...action.payload };
    },
    closeModal: (state) => {
      state.modals = undefined;
    },
  },
});

export default coreSlice.reducer;
export const { changeMessage, clearMessage, openModal, closeModal } =
  coreSlice.actions;
