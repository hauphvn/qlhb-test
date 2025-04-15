export const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

export const emailSafe = (email: string | null | undefined) => {
    if(!email || !isValidEmail(email)) return 'Email không hợp lệ';
    return email;
}


export const isValidCMND = (cmnd: string) => {
    const cmndRegex = /^[0-9]{9,12}$/;
    return cmndRegex.test(cmnd);
}

export const cmndSafe = (cmnd: string | null | undefined) => {
    if(!cmnd || !isValidCMND(cmnd)) return 'CMND không hợp lệ';
    return cmnd;
}

export const isValidPhone = (phone: string) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
}

export const phoneSafe = (phone: string | null | undefined) => {
    if(!phone || !isValidPhone(phone)) return 'Số điện thoại không hợp lệ';
    return phone;
}

