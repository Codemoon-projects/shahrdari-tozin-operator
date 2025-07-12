import { type ActivityType } from "@/store/slices/Activity";
import { TableCell, TableRow } from "@/components/ui/table";
import { openModal } from "@/store/core/modals";
import { useAppDispatch } from "@/store/hooks";
import { temp_selectCar } from "@/store/slices/temp";

interface ActivityProps {
  data: ActivityType;
}

export default function Activity_d2bfc9_list_item({ data }: ActivityProps) {
  const { Car, Empty, Full, pk: id, Action } = data;
  const dispatch = useAppDispatch();

  const onClickComponent = (d: ActivityType) => {
    dispatch(temp_selectCar({ car: d.Car }));

    dispatch(
      openModal({ name: "mainModal", actionType: d.Action, activity: d })
    );
  };

  // Log specific action data for debugging

  // Determine operation state based on Full and Empty values
  const getOperationState = () => {
    if (Full && Empty) {
      return {
        label: "تکمیل شده",
        status: "completed",
      };
    } else if (Full && !Empty) {
      return {
        label: "ثبت وزن خالی",
        status: "pending",
      };
    } else if (!Full && Empty) {
      return {
        label: "ثبت وزن پر",
        status: "in-progress",
      };
    } else {
      return {
        label: "انتخاب عملیات",
        status: "idle",
      };
    }
  };

  const operationState = getOperationState();

  // Get action name with fallback handling
  const getActionName = () => {
    if (!Action) return "-";
    return Action.name || "-";
  };

  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      {/* ID Column */}
      <TableCell className="px-4 py-3 text-sm font-mono text-gray-500">
        {id}
      </TableCell>

      {/* Status Column */}
      <TableCell className="px-4 py-3 text-sm">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            operationState.status === "completed"
              ? "bg-green-100 text-green-800"
              : operationState.status === "pending"
              ? "bg-blue-100 text-blue-800"
              : operationState.status === "in-progress"
              ? "bg-amber-100 text-amber-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {operationState.label}
        </span>
      </TableCell>

      {/* Vehicle Column */}
      <TableCell className="px-4 py-3 text-sm font-medium text-gray-900">
        {Car ? Car.license_plate : "-"}
      </TableCell>

      {/* Action Type Column */}
      <TableCell className="px-4 py-3 text-sm font-medium text-gray-900">
        {getActionName()}
      </TableCell>

      {/* Empty Weight Column */}
      <TableCell className="px-4 py-3 text-sm text-right text-gray-700">
        {Empty ? Empty : "-"}
      </TableCell>

      {/* Full Weight Column */}
      <TableCell className="px-4 py-3 text-sm text-right text-gray-700">
        {Full ? Full : "-"}
      </TableCell>

      {/* Time Column */}
      <TableCell className="px-4 py-3 text-sm text-gray-500">اخیراً</TableCell>

      {/* Actions Column */}
      <TableCell className="px-4 py-3 text-sm text-right">
        <button
          onClick={() => onClickComponent(data)}
          className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          {operationState.status === "completed"
            ? "نمایش جزئیات"
            : "ادامه عملیات"}
        </button>
      </TableCell>
    </TableRow>
  );
}
