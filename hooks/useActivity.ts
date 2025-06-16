import { useConfirm } from "@/hooks/common/useConfirm";
import {
  Activity_add,
  Activity_set,
  Activity_update,
  type ActivityType,
} from "@/store/slices/Activity";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetcher } from "@/lib/axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { CarType } from "@/store/slices/Car";
import { ActionType } from "@/store/slices/Action";

export function useActivity(mode: undefined | "silent" | "normal" = "normal") {
  const { openConfirmModal } = useConfirm();
  const Activity_data = useAppSelector((store) => store.Activity).data;
  const dispatch = useAppDispatch();

  const get_Activity_data_aba6a8 = async (confirm: boolean = false) => {
    // check for confirm when this function is opened
    if (confirm) {
      const isConfirmed = await openConfirmModal();
      if (!isConfirmed) {
        return false;
      }
    }

    try {
      const response = await fetcher.get("Activity/aba6a8/");

      if (response.status >= 200 && response.status < 300) {
        const serverData = response.data.Weighing;
        // set response of server on state
        dispatch(Activity_set(serverData));
        return true;
      }

      toast.error("خطا در دریافت اطلاعات");
      return false;
    } catch (error) {
      console.error("Error in activity data handling:", error);
      toast.error("خطا در دریافت اطلاعات");
      return false;
    }
  };

  const get_Activity_list_list_d2bfc9 = async (confirm: boolean = false) => {
    // For this demo, just reuse the same function
    return get_Activity_data_aba6a8(confirm);
  };

  const createWithPlaque = async (data: {
    Car: CarType;
    Action: ActionType;
    baskol_number_empty?: number;
    baskol_number_full?: number;
  }) => {
    dispatch(
      Activity_add({
        ...data,
        id: Activity_data.length + 1,
        Empty: null,
        Full: null,
        baskol_number_empty: data.baskol_number_empty,
        baskol_number_full: data.baskol_number_full,
      })
    );
  };

  const updateWeight = async (data: ActivityType) => {
    dispatch(Activity_update({ data, id: data.id }));
  };

  useEffect(() => {
    // Fetch data when hook is initialized
    if (mode !== "silent") {
      get_Activity_data_aba6a8();
    }
  }, []);

  return {
    Activity_data,
    get_Activity_data_aba6a8,
    get_Activity_list_list_d2bfc9,
    createWithPlaque,
    updateWeight,
  };
}
