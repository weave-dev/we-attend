import { QRCodeSVG } from 'qrcode.react';
import { useRef } from 'react';

export default ({ value }: { value: string }) => {
    const qrRef = useRef(null);
    const handleDownloadQRCode = () => {
        //get svg source.
        if (qrRef === null || qrRef.current === null) return;
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(qrRef.current);

        //add name spaces.
        if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
            source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
        }

        //add xml declaration
        source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

        //convert svg source to URI data scheme.
        const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

        //set url value to a element's href attribute.
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'qr-code.svg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return <QRCodeSVG value={value} ref={qrRef} onClick={handleDownloadQRCode} className="cursor-pointer" />;
};
