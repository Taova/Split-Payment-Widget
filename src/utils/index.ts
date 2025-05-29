export const getOptionValue = (
  instalmentCount: number,
  monthlyAmount: string,
): string => {
  return `${instalmentCount} ${instalmentCount === 1 ? "cuota" : "cuotas"} de ${monthlyAmount}/mes`;
};
