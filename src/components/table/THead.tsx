"use client";
import { flexRender, RowData, Table } from "@tanstack/react-table";
import * as React from "react";
import { ChevronDown } from "lucide-react";

import clsxm from "@/lib/clsxm";
import { ColumnMetaType } from "@/components/table/Table";

type THeadProps<T extends RowData> = {
  omitSort: boolean;
  table: Table<T>;
} & React.ComponentPropsWithoutRef<"div">;

export default function THead<T extends RowData>({
  className,
  omitSort,
  table,
  ...rest
}: THeadProps<T>) {
  const isApiIntegrated = (table.options.meta as any)?.isApiSorting === true;
  const apiSortState = (table.options.meta as any)?.apiSortState;

  return (
    <thead
      className={clsxm("bg-[#EBEBEB] text-[#000000]", className)}
      {...rest}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            // Get the current sorting state from the column
            const isSorted = header.column.getIsSorted();

            // Check if this column is sorted in API mode
            const apiField =
              (header.column.columnDef.meta as ColumnMetaType)?.apiField ||
              header.id;
            const isApiSorted =
              isApiIntegrated &&
              apiSortState &&
              apiField === apiSortState.column;

            // Determine the effective sort direction to display
            const effectiveSortDirection = isApiSorted
              ? apiSortState.isAsc
                ? "asc"
                : "desc"
              : isSorted || undefined;

            return (
              <th
                key={header.id}
                scope="col"
                className={clsxm(
                  "group py-1 pr-3 text-center text-sm font-semibold sm:text-base",
                  !omitSort && header.column.getCanSort()
                    ? "pl-0"
                    : "pl-[30px]",
                )}
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={clsxm(
                      "relative flex items-center justify-center gap-2 pb-1",
                      !omitSort && header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                    )}
                    onClick={
                      omitSort
                        ? () => null
                        : (e) => {
                            // Ensure event is passed and not stopped
                            header.column.getToggleSortingHandler()?.(e);
                          }
                    }
                  >
                    {!omitSort &&
                      header.column.getCanSort() &&
                      (!effectiveSortDirection ? (
                        <ChevronDown className="w-3 rotate-180 fill-transparent group-hover:fill-black" />
                      ) : effectiveSortDirection === "asc" ? (
                        <ChevronDown className="w-3 rotate-180 fill-black" />
                      ) : (
                        <ChevronDown className="w-3 fill-black" />
                      ))}
                    <p className="text-[#000000]">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </p>
                  </div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
