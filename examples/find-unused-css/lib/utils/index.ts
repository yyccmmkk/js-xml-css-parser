export function findLineNo(str: string, end: number) {
    return str.slice(0, end).split('\n').length;
}
