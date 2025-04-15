export const generateSimpleId = () =>{
    return '_'+Math.random().toString(36).substring(2,11);
}

export const convertToCurrency = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function convertProvinceDistrict(input: string){
    // 'Q. ' => 'Quận '
    // 'H. ' => 'Huyện '
    // 'P. ' => 'Phường '
    // 'X. ' => 'Xã '
    // If input is not matched return input
    if (!input) return "";
    const matched = input.match(/(Q\. |H\. |P\. |X\. )/);
    if (!matched) return input;
    const [_, prefix] = matched;
    if (prefix === "Q. ") return input.replace(prefix, "Quận ");
    if (prefix === "H. ") return input.replace(prefix, "Huyện ");
    if (prefix === "P. ") return input.replace(prefix, "Phường ");
    if (prefix === "X. ") return input.replace(prefix, "Xã ");
    return input;
}
