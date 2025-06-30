import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';

type ScannerProps = {
    onScan: (detectedCodes: IDetectedBarcode[]) => void;
};

export default (props: ScannerProps) => {
    return <Scanner {...props} />;
};
