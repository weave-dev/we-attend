import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
    const renderLinks = (link: LengthAwarePaginator<Attendance>['links'][number]) => {
        if (link.label.toLowerCase().includes('previous')) {
            return (
                <PaginationItem key={link.url}>
                    <PaginationPrevious
                        isActive={link.active}
                        href={attendances.prev_page_url ?? undefined}
                    />
                </PaginationItem>
            );
        }

        if (link.label.toLowerCase().includes('next')) {
            return (
                <PaginationItem key={link.url}>
                    <PaginationNext
                        isActive={link.active}
                        href={attendances.next_page_url ?? undefined}
                    />
                </PaginationItem>
            );
        }

        return (
            <PaginationItem key={link.url}>
                <PaginationLink href={link.url ?? undefined} isActive={link.active}>
                    {link.label}
                </PaginationLink>
            </PaginationItem>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attendances" />
            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center col-span-1 gap-2">
                        <Input placeholder="Search" />
                        <div className="shrink-0">
                            <Select>
                                <SelectTrigger className="w-48">
                                    <SelectValue placeholder="Filter by User" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">Filter by User</SelectItem>
                                    <SelectItem value="clock_in">
                                        Filter by Clock In Time
                                    </SelectItem>
                                    <SelectItem value="clock_out">
                                        Filter by Clock Out Time
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Pagination className="justify-end col-span-1">
                        <PaginationContent>
                            {attendances.links.map(renderLinks)}
                        </PaginationContent>
                    </Pagination>
                </div>

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
            </div>
        </AppLayout>
    );
}
