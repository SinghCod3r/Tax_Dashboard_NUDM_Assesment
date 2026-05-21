import { formatINR, formatNumber } from '../utils/calculations';

function KPICard({ title, value, color = 'default', icon, isCurrency = false }) {
  const colorMap = {
    blue: { border: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)', iconBg: 'rgba(59, 130, 246, 0.15)' },
    green: { border: '#10b981', bg: 'rgba(16, 185, 129, 0.08)', iconBg: 'rgba(16, 185, 129, 0.15)' },
    red: { border: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', iconBg: 'rgba(239, 68, 68, 0.15)' },
    purple: { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.08)', iconBg: 'rgba(139, 92, 246, 0.15)' },
    default: { border: '#6b7280', bg: 'rgba(107, 114, 128, 0.08)', iconBg: 'rgba(107, 114, 128, 0.15)' },
  };

  const scheme = colorMap[color] || colorMap.default;
  const displayValue = isCurrency ? formatINR(value) : formatNumber(value);

  return (
    <article className="kpi-card" style={{ borderLeftColor: scheme.border }}>
      <div className="kpi-card-header">
        <span className="kpi-icon" style={{ backgroundColor: scheme.iconBg, color: scheme.border }}>
          {icon}
        </span>
        <h3 className="kpi-title">{title}</h3>
      </div>
      <p className="kpi-value" style={{ color: scheme.border }}>{displayValue}</p>
    </article>
  );
}

export default KPICard;
