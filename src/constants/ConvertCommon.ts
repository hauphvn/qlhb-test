import {statusCodes} from "./index.ts";

const FormatCurrencyNumber = (value: number) => {
    return value.toLocaleString('vi', {style: 'currency', currency: 'VND'});
}
const MapStatusCodeInternal = (statusCode: number): string => {
    let message = 'Lỗi hệ thống. Vui lòng thử lại sau';
    const index = statusCodes.findIndex(item => item.statusCode === statusCode);
    if (index !== -1) {
        message = statusCodes[index].message;
    }
    return message;
}
const FormatCurrency = (value: string | null | undefined): string => {
    if (value === null || value === undefined) {
        return '';
    }
    return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(Number(value));
}
const FormatNumber = (value: string | null | undefined): string => {
    if (value === null || value === undefined) {
        return '';
    }
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
const ParseCurrency = (value: string): string | null | undefined => {
    return (value.replace(/[^0-9]+/g, '') || '');
}
const FormatBirthday = (value: string) => {
    if (!value) return '';
    try {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        return `${day}/${month}/${year}`;
    } catch (e) {
        console.error('Error format birthday:::', e);
        return '';
    }
}
export {FormatBirthday, FormatNumber, FormatCurrencyNumber, MapStatusCodeInternal, FormatCurrency, ParseCurrency};
