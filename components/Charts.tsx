import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { ChartDataTurno, ChartDataDaily, ChartDataProduct, ChartDataProductMp } from '../types';
import { formatNumber, formatWeight } from './formatters';

interface ChartsProps {
  dataTurno: ChartDataTurno[];
  dataDaily: ChartDataDaily[];
  dataProduct: ChartDataProduct[];
  dataProductMp: ChartDataProductMp[];
}


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface border border-border p-3 rounded shadow-xl">
        <p className="text-white font-bold text-sm mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="text-white font-mono">{formatNumber(Number(entry.value ?? 0))}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ProductTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const row = payload[0]?.payload;
    const desc = row?.desc ?? '';
    const cod = row?.cod ?? '';
    const total = Number(row?.value ?? 0);
    const turno1 = Number(row?.turno1 ?? 0);
    const turno2 = Number(row?.turno2 ?? 0);

    return (
      <div className="bg-surface border border-border p-3 rounded shadow-xl max-w-[520px]">
        <p className="text-white font-bold text-sm mb-2 break-words">{desc}</p>
        <p className="text-sm text-text-muted mb-1">Cod: <span className="text-white font-mono">{cod}</span></p>
        <p className="text-sm mb-1" style={{ color: '#f97316' }}>
          1º Turno: <span className="text-white font-mono">{formatNumber(turno1)}</span>
        </p>
        <p className="text-sm mb-1" style={{ color: '#ffffff' }}>
          2º Turno: <span className="text-white font-mono">{formatNumber(turno2)}</span>
        </p>
        <p className="text-sm" style={{ color: '#f97316' }}>
          Total: <span className="text-white font-mono">{formatNumber(total)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ProductMpTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const row = payload[0]?.payload;
    const desc = row?.desc ?? '';
    const cod = row?.cod ?? '';
    const total = Number(row?.value ?? 0);
    const turno1 = Number(row?.turno1 ?? 0);
    const turno2 = Number(row?.turno2 ?? 0);

    return (
      <div className="bg-surface border border-border p-3 rounded shadow-xl max-w-[520px]">
        <p className="text-white font-bold text-sm mb-2 break-words">{desc}</p>
        <p className="text-sm text-text-muted mb-1">Cod: <span className="text-white font-mono">{cod}</span></p>
        <p className="text-sm mb-1" style={{ color: '#f97316' }}>
          MP 1º Turno: <span className="text-white font-mono">{formatWeight(turno1)}</span>
        </p>
        <p className="text-sm mb-1" style={{ color: '#ffffff' }}>
          MP 2º Turno: <span className="text-white font-mono">{formatWeight(turno2)}</span>
        </p>
        <p className="text-sm" style={{ color: '#f97316' }}>
          Total MP: <span className="text-white font-mono">{formatWeight(total)}</span>
        </p>
      </div>
    );
  }
  return null;
};

const Charts: React.FC<ChartsProps> = ({ dataTurno, dataDaily, dataProduct, dataProductMp }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-surface border border-border p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4 pl-2 border-l-4 border-primary">Produção Total por Turno</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataTurno}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} axisLine={{ stroke: '#27272a' }} />
              <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} axisLine={{ stroke: '#27272a' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#27272a', opacity: 0.4 }} />
              <Bar dataKey="value" name="Qtde" fill="#f97316" radius={[4, 4, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface border border-border p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4 pl-2 border-l-4 border-primary">Evolução Diária</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataDaily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#a1a1aa"
                tick={{ fill: '#a1a1aa', fontSize: 12 }}
                tickFormatter={(val) => val.substring(5)}
                axisLine={{ stroke: '#27272a' }}
              />
              <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} axisLine={{ stroke: '#27272a' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#fff' }} />
              <Line
                type="monotone"
                dataKey="turno1"
                name="1º Turno"
                stroke="#f97316"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: '#f97316' }}
              />
              <Line
                type="monotone"
                dataKey="turno2"
                name="2º Turno"
                stroke="#ffffff"
                strokeWidth={2}
                strokeOpacity={0.7}
                dot={false}
                activeDot={{ r: 6, fill: '#ffffff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface border border-border p-4 rounded-lg shadow-lg lg:col-span-2">
        <h3 className="text-lg font-bold text-white mb-4 pl-2 border-l-4 border-primary">Top 10 Produtos (Volume)</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataProduct} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} axisLine={{ stroke: '#27272a' }} />
              <YAxis
                dataKey="cod"
                type="category"
                width={110}
                stroke="#a1a1aa"
                tick={{ fill: '#ffffff', fontSize: 12 }}
                axisLine={{ stroke: '#27272a' }}
              />
              <Tooltip content={<ProductTooltip />} cursor={{ fill: '#27272a', opacity: 0.4 }} />
              <Bar dataKey="value" name="Qtde" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-surface border border-border p-4 rounded-lg shadow-lg lg:col-span-2">
        <h3 className="text-lg font-bold text-white mb-4 pl-2 border-l-4 border-primary">Top 10 Produtos (Consumo de MP)</h3>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataProductMp} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
              <XAxis
                type="number"
                stroke="#a1a1aa"
                tick={{ fill: '#a1a1aa' }}
                axisLine={{ stroke: '#27272a' }}
                tickFormatter={(value) => (Number(value) >= 1000 ? `${(Number(value) / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} ton` : `${Number(value).toLocaleString('pt-BR')} kg`)}
              />
              <YAxis
                dataKey="cod"
                type="category"
                width={110}
                stroke="#a1a1aa"
                tick={{ fill: '#ffffff', fontSize: 12 }}
                axisLine={{ stroke: '#27272a' }}
              />
              <Tooltip content={<ProductMpTooltip />} cursor={{ fill: '#27272a', opacity: 0.4 }} />
              <Bar dataKey="value" name="MP" fill="#f97316" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
