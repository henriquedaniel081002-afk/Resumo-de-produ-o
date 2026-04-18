import { ProductionData } from './types';

const getDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

const PRODUCTS = [
  { cod: '1001', desc: 'Engrenagem A-20', mp: 1200 },
  { cod: '1002', desc: 'Eixo Principal', mp: 950 },
  { cod: '1003', desc: 'Rolamento Cônico', mp: 780 },
  { cod: '1004', desc: 'Bucha de Bronze', mp: 640 },
  { cod: '1005', desc: 'Parafuso Sextavado', mp: 430 },
  { cod: '1006', desc: 'Arruela de Pressão', mp: 390 },
  { cod: '1007', desc: 'Pino de Fixação', mp: 510 },
  { cod: '1008', desc: 'Carcaça da Bomba', mp: 1100 },
  { cod: '1009', desc: 'Vedação O-Ring', mp: 210 },
  { cod: '1010', desc: 'Flange de Acoplamento', mp: 870 },
];

export const MOCK_DATA: ProductionData[] = [];

for (let i = 29; i >= 0; i--) {
  const date = getDate(i);

  PRODUCTS.forEach((prod) => {
    if (Math.random() > 0.1) {
      MOCK_DATA.push({
        Data: date,
        Cod: prod.cod,
        Desc: prod.desc,
        Mp: prod.mp,
        Qtde: Math.floor(Math.random() * 500) + 50,
        Turno: '1º Turno'
      });
    }

    if (Math.random() > 0.1) {
      MOCK_DATA.push({
        Data: date,
        Cod: prod.cod,
        Desc: prod.desc,
        Mp: prod.mp,
        Qtde: Math.floor(Math.random() * 450) + 40,
        Turno: '2º Turno'
      });
    }
  });
}
