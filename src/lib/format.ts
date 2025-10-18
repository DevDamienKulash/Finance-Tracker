export const fmtCurrency = (n: number, currency = 'USD') =>
new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(n);


export const ym = (d: string) => d.slice(0, 7); // YYYY-MM from YYYY-MM-DD