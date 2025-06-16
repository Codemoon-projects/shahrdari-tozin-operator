import { type ActivityType } from "@/store/slices/Activity";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Activity_d2bfc9_list_item from "./d2bfc9_list_item";

interface ActivityTableProps {
  data: ActivityType[];
}

export default function ActivityTable({ data }: ActivityTableProps) {
  return (
    <div className="w-full overflow-auto rounded-lg border border-gray-100 shadow-sm">
      <Table dir="rtl" className="min-w-full divide-y divide-gray-200">
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              شناسه
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              وضعیت
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              خودرو
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              نوع عملیات
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              وزن خالی
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              وزن پر
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              زمان
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <Activity_d2bfc9_list_item key={item.pk} data={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
