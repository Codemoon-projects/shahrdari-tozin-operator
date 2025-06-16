import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DriverType {
  id: number;
  name: string;
  phone_number: string;
}

export interface CarType {
  id: number;
  driver: DriverType;
  license_plate: string;
  type__name: string;
  last_empty_weight: number;
}

interface SliceType {
  data: CarType[];
}

const initialState: SliceType = { data: [] };

const Car = createSlice({
  name: "Car",
  initialState,
  reducers: {
    Car_set: (state, action: PayloadAction<CarType[]>) => ({
      ...state,
      data: action.payload,
    }),
    Car_clear: (state) => ({ ...state, data: [] }),
    Car_add: (state, action: PayloadAction<CarType>) => ({
      ...state,
      data: [...state.data, action.payload],
    }),
    Car_update: (
      state,
      action: PayloadAction<{ data: CarType; id: CarType["id"] }>
    ) => ({
      ...state,
      data: [
        action.payload.data,
        ...state.data.filter((d) => d.id !== action.payload.id),
      ],
    }),
    Car_remove: (state, action: PayloadAction<{ id: CarType["id"] }>) => ({
      ...state,
      data: state.data.filter((d) => d.id !== action.payload.id),
    }),
  },
});
export default Car.reducer;
export const { Car_clear, Car_set, Car_add, Car_update, Car_remove } =
  Car.actions;
