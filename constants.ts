import { ProductionData } from './types';

// Helper to generate random dates
const getDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

const PRODUCTS = [
  { cod: '1001', desc: 'Engrenagem A-20', mp: 'Aço 1045' },
  { cod: '1002', desc: 'Eixo Principal', mp: 'Aço Inox' },
  { cod: '1003', desc: 'Rolamento Cônico', mp: 'Cromo' },
  { cod: '1004', desc: 'Bucha de Bronze', mp: 'Bronze' },
  { cod: '1005', desc: 'Parafuso Sextavado', mp: 'Aço Carbono' },
  { cod: '1006', desc: 'Arruela de Pressão', mp: 'Aço Mola' },
  { cod: '1007', desc: 'Pino de Fixação', mp: 'Latão' },
  { cod: '1008', desc: 'Carcaça da Bomba', mp: 'Ferro Fundido' },
  { cod: '1009', desc: 'Vedação O-Ring', mp: 'Borracha Nitrílica' },
  { cod: '1010', desc: 'Flange de Acoplamento', mp: 'Alumínio' },
];

export const MOCK_DATA: ProductionData[] = [];

// Generate 30 days of data
for (let i = 29; i >= 0; i--) {
  const date = getDate(i);
  
  PRODUCTS.forEach((prod) => {
    // Random production for 1st Turno
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

    // Random production for 2nd Turno
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
