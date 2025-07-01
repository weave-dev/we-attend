import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { LengthAwarePaginator, User, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Attendance List',
        href: '/attendance/list',
    },
];

const columns = ['id', 'name', 'clock in', 'clock out'];

export type Attendance = {
    id: number;
    attendee: number;
    clock_in_time: string;
    clock_out_time: string;
    user?: User;
};

export type Props = {
    attendances: LengthAwarePaginator<Attendance>;
};

export default function AttendanceList({ attendances }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attendances" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column}>
                                    {column.charAt(0).toUpperCase() + column.slice(1)}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendances.data.map((attendance) => (
                            <TableRow key={attendance.id}>
                                <TableCell>{attendance.id}</TableCell>
                                <TableCell>{attendance.user?.name}</TableCell>
                                <TableCell>{attendance.clock_in_time}</TableCell>
                                <TableCell>{attendance.clock_out_time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-end p-4">
                    <Pagination>
                        <PaginationContent>
                            {attendances.links.map((link) => {
                                if (link.label.toLowerCase().includes('previous')) {
                                    return (
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href={
                                                    attendances.prev_page_url ?? undefined
                                                }
                                            />
                                        </PaginationItem>
                                    );
                                }

                                if (link.label.toLowerCase().includes('next')) {
                                    return (
                                        <PaginationItem>
                                            <PaginationNext
                                                href={
                                                    attendances.next_page_url ?? undefined
                                                }
                                            />
                                        </PaginationItem>
                                    );
                                }

                                return (
                                    <PaginationItem>
                                        <PaginationLink href={link.url ?? undefined}>
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                );
                            })}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </AppLayout>
    );
}
