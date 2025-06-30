import RealtimeClock from '@/components/custom/clock';
import CodeScanner from '@/components/custom/code-scanner';
import InputError from '@/components/input-error';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useForm, usePage } from '@inertiajs/react';
import { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { CheckCircle2Icon } from 'lucide-react';

export default function Attendance() {
    const { props } = usePage();

    const { data, setData, post, errors } = useForm({
        type: '',
        attendee: '',
    });

    const alert = (detectedCodes: IDetectedBarcode[]) => {
        if (detectedCodes.length === 0) {
            // WIP: Qr code not detected
            console.log(detectedCodes);
            setData('attendee', detectedCodes[0].rawValue);
        }
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/attendances');
    }

    return (
        <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
            <div className="flex w-[680px] flex-col gap-4">
                <h1 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
                    <span>Attendance</span>
                </h1>
                {props.message !== undefined && (
                    <Alert className="mb-4 border-green-500">
                        <CheckCircle2Icon />
                        <AlertTitle>{String(props.message)}</AlertTitle>
                    </Alert>
                )}

                <RealtimeClock className="mb-4" />

                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="mx-auto h-[500px] w-[500px] overflow-hidden rounded-lg border border-white">
                        <CodeScanner onScan={alert} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Member ID</Label>
                        <Input
                            id="member_id"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="Member ID"
                            placeholder="Member ID"
                            value={data.attendee}
                            onChange={(e) => setData('attendee', e.target.value)}
                        />
                        <InputError message={errors.attendee} />
                        <InputError message={errors.type} />
                    </div>

                    <div className="flex gap-2">
                        <Button className="w-full cursor-pointer" variant="default">
                            Submit
                        </Button>
                    </div>
                </form>

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
