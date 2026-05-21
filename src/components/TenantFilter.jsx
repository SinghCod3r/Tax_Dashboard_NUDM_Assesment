function TenantFilter({ cities, selected, onChange }) {
  return (
    <section className="filter-section" id="tenant-filter">
      <label htmlFor="city-select" className="filter-label">
        🏙️ Filter by City
      </label>
      <div className="filter-wrapper">
        <select
          id="city-select"
          className="filter-select"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="All Cities">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <span className="filter-chevron">▾</span>
      </div>
    </section>
  );
}

export default TenantFilter;
