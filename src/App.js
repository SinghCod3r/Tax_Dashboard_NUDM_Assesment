import { useState, useMemo } from 'react';

import properties from './data/properties.json';
import { calculateKPIs, getUniqueCities } from './utils/calculations';

import KPICard from './components/KPICard';
import TenantFilter from './components/TenantFilter';
import ComparisonChart from './components/ComparisonChart';
import ChatAssistant from './components/ChatAssistant';

import './App.css';

function App() {
  const [selectedTenant, setSelectedTenant] = useState('All Cities');

  const cities = useMemo(() => getUniqueCities(properties), []);

  const filteredData = useMemo(() => {
    if (selectedTenant === 'All Cities') return properties;
    return properties.filter((property) => property.tenant === selectedTenant);
  }, [selectedTenant]);

  const kpis = useMemo(() => calculateKPIs(filteredData), [filteredData]);

  return (
    <div className="app">
      <div className="app-bg" />
      <header className="header" id="dashboard-header">
        <div className="header-content">
          <div className="header-badge">UPYOG Platform</div>
          <h1 className="header-title">🏛️ Property Tax Analytics</h1>
          <p className="header-subtitle">
            Comprehensive insights across {cities.length} cities &bull; {properties.length} properties tracked
          </p>
        </div>
      </header>

      <main className="main-content">
        <TenantFilter cities={cities} selected={selectedTenant} onChange={setSelectedTenant} />

        <section className="kpi-grid" id="kpi-dashboard">
          <KPICard
            title="Total Properties Registered"
            value={kpis.totalProperties}
            color="blue"
            icon="🏘️"
          />
          <KPICard
            title="Total Properties Approved"
            value={kpis.totalApproved}
            color="green"
            icon="✅"
          />
          <KPICard
            title="Total Properties Rejected"
            value={kpis.totalRejected}
            color="red"
            icon="❌"
          />
          <KPICard
            title="Total Collection"
            value={kpis.totalCollection}
            color="purple"
            icon="💰"
            isCurrency
          />
        </section>

        <ComparisonChart data={properties} />

        <ChatAssistant data={properties} />
      </main>

      <footer className="footer">
        <p>© 2025 UPYOG Property Tax Dashboard &bull; Built with React & Recharts</p>
      </footer>
    </div>
  );
}

export default App;
