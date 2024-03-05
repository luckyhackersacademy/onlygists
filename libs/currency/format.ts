export const currencyFormatBRL = (value: number) => {
  return Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value)
}
