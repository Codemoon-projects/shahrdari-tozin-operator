import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CarType } from "./Car";

interface SliceType {
  selectedCar: CarType | null;
}

const initialState: SliceType = { selectedCar: null };

const temp = createSlice({
  name: "temp",
  initialState,
  reducers: {
    temp_selectCar: (
      state,
      action: PayloadAction<{ car: CarType | null }>
    ) => ({
      ...state,
      selectedCar: action.payload.car,
    }),
  },
});
export default temp.reducer;
export const { temp_selectCar } = temp.actions;
