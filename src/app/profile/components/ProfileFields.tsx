import { Pencil } from "lucide-react";

export default function ProfileField({
  label,
  value,
  onEdit,
  canEdit = true,
  className,
}: {
  label: string;
  value?: string;
  onEdit?: () => void;
  canEdit?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-between items-center pb-4 border-b gap-4 ${className}`}
    >
      <div className="min-w-0 flex-1">
        {" "}
        {/* This ensures the text container can shrink */}
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-lg truncate">{value || "-"}</div>
      </div>
      {canEdit && (
        <button
          onClick={onEdit}
          className="flex-shrink-0 text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
          aria-label={`Edit ${label}`}
        >
          <Pencil size={18} />
        </button>
      )}
    </div>
  );
}
