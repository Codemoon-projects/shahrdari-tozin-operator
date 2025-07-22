import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ExprotTypes {
  id: number;
  name: string;
  shema: string;
}

export interface UploadTypes {
  id: number;
  name: string;
}
export interface ActionWorkType {
  id: number;
  name: string;
}

export interface ActionType {
  pk: number;
  name: string;
  type: "empty" | "full";
  exports: ExprotTypes[];
  uploads: UploadTypes[];
  works: ActionWorkType[];
}

interface SliceType {
  data: ActionType[];
}

const initialState: SliceType = { data: [] };

const Action = createSlice({
  name: "Action",
  initialState,
  reducers: {
    Action_set: (state, action: PayloadAction<ActionType[]>) => ({
      ...state,
      data: action.payload,
    }),
    Action_clear: (state) => ({ ...state, data: [] }),
    Action_add: (state, action: PayloadAction<ActionType>) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
    Action_update: (
      state,
      action: PayloadAction<{ data: ActionType; id: ActionType["pk"] }>
    ) => ({
      ...state,
      data: [
        action.payload.data,
        ...state.data.filter((d) => d.pk !== action.payload.id),
      ],
    }),
    Action_remove: (
      state,
      action: PayloadAction<{ id: ActionType["pk"] }>
    ) => ({
      ...state,
      data: state.data.filter((d) => d.pk !== action.payload.id),
    }),
  },
});
export default Action.reducer;
export const {
  Action_clear,
  Action_set,
  Action_add,
  Action_update,
  Action_remove,
} = Action.actions;
