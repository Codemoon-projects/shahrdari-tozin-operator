import { useAppDispatch, useAppSelector } from "@/store/hooks";
import usePlaque from "./usePlaque";
import {
  ModalStep,
  openModal,
  closeModal as closeModalRedux,
} from "@/store/core/modals";
import { ActionType } from "@/store/slices/Action";
import { ActivityType } from "@/store/slices/Activity";
import { CarType } from "@/store/slices/Car";
import { useActivity } from "./useActivity";

export const useModals = () => {
  const modalData = useAppSelector((store) => store.modals.modals);
  const selectedCar = useAppSelector((store) => store.modals.modals)?.car;
  const actionType = useAppSelector((store) => store.modals.modals)?.actionType;
  const fullWeghting = useAppSelector(
    (store) => store.modals.modals
  )?.fullWeghting;
  const empltyWeghting = useAppSelector(
    (store) => store.modals.modals
  )?.empltyWeghting;
  const selectedWork = useAppSelector(
    (store) => store.modals.modals
  )?.selectedWork;
  const step = useAppSelector((store) => store.modals.modals)?.step;
  const selectedActivity = useAppSelector(
    (store) => store.modals.modals
  )?.activity;
  const dispatch = useAppDispatch();
  const { setActivity } = useActivity();

  const closeModal = () => {
    if (!selectedCar) return;

    setActivity({
      pk: -1,
      ...selectedActivity,
      address: modalData?.address,
      baskol_number_empty: -1,
      baskol_number_full: -1,
      Car: selectedCar,
      Empty: empltyWeghting || null,
      Full: fullWeghting || null,
      server_accepted: false,
      work_type: selectedWork as any,
      work_type_id: selectedWork?.id || -1,
      Action: actionType as any,
    });

    dispatch(closeModalRedux());
  };

  const openPlaque = (props: {
    actionType: ActionType;
    activity?: ActivityType;
    car?: CarType;
  }) => {
    dispatch(
      openModal({
        step: ModalStep.PLAQUE,
        actionType: props.actionType,
        activity: props.activity,
        car: props.car,
      })
    );
  };
  const openWeightingFull = (props: {
    actionType: ActionType;
    activity?: ActivityType;
    car?: CarType;
  }) => {
    dispatch(
      openModal({
        step: ModalStep.WEIGHTING_FULL,
        actionType: props.actionType,
        activity: props.activity,
        car: props.car,
      })
    );
  };
  const openWeightingEmpty = (props: {
    actionType: ActionType;
    activity?: ActivityType;
    car?: CarType;
  }) => {
    dispatch(
      openModal({
        step: ModalStep.WEIGHTING_EMPTY,
        actionType: props.actionType,
        activity: props.activity,
        car: props.car,
      })
    );
  };
  const openConfirm = (props: {
    actionType: ActionType;
    activity?: ActivityType;
    car?: CarType;
  }) => {
    dispatch(
      openModal({
        step: ModalStep.CONFIRM,
        actionType: props.actionType,
        activity: props.activity,
        car: props.car,
      })
    );
  };

  const openFromActivity = (activity: ActivityType) => {
    // pk: -1,
    // ...selectedActivity,
    // address: modalData?.address,
    // baskol_number_empty: -1,
    // baskol_number_full: -1,
    // Car: selectedCar,
    // Empty: empltyWeghting || 0,
    // Full: fullWeghting || 0,
    // server_accepted: false,
    // work_type: selectedWork as any,
    // work_type_id: selectedWork?.id || -1,
    // Action: actionType as any,
    const act_action = activity.Action;

    if (!activity.Car) {
      openPlaque({ actionType: act_action, activity });
      return;
    }
    switch ([!!activity.Full, !!activity.Empty, act_action.type].join("|")) {
      case "true|true|empty":
      case "true|true|full":
        openConfirm({ actionType: act_action, activity, car: activity.Car });
        return;

      case "false|true|full":
      case "false|true|empty":
      case "false|false|full":
        openWeightingFull({
          actionType: act_action,
          activity,
          car: activity.Car,
        });
        return;

      case "true|false|full":
      case "true|false|empty":
      case "false|false|empty":
        openWeightingEmpty({
          actionType: act_action,
          activity,
          car: activity.Car,
        });
        return;
    }
  };

  const updateCurrentData = (
    key: "fullWeghting" | "empltyWeghting" | "selectedWork" | "car",
    value: any
  ) => {
    if (step === undefined) return;

    const newData = {
      ...(modalData as any),
      [key]: value,
    };

    dispatch(openModal(newData));
  };

  const goNext = (current: ModalStep) => {
    if (!actionType) return;
    switch (current) {
      case ModalStep.PLAQUE:
        if (actionType?.type === "empty") {
          openWeightingEmpty({ actionType, ...modalData });
        } else {
          openWeightingFull({ actionType, ...modalData });
        }
        return;
      case ModalStep.WEIGHTING_EMPTY:
        if (actionType?.type === "empty") {
          openWeightingFull({ actionType, ...modalData });
        } else {
          openConfirm({ actionType, ...modalData });
        }
        return;
      case ModalStep.WEIGHTING_FULL:
        if (actionType?.type === "empty") {
          openConfirm({ actionType, ...modalData });
        } else {
          openWeightingEmpty({ actionType, ...modalData });
        }
        return;
      case ModalStep.CONFIRM:
        closeModal();
        return;
    }
  };
  const goPervious = (current: ModalStep) => {
    if (!actionType) return;
    console.log("current", current);
    console.log("actioanType", actionType);

    switch (current) {
      case 0:
        return;
      case 2:
        openPlaque({ actionType, ...modalData });
        return;
      case 1:
        openWeightingEmpty({ actionType, ...modalData });
        return;
      case 3:
        openWeightingFull({ actionType, ...modalData });
        return;
    }
  };

  return {
    openPlaque,
    openWeightingFull,
    openWeightingEmpty,
    openConfirm,
    selectedCar,
    selectedActivity,
    step,
    isOpen: !!modalData,
    closeModal,
    goNext,
    goPervious,
    actionType,
    updateCurrentData,
    fullWeghting,
    empltyWeghting,
    selectedWork,
    openFromActivity,
  };
};
