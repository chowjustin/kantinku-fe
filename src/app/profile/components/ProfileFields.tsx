import { Pencil } from "lucide-react";

export default function ProfileField({
  label,
  value,
  onEdit,
  canEdit = true,
}: {
  label: string;
  value: string;
  onEdit?: () => void;
  canEdit?: boolean;
}) {
  return (
    <div className="flex justify-between items-center pb-4 border-b">
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="font-medium text-lg">{value || "-"}</div>
      </div>
      {canEdit && (
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors duration-200"
          aria-label={`Edit ${label}`}
        >
          <Pencil size={18} />
        </button>
      )}
    </div>
  );
}
