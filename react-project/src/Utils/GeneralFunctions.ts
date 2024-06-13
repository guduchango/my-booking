
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

    let friendlyDate = "";
    try{
        const dateObj = new Date(dateString);
        const fullYear = dateObj.getFullYear();
        

        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "long"  
          };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(dateObj);
        friendlyDate = `${formattedDate.split(' ')[0]} ${formattedDate.split(' ')[1]} (${fullYear.toString().slice(-2)}) `;
    } catch(error){
        if (error instanceof Error) {
            console.error('Error message:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }

        friendlyDate = dateString
    }
        
    return friendlyDate;
}

export function daysBetween(date1: string, date2: string): number {
    // Parse the dates
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    // Calculate the difference in milliseconds
    const diffInMs = Math.abs(secondDate.getTime() - firstDate.getTime());

    // Convert milliseconds to days
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
}

