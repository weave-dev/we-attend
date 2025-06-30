import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';

type ScannerProps = {
    onScan: (detectedCodes: IDetectedBarcode[]) => void;
    scanDelay?: number;
    allowMultiple?: boolean;
    paused?: boolean;
};

export default function CodeScanner(props: ScannerProps) {
    return <Scanner {...props} />;
}
