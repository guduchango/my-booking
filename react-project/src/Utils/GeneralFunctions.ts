export function upperCaseFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function newObj<T>() {
    return {} as T
}

export function getCurrentDate(): string {
    const date: Date = new Date();
    let day: number | string = date.getDate();
    let month: number | string = date.getMonth() + 1; // Months are zero-based
    const year: number = date.getFullYear();

    // Ensure day and month are two digits
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${year}-${month}-${day}`;
}

export function getFriendlyDate(dateString: string): string {
    const dateObj = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "long"  
      };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(dateObj);
    const friendlyDate = `${formattedDate.split(' ')[0]} ${formattedDate.split(' ')[1]} `;

    return friendlyDate;
}

