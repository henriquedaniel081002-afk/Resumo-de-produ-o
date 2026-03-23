import React from 'react';
import { FilterState, TurnoType } from '../types';
import { Search, Calendar, Filter } from 'lucide-react';

interface FiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-surface border-b border-border p-4 mb-6 sticky top-0 z-20 shadow-md">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Title */}
        <div className="flex items-center gap-2 mb-2 md:mb-0">
           <div className="bg-primary/20 p-2 rounded">
             <Filter className="text-primary w-5 h-5" />
           </div>
           <span className="font-bold text-lg hidden md:block">Filtros</span>
        </div>

        <div className="flex flex-wrap gap-4 w-full md:w-auto items-center">
          {/* Date Range */}
          <div className="flex items-center gap-2 bg-black border border-border rounded px-3 py-2">
            <Calendar size={16} className="text-text-muted" />
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleChange}
              className="bg-transparent text-sm text-white focus:outline-none [color-scheme:dark]"
            />
            <span className="text-text-muted">-</span>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleChange}
              className="bg-transparent text-sm text-white focus:outline-none [color-scheme:dark]"
            />
          </div>

          {/* Turno Select */}
          <div className="relative">
            <select
              name="turno"
              value={filters.turno}
              onChange={handleChange}
              className="appearance-none bg-black border border-border text-white text-sm rounded pl-3 pr-8 py-2 focus:outline-none focus:border-primary transition-colors cursor-pointer w-full md:w-40"
            >
              <option value="Todos">Todos os Turnos</option>
              <option value="1º Turno">1º Turno</option>
              <option value="2º Turno">2º Turno</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-grow md:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              name="search"
              placeholder="Buscar Cod ou Produto..."
              value={filters.search}
              onChange={handleChange}
              className="bg-black border border-border text-white text-sm rounded pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:border-primary transition-colors placeholder-zinc-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
