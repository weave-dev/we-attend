import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
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
import { Head, useForm } from '@inertiajs/react';

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

const SearchFilter = {
    USER: 'user',
    CLOCK_IN_TIME: 'clock_in_time',
    CLOCK_OUT_TIME: 'clock_out_time',
} as const;

type SearchFilterType = (typeof SearchFilter)[keyof typeof SearchFilter];

export default function AttendanceList({ attendances }: Props) {
    const { data, setData, get, processing, transform } = useForm<{
        search: string;
        filter: SearchFilterType;
    }>({
        search:
            route().queryParams.search === undefined
                ? ''
                : (route().queryParams.search as string),
        filter: (route().queryParams.filter as SearchFilterType) ?? SearchFilter.USER,
    });

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

    const clearSearch = () => {
        transform((data) => ({
            ...data,
            search: '',
        }));
        getForm();
    };

    const handleDateSelect = (date: Date) => {
        setData('search', date.toUTCString());
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getForm();
    };

    const getForm = () => get(route('attendance.list'));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attendances" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-full flex items-center gap-2">
                        <form
                            onSubmit={handleSubmit}
                            className="flex grow items-center gap-2"
                        >
                            <div className="shrink-0">
                                <Select
                                    onValueChange={(value: SearchFilterType) =>
                                        setData('filter', value)
                                    }
                                    value={data.filter}
                                >
                                    <SelectTrigger className="w-48">
                                        <SelectValue placeholder="Filter by User" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={SearchFilter.USER}>
                                            Filter by User
                                        </SelectItem>
                                        <SelectItem value={SearchFilter.CLOCK_IN_TIME}>
                                            Filter by Clock In Time
                                        </SelectItem>
                                        <SelectItem value={SearchFilter.CLOCK_OUT_TIME}>
                                            Filter by Clock Out Time
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Input
                                placeholder="Search"
                                onChange={(e) => setData('search', e.target.value)}
                                value={data.search}
                            />

                            <DatePicker onDateSelect={handleDateSelect} />
                            <Button
                                className="shrink-0"
                                disabled={processing}
                                type="submit"
                            >
                                Search
                            </Button>
                            <Button
                                className="shrink-0"
                                disabled={processing}
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    clearSearch();
                                }}
                            >
                                Clear
                            </Button>
                        </form>
                    </div>
                    <Pagination className="col-span-full">
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
