export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay().toString().padStart(2,'0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`
}

export const formatDateIntl = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN',{
        day:'2-digit',
        month:'2-digit',
        year:'numeric'
    }).format(date);
}

export const isValidDate = (dateString : string ) => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime()) && date.getFullYear() > 1900;
}
export const formatDateSafe = (dateString: string | null | undefined) => {
    if(!dateString || !isValidDate(dateString)) return '--/--/----';
    return formatDateIntl(dateString);
}


