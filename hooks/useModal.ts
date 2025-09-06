import { useAppDispatch, useAppSelector } from "@/store/hooks";
import usePlaque from "./usePlaque";
import {
  ModalStep,
  openModal as openModalDispatch,
  closeModal as closeModalRedux,
  ModalDataProps,
} from "@/store/core/modals";
import { ActionType, ActionWorkType } from "@/store/slices/Action";
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

  const openModal = (props: ModalDataProps) => {
    dispatch(openModalDispatch(props));
  };

  const updateCurrentData = (props: Partial<ModalDataProps>) => {
    if (step === undefined || !actionType) return;

    openModal({ ...modalData, step, actionType, ...props });
  };

  const openFromActivity = (activity: ActivityType) => {
    const act_action = activity.Action;

    let perviousData: ModalDataProps = {
      step: ModalStep.PLAQUE,
      actionType: act_action,
      activity,
    };

    if (!activity.Car || !activity.work_type === undefined) {
      openModal(perviousData);
      return;
    }

    perviousData.car = activity.Car;
    perviousData.selectedWork = activity.work_type;

    perviousData.fullWeghting = activity.Full || undefined;
    perviousData.empltyWeghting = activity.Empty || undefined;

    switch ([!!activity.Full, !!activity.Empty, act_action.type].join("|")) {
      case "true|false|full":
      case "false|false|empty":
      case "false|true|empty":
        perviousData.step = ModalStep.WEIGHTING_EMPTY;
        openModal(perviousData);
        return;
      case "false|true|empty":
      case "false|false|full":
      case "false|true|full":
        perviousData.step = ModalStep.WEIGHTING_FULL;
        openModal(perviousData);
        return;
    }

    perviousData.address = activity.address;
    openModal(perviousData);
  };

  const goNext = (current: ModalStep) => {
    if (step === undefined || !actionType) return;

    switch (current) {
      case ModalStep.PLAQUE:
        if (actionType?.type === "empty") {
          updateCurrentData({ step: ModalStep.WEIGHTING_EMPTY });
        } else {
          updateCurrentData({ step: ModalStep.WEIGHTING_FULL });
        }
        return;
      case ModalStep.WEIGHTING_EMPTY:
        if (actionType?.type === "empty") {
          updateCurrentData({ step: ModalStep.WEIGHTING_FULL });
        } else {
          updateCurrentData({ step: ModalStep.CONFIRM });
        }
        return;
      case ModalStep.WEIGHTING_FULL:
        if (actionType?.type === "empty") {
          updateCurrentData({ step: ModalStep.CONFIRM });
        } else {
          updateCurrentData({ step: ModalStep.WEIGHTING_EMPTY });
        }
        return;
      case ModalStep.CONFIRM:
        closeModal();
        return;
    }
  };

  const goPervious = (current: ModalStep) => {
    if (step === undefined || !actionType) return;
    switch (current) {
      case ModalStep.PLAQUE:
        return;
      case ModalStep.WEIGHTING_EMPTY:
        if (actionType?.type === "empty") {
          updateCurrentData({ step: ModalStep.PLAQUE });
        } else {
          updateCurrentData({ step: ModalStep.WEIGHTING_FULL });
        }
        return;
      case ModalStep.WEIGHTING_FULL:
        if (actionType?.type === "empty") {
          updateCurrentData({ step: ModalStep.WEIGHTING_EMPTY });
        } else {
          updateCurrentData({ step: ModalStep.PLAQUE });
        }
        return;
      case ModalStep.CONFIRM:
        if (actionType?.type === "empty") {
          updateCurrentData({ step: ModalStep.WEIGHTING_FULL });
        } else {
          updateCurrentData({ step: ModalStep.WEIGHTING_EMPTY });
        }
        return;
    }
  };

  return {
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
    openModal,
  };
};
