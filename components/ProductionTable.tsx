import React, { useState, useMemo } from 'react';
import { TableRowData } from '../types';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

interface ProductionTableProps {
  data: TableRowData[];
}

type SortField = 'cod' | 'desc' | 'total1st' | 'total2nd' | 'diff' | 'total';
type SortOrder = 'asc' | 'desc';

const ProductionTable: React.FC<ProductionTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<SortField>('total');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle string comparison for code/desc
      if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortOrder]);

  // Totals for footer
  const totals = useMemo(() => {
    return data.reduce((acc, row) => ({
      total1st: acc.total1st + row.total1st,
      total2nd: acc.total2nd + row.total2nd,
      diff: acc.diff + row.diff,
      total: acc.total + row.total,
    }), { total1st: 0, total2nd: 0, diff: 0, total: 0 });
  }, [data]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="ml-1 text-zinc-600" />;
    return sortOrder === 'asc' 
      ? <ArrowUp size={14} className="ml-1 text-primary" /> 
      : <ArrowDown size={14} className="ml-1 text-primary" />;
  };

  return (
    <div className="bg-surface border border-border rounded-lg shadow-lg overflow-hidden flex flex-col h-[500px]">
      <div className="p-4 border-b border-border bg-black/20">
        <h3 className="text-lg font-bold text-white pl-2 border-l-4 border-primary">Analítico por Produto</h3>
      </div>
      
      <div className="overflow-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black sticky top-0 z-10 shadow-sm">
            <tr>
              <th 
                className="p-3 text-xs font-bold text-text-muted uppercase cursor-pointer hover:bg-zinc-900 transition-colors"
                onClick={() => handleSort('cod')}
              >
                <div className="flex items-center">Cod <SortIcon field="cod" /></div>
              </th>
              <th 
                className="p-3 text-xs font-bold text-text-muted uppercase cursor-pointer hover:bg-zinc-900 transition-colors"
                onClick={() => handleSort('desc')}
              >
                <div className="flex items-center">Descrição <SortIcon field="desc" /></div>
              </th>
              <th 
                className="p-3 text-xs font-bold text-text-muted uppercase text-right cursor-pointer hover:bg-zinc-900 transition-colors"
                onClick={() => handleSort('total1st')}
              >
                <div className="flex items-center justify-end">1º Turno <SortIcon field="total1st" /></div>
              </th>
              <th 
                className="p-3 text-xs font-bold text-text-muted uppercase text-right cursor-pointer hover:bg-zinc-900 transition-colors"
                onClick={() => handleSort('total2nd')}
              >
                <div className="flex items-center justify-end">2º Turno <SortIcon field="total2nd" /></div>
              </th>
              <th 
                className="p-3 text-xs font-bold text-text-muted uppercase text-right cursor-pointer hover:bg-zinc-900 transition-colors"
                onClick={() => handleSort('diff')}
              >
                <div className="flex items-center justify-end">Diferença <SortIcon field="diff" /></div>
              </th>
              <th 
                 className="p-3 text-xs font-bold text-text-muted uppercase text-right cursor-pointer hover:bg-zinc-900 transition-colors"
                 onClick={() => handleSort('total')}
              >
                 <div className="flex items-center justify-end">Total Geral <SortIcon field="total" /></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, idx) => (
              <tr 
                key={`${row.cod}-${idx}`} 
                className="border-b border-border hover:bg-white/5 transition-colors text-sm"
              >
                <td className="p-3 text-text-muted font-mono">{row.cod}</td>
                <td className="p-3 text-white font-medium">{row.desc}</td>
                <td className="p-3 text-right text-text-muted">{row.total1st.toLocaleString()}</td>
                <td className="p-3 text-right text-text-muted">{row.total2nd.toLocaleString()}</td>
                <td className={`p-3 text-right font-medium ${row.diff >= 0 ? 'text-primary' : 'text-red-500'}`}>
                  {row.diff > 0 ? '+' : ''}{row.diff.toLocaleString()}
                </td>
                <td className="p-3 text-right text-white font-bold">{row.total.toLocaleString()}</td>
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-text-muted">
                  Nenhum registro encontrado para os filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-black sticky bottom-0 border-t border-primary">
            <tr>
              <td colSpan={2} className="p-3 text-right font-bold text-white uppercase text-xs tracking-wider">Totais</td>
              <td className="p-3 text-right font-bold text-white">{totals.total1st.toLocaleString()}</td>
              <td className="p-3 text-right font-bold text-white">{totals.total2nd.toLocaleString()}</td>
              <td className={`p-3 text-right font-bold ${totals.diff >= 0 ? 'text-primary' : 'text-red-500'}`}>
                {totals.diff > 0 ? '+' : ''}{totals.diff.toLocaleString()}
              </td>
              <td className="p-3 text-right font-bold text-primary">{totals.total.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ProductionTable;
