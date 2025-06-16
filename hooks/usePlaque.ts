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
    dispatch(Car_set(response.data));
  };

  const selectCar = (car: CarType) => {
    dispatch(temp_selectCar({ car }));
  };

  const clearSelectedCar = () => {
    dispatch(temp_selectCar({ car: null }));
  };

  const filterPlaques = (searchTerm: string): CarType[] => {
    if (!searchTerm) return cars;
    return cars.filter((car) =>
      car.license_plate.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return {
    filterPlaques,
    selectCar,
    cars,
    selectedCar,
    clearSelectedCar,
  };
}
