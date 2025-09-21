import { useConfirm } from "@/hooks/common/useConfirm";
import { type CarType, Car_set, Car_add } from "@/store/slices/Car";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetcher } from "@/lib/axios";
import { useEffect } from "react";

export function useCar(mode?: "silent") {
  const { openConfirmModal } = useConfirm();
  const Car_data = useAppSelector((store) => store.Car).data;
  const dispatch = useAppDispatch();
  const get_Car_data_ba8ab8 = async (confirm: boolean = false) => {
    // check for confirm when this function is opened
    if (confirm) {
      const isConfirmed = await openConfirmModal();
      if (!isConfirmed) {
        return false;
      }
    }
    // get data and read from server
    const response = await fetcher.get("Car/ba8ab8/");
    const serverData = response.data.Car;

    // set response of server on state
    dispatch(Car_set(serverData));
  };

  const sendReport = async (data: {
    report_type: string;
    driver_name: string;
    driver_number: string;
    car_plaque: string;
    car_type: string;
    company_name: string;
    desc: string;
  }) => {
    const response = await fetcher.post("reports/", data);

    try {
      if (
        response?.status === 201 &&
        response?.data?.car_id &&
        data.report_type === "vehicle"
      ) {
        const carsResp = await fetcher.get("cars/");
        const list = carsResp?.data;
        if (Array.isArray(list)) {
          const created = list.find((c: any) => c?.pk === response.data.car_id);
          if (created) {
            dispatch(Car_add(created as CarType));
          }
        } else if (list?.Car && Array.isArray(list.Car)) {
          // fallback for possible nested shape
          const created = list.Car.find(
            (c: any) => c?.pk === response.data.car_id
          );
          if (created) {
            dispatch(Car_add(created as CarType));
          }
        } else {
          // fallback: refresh whole list
          await get_Car_data_ba8ab8();
        }
      }
    } catch (e) {
      // ignore add-to-slice errors to avoid blocking UX
    }

    return response;
  };

  useEffect(() => {
    if (mode !== "silent")
      // get from server here
      get_Car_data_ba8ab8();
  }, []);
  return { Car_data, get_Car_data_ba8ab8, sendReport };
}
