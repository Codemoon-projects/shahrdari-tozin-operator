import fetcher from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Car_set, CarType } from "@/store/slices/Car";
import { temp_selectCar } from "@/store/slices/temp";
import { useEffect, useState } from "react";

export default function usePlaque() {
  const cars = useAppSelector((state) => state.Car.data);
  const selectedCar = useAppSelector((state) => state.temp.selectedCar);
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCarData();
  }, []);

  const fetchCarData = async () => {
    const response = await fetcher.get("cars/");
    console.log(response.data);

    dispatch(Car_set(response.data));
  };

  return {
    cars,
    selectedCar,
  };
}
