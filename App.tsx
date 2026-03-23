import React, { useEffect, useMemo, useState } from 'react';
import { MOCK_DATA } from './constants';
import { FilterState, KPIStats, ChartDataTurno, ChartDataDaily, ChartDataProduct, ProductionData } from './types';
import KPICards from './components/KPICards';
import Filters from './components/Filters';
import Charts from './components/Charts';
import { LayoutDashboard } from 'lucide-react';

const App: React.FC = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const [filters, setFilters] = useState<FilterState>({
    startDate: thirtyDaysAgo.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
    turno: 'Todos',
    search: '',
  });

  const [data, setData] = useState<ProductionData[]>([]);
  const [dataStatus, setDataStatus] = useState<{ loading: boolean; source: 'json' | 'mock'; error?: string }>({
    loading: true,
    source: 'json',
  });

  const normalizeRow = (row: any): ProductionData | null => {
    if (!row || typeof row !== 'object') return null;

    const Data = String(row.Data ?? '').trim();
    const Cod = String(row.Cod ?? '').trim();
    const Desc = String(row.Desc ?? '').trim();
    const Mp = String(row.Mp ?? '').trim();
    const QtdeNum = Number(row.Qtde);
    const Turno = String(row.Turno ?? '').trim();

    if (!Data || !Cod || !Desc || !Number.isFinite(QtdeNum) || QtdeNum < 0) return null;
    if (Turno !== '1º Turno' && Turno !== '2º Turno') return null;

    return {
      Data,
      Cod,
      Desc,
      Mp,
      Qtde: QtdeNum,
      Turno: Turno as ProductionData['Turno'],
    };
  };

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const res = await fetch('/production.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Falha ao carregar /production.json (HTTP ${res.status})`);
        const json = await res.json();
        if (!Array.isArray(json)) throw new Error('O arquivo production.json deve ser um array (lista) de registros.');

        const normalized = json.map(normalizeRow).filter(Boolean) as ProductionData[];
        if (normalized.length === 0) throw new Error('Nenhum registro válido encontrado em production.json.');

        if (isMounted) {
          setData(normalized);
          setDataStatus({ loading: false, source: 'json' });
        }
      } catch (err: any) {
        if (isMounted) {
          setData(MOCK_DATA);
          setDataStatus({ loading: false, source: 'mock', error: err?.message || 'Erro ao carregar JSON.' });
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (item.Data < filters.startDate || item.Data > filters.endDate) return false;
      if (filters.turno !== 'Todos' && item.Turno !== filters.turno) return false;

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          item.Cod.toLowerCase().includes(searchLower) ||
          item.Desc.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [data, filters]);

  const kpiStats: KPIStats = useMemo(() => {
    let total1st = 0;
    let total2nd = 0;

    filteredData.forEach(item => {
      if (item.Turno === '1º Turno') total1st += item.Qtde;
      if (item.Turno === '2º Turno') total2nd += item.Qtde;
    });

    const diffQty = total1st - total2nd;
    const diffPercent = total2nd === 0 ? 0 : (diffQty / total2nd) * 100;

    return { total1st, total2nd, diffQty, diffPercent };
  }, [filteredData]);

  const chartDataTurno: ChartDataTurno[] = useMemo(() => {
    const counts = { '1º Turno': 0, '2º Turno': 0 };

    filteredData.forEach(item => {
      counts[item.Turno] += item.Qtde;
    });

    return [
      { name: '1º Turno', value: counts['1º Turno'] },
      { name: '2º Turno', value: counts['2º Turno'] },
    ];
  }, [filteredData]);

  const chartDataDaily: ChartDataDaily[] = useMemo(() => {
    const dailyMap: Record<string, { turno1: number; turno2: number }> = {};
    const sorted = [...filteredData].sort((a, b) => a.Data.localeCompare(b.Data));

    sorted.forEach(item => {
      if (!dailyMap[item.Data]) {
        dailyMap[item.Data] = { turno1: 0, turno2: 0 };
      }

      if (item.Turno === '1º Turno') dailyMap[item.Data].turno1 += item.Qtde;
      else dailyMap[item.Data].turno2 += item.Qtde;
    });

    return Object.keys(dailyMap).sort().map(date => ({
      date,
      turno1: dailyMap[date].turno1,
      turno2: dailyMap[date].turno2,
    }));
  }, [filteredData]);

  const chartDataProduct: ChartDataProduct[] = useMemo(() => {
    const prodMap: Record<string, { cod: string; desc: string; value: number; turno1: number; turno2: number }> = {};

    filteredData.forEach(item => {
      const key = item.Cod;

      if (!prodMap[key]) {
        prodMap[key] = {
          cod: item.Cod,
          desc: item.Desc,
          value: 0,
          turno1: 0,
          turno2: 0,
        };
      }

      prodMap[key].value += item.Qtde;

      if (item.Turno === '1º Turno') prodMap[key].turno1 += item.Qtde;
      else prodMap[key].turno2 += item.Qtde;
    });

    return Object.values(prodMap)
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [filteredData]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-surface border-b border-border py-4 px-6 shadow-lg z-30">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-primary-dim p-2 rounded-lg">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Resumo de Produção - MMA</h1>
              <p className="text-xs text-text-muted">Dashboard de Produção Industrial</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-6 max-w-[1600px] w-full mx-auto space-y-6">
        {dataStatus.loading && (
          <div className="bg-surface border border-border rounded-xl p-4 text-sm text-text-muted">
            Carregando dados do <span className="text-white font-semibold">production.json</span>...
          </div>
        )}

        {!dataStatus.loading && dataStatus.source === 'mock' && (
          <div className="bg-surface border border-border rounded-xl p-4 text-sm">
            <p className="text-white font-semibold">Atenção: usando dados de exemplo (MOCK)</p>
            <p className="text-text-muted mt-1">
              Não foi possível carregar <span className="text-white font-mono">/production.json</span>.
              {dataStatus.error ? ` Motivo: ${dataStatus.error}` : ''}
            </p>
          </div>
        )}

        <Filters filters={filters} setFilters={setFilters} />
        <KPICards stats={kpiStats} />
        <Charts dataTurno={chartDataTurno} dataDaily={chartDataDaily} dataProduct={chartDataProduct} />
      </main>

      <footer className="border-t border-border py-6 mt-6 bg-surface">
        <div className="max-w-[1600px] mx-auto text-center text-text-muted text-sm">
          &copy; {new Date().getFullYear()} Resumo de Produção - MMA. All systems operational.
        </div>
      </footer>
    </div>
  );
};

export default App;
