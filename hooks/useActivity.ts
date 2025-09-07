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

  const setActivity = async (data: ActivityType) => {
    dispatch(Activity_update({ data, pk: data.pk }));
  };

  const sendDataServer = async () => {
    const data = Activity_data.filter((a) => !a.server_accepted).map((a) => ({
      ...a,
      id: a.pk,
      vehicle_id: a.Car.pk,
      weighing_type_id: a.Action.pk,
      Full: a.Full,
      Empty: a.Empty,
      work_type_id: a.work_type_id,
    }));

    if (!data) return;

    const response = await fetcher.post("activity/", data);

    const serverData = response.data.Weighing;

    if (serverData)
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
    setActivity,
    sendDataServer,
  };
}
