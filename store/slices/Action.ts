import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ActionType {
  id: number;
  name: string;
  type: "empty" | "full";
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
      action: PayloadAction<{ data: ActionType; id: ActionType["id"] }>
    ) => ({
      ...state,
      data: [
        action.payload.data,
        ...state.data.filter((d) => d.id !== action.payload.id),
      ],
    }),
    Action_remove: (
      state,
      action: PayloadAction<{ id: ActionType["id"] }>
    ) => ({
      ...state,
      data: state.data.filter((d) => d.id !== action.payload.id),
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
