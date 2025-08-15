import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CarType } from "./Car";
import { ActionType, ActionWorkType } from "./Action";

export interface ActivityType {
  pk: number;
  Empty: number | null;
  Full: number | null;
  Car: CarType;
  Action: ActionType;
  baskol_number_empty?: number;
  baskol_number_full?: number;
  server_accepted: boolean;
  work_type: ActionWorkType;
  work_type_id: number;
  address?: string;
}

interface SliceType {
  data: ActivityType[];
}

const initialState: SliceType = { data: [] };

const Activity = createSlice({
  name: "Activity",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<ActivityType[]>) => ({
      ...state,
      data: action.payload,
    }),
    clear: (state) => ({ ...state, data: [] }),
    add: (state, action: PayloadAction<ActivityType>) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
    update: (
      state,
      action: PayloadAction<{ data: ActivityType; pk: ActivityType["pk"] }>
    ) => ({
      ...state,
      data: [
        action.payload.data,
        ...state.data.filter((d) => d.pk !== action.payload.pk),
      ],
    }),
    remove: (state, action: PayloadAction<{ pk: ActivityType["pk"] }>) => ({
      ...state,
      data: state.data.filter((d) => d.pk !== action.payload.pk),
    }),

    update_empty: (
      state,
      action: PayloadAction<{ pk: ActivityType["pk"]; empty: number }>
    ) => ({
      ...state,
      data: state.data.map((d) =>
        d.pk === action.payload.pk ? { ...d, Empty: action.payload.empty } : d
      ),
    }),
    update_full: (
      state,
      action: PayloadAction<{ pk: ActivityType["pk"]; full: number }>
    ) => ({
      ...state,
      data: state.data.map((d) =>
        d.pk === action.payload.pk ? { ...d, Full: action.payload.full } : d
      ),
    }),
  },
});
export default Activity.reducer;
export const {
  clear: Activity_clear,
  set: Activity_set,
  add: Activity_add,
  update: Activity_update,
  remove: Activity_remove,
} = Activity.actions;
