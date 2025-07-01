import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';

type ScannerProps = {
    onScan: (detectedCodes: IDetectedBarcode[]) => void;
    scanDelay?: number;
    allowMultiple?: boolean;
    paused?: boolean;
};

export default function CodeScanner(props: ScannerProps) {
    return (
        <div className="grid gap-2">
            <div className="h-[300px] w-[300px]">
                <Scanner {...props} />
            </div>
        </div>
    );
}
