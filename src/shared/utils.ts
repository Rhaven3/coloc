export function getCurrentWeekNumber() {
    const date = new Date();
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}