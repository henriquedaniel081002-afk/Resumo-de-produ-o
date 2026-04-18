export const formatNumber = (value: number) => value.toLocaleString('pt-BR');

export const formatWeight = (value: number) => {
  if (!Number.isFinite(value)) return '0 kg';
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} ton`;
  }
  return `${value.toLocaleString('pt-BR')} kg`;
};
