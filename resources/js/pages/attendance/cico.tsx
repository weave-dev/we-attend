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
    // const [codeValue, setCodeValue] = useState('');
    const { data, setData, post, errors, transform, reset, processing } = useForm({
        type: '',
        attendee: '',
    });

    const alert = (detectedCodes: IDetectedBarcode[]) => {
        const [code] = detectedCodes;
        transform((data) => ({
            ...data,
            attendee: code.rawValue,
        }));
        postForm();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postForm();
    };

    const postForm = () =>
        post('/attendances', {
            onSuccess: () => {
                reset('attendee');
            },
        });

    return (
        <div className="h-screen overflow-auto">
            <div className="flex flex-col items-center justify-center py-12">
                <div className="flex w-[680px] flex-col gap-4">
                    <h1 className="mb-4 flex items-center gap-2 text-2xl font-semibold">
                        <span>Attendance</span>
                        <span>{data.attendee}</span>
                    </h1>

                    <RealtimeClock className="mb-4" />

                    {props.message !== undefined && (
                        <Alert className="mb-4 border-green-500">
                            <CheckCircle2Icon />
                            <AlertTitle about="attendance">
                                {String(props.message)}
                            </AlertTitle>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="mx-auto">
                            <CodeScanner
                                onScan={alert}
                                scanDelay={5000}
                                allowMultiple={true}
                            />
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
                            <Button
                                className="w-full cursor-pointer"
                                variant="default"
                                disabled={processing}
                            >
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
        </div>
    );
}
