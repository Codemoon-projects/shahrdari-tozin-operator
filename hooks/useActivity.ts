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
import { ActionType, ActionWorkType } from "@/store/slices/Action";
import { openModal } from "@/store/core/modals";

export function useActivity(mode: undefined | "silent" | "normal" = "normal") {
  const { openConfirmModal } = useConfirm();
  const Activity_data = useAppSelector((store) => store.Activity).data;
  const dispatch = useAppDispatch();

  const get_activity_list = async (confirm: boolean = false) => {
    // check for confirm when this function is opened
    if (confirm) {
      const isConfirmed = await openConfirmModal();
      if (!isConfirmed) {
        return false;
      }
    }

    try {
      const response = await fetcher.get("activity/");

      if (response.status >= 200 && response.status < 300) {
        const serverData = response.data.Weighing;
        // set response of server on state
        dispatch(
          Activity_set(
            serverData.map((a: any) => ({ ...a, server_accepted: true }))
          )
        );
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

  const createWithPlaque = async (data: {
    Car: CarType;
    Action: ActionType;
    work: ActionWorkType;
    baskol_number_empty?: number;
    baskol_number_full?: number;
  }) => {
    const d: ActivityType = {
      ...data,
      pk: (Activity_data.length + 1) * -1,
      Empty: null,
      Full: null,
      baskol_number_empty: data.baskol_number_empty,
      baskol_number_full: data.baskol_number_full,
      server_accepted: false,
      work_type: data.work,
      work_type_id: data.work.id,
    };

    console.log(d);

    dispatch(Activity_add(d));

    dispatch(
      openModal({ name: "mainModal", actionType: data.Action, activity: d })
    );
  };

  const updateWeight = async (data: ActivityType) => {
    dispatch(Activity_update({ data, pk: data.pk }));
  };

  const sendDataServer = async () => {
    const data = Activity_data.filter((a) => !a.server_accepted).map((a) => ({
      id: a.pk,
      vehicle_id: a.Car.pk,
      weighing_type_id: a.Action.pk,
      Full: a.Full,
      Empty: a.Empty,
      work_type_id: a.work_type_id,
    }));

    const response = await fetcher.post("activity/", data);

    const serverData = response.data.Weighing;
    dispatch(
      Activity_set(
        serverData.map((a: any) => ({ ...a, server_accepted: true }))
      )
    );
  };

  useEffect(() => {
    // Fetch data when hook is initialized
    if (mode !== "silent") {
      get_activity_list();
    }
  }, []);

  return {
    Activity_data,
    get_activity_list,
    get_Activity_list_list_d2bfc9: get_activity_list,
    createWithPlaque,
    updateWeight,
    sendDataServer,
  };
}
