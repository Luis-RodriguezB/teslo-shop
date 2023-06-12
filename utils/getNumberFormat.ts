
interface FormatConfiguration {
    format: 'en' | string;
    style: 'currency' | 'decimal' | 'percent' | 'unit';
    currency: 'USD' | 'EUR';
}

export const getNumberFormat = (value: number, { format, ...rest }: FormatConfiguration) => {
    return new Intl.NumberFormat(format, rest).format(value);
}