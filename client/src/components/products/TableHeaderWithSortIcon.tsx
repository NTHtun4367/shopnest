import { ArrowUpDown } from "lucide-react";

interface TableHeaderWithSortIconProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function TableHeaderWithSortIcon({
  text,
  onClick,
}: TableHeaderWithSortIconProps) {
  return (
    <div
      className="flex items-center justify-end font-medium cursor-pointer"
      onClick={onClick}
    >
      <span>{text}</span>
      <ArrowUpDown className="w-4 h-4 ml-2" />
    </div>
  );
}

export default TableHeaderWithSortIcon;
