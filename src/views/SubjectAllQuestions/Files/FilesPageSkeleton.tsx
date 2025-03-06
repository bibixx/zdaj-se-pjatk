import { useMemo } from 'react';

import { Skeleton } from 'components/ui/skeleton';
import { TableCell, TableRow } from 'components/ui/table';

const getWidth = (baseWidth: number, variance: number) => baseWidth + (2 * variance * Math.random() - variance);

export const FilesPageSkeleton = () => {
  const rowsWidths = useMemo(() => Array.from({ length: 20 }).map(() => [getWidth(6, 1), getWidth(65, 20)]), []);

  return (
    <>
      {rowsWidths.map(([idWidth, contentWidth], i) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={i}>
          <TableCell className="max-md:px-4 p-[1px]">
            <div className="flex items-center gap-2 h-[36px] p-2">
              <Skeleton className="h-4" style={{ width: `${idWidth}%` }} />
              <Skeleton className="h-4" style={{ width: `${contentWidth}%` }} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
