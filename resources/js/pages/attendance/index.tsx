import RealtimeClock from '@/components/custom/clock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from '@inertiajs/react';

export default function Attendance() {
    return (
        <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
            <div className="flex w-[680px] flex-col gap-4">
                <h1 className="mb-4 flex items-center gap-2 text-4xl">
                    <span>Attendance</span>
                </h1>

                <RealtimeClock className="mb-8" />
                <Input type="text" placeholder="User Name" />
                <div className="flex gap-2">
                    <Button className="w-full cursor-pointer" variant="default">
                        Clock In
                    </Button>
                    <Button className="w-full cursor-pointer" variant="secondary">
                        Clock Out
                    </Button>
                </div>

                <Link
                    href={route('login')}
                    className="mt-12 inline-block self-center rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                >
                    Admin Login
                </Link>
            </div>
        </div>
    );
}
