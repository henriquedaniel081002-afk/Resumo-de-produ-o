export type TurnoType = '1º Turno' | '2º Turno';

export interface ProductionData {
  Data: string; // YYYY-MM-DD
  Cod: string;
  Desc: string;
  Mp: number;
  Qtde: number;
  Turno: TurnoType;
}

export interface KPIStats {
  total1st: number;
  total2nd: number;
  totalMp1st: number;
  totalMp2nd: number;
  diffQty: number;
  diffPercent: number;
}

export interface ChartDataTurno {
  name: string;
  value: number;
}

export interface ChartDataDaily {
  date: string;
  turno1: number;
  turno2: number;
}

export interface ChartDataProduct {
  cod: string;
  desc: string;
  value: number;
  turno1: number;
  turno2: number;
}

export interface ChartDataProductMp {
  cod: string;
  desc: string;
  value: number;
  turno1: number;
  turno2: number;
}

export interface TableRowData {
  cod: string;
  desc: string;
  total1st: number;
  total2nd: number;
  diff: number;
  total: number;
}

export interface FilterState {
  startDate: string;
  endDate: string;
  turno: 'Todos' | TurnoType;
  search: string;
}
