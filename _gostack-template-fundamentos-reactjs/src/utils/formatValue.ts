const formatValue = (value: number): string =>
  Intl.NumberFormat('pt-ao', { style: 'currency', currency: 'AOA' }).format(
    value,
  );

export default formatValue;
