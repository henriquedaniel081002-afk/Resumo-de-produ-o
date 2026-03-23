import React from 'react';
import { KPIStats } from '../types';
import { Moon, Sun, Boxes, PackageCheck } from 'lucide-react';
import { formatNumber, formatWeight } from './formatters';

interface KPICardsProps {
  stats: KPIStats;
}


const cardClass = 'bg-surface border border-border p-5 rounded-lg shadow-lg relative overflow-hidden group';

const KPICards: React.FC<KPICardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div className={cardClass}>
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sun size={48} className="text-primary" />
        </div>
        <p className="text-text-muted text-sm uppercase font-semibold tracking-wider">Produção 1º Turno</p>
        <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(stats.total1st)}</h3>
        <p className="text-xs text-text-muted mt-2">Unidades Totais</p>
      </div>

      <div className={cardClass}>
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Moon size={48} className="text-zinc-400" />
        </div>
        <p className="text-text-muted text-sm uppercase font-semibold tracking-wider">Produção 2º Turno</p>
        <h3 className="text-3xl font-bold text-white mt-1">{formatNumber(stats.total2nd)}</h3>
        <p className="text-xs text-text-muted mt-2">Unidades Totais</p>
      </div>

      <div className={cardClass}>
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Boxes size={48} className="text-primary" />
        </div>
        <p className="text-text-muted text-sm uppercase font-semibold tracking-wider">Consumo de MP 1º Turno</p>
        <h3 className="text-3xl font-bold text-white mt-1">{formatWeight(stats.totalMp1st)}</h3>
        <p className="text-xs text-text-muted mt-2">Consumo Total</p>
      </div>

      <div className={cardClass}>
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <PackageCheck size={48} className="text-zinc-400" />
        </div>
        <p className="text-text-muted text-sm uppercase font-semibold tracking-wider">Consumo de MP 2º Turno</p>
        <h3 className="text-3xl font-bold text-white mt-1">{formatWeight(stats.totalMp2nd)}</h3>
        <p className="text-xs text-text-muted mt-2">Consumo Total</p>
      </div>
    </div>
  );
};

export default KPICards;
