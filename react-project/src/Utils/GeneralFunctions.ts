export function upperCaseFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function newObj<T>(){
    return  {} as T   
}