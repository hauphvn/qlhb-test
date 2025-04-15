import {TableCell, TableRow} from "../ui/table.tsx";

const TableRowSkeleton = () => {
    return (
        <TableRow>
            <TableCell>
                <div className="h-4 w-[80%] animate-pulse rounded bg-gray-200"/>
            </TableCell>
            <TableCell>
                <div className="h-4 w-[70%] animate-pulse rounded bg-gray-200"/>
            </TableCell>
            <TableCell>
                <div className="h-4 w-[60%] animate-pulse rounded bg-gray-200"/>
            </TableCell>
            <TableCell>
                <div className="h-4 w-[50%] animate-pulse rounded bg-gray-200"/>
            </TableCell>
        </TableRow>
    );
};

export default TableRowSkeleton;
