export const calculateKPIs = (data) => {
  return data.reduce(
    (acc, property) => {
      acc.totalProperties += 1;
      if (property.status === 'Approved') acc.totalApproved += 1;
      if (property.status === 'Rejected') acc.totalRejected += 1;
      acc.totalCollection += property.collection_inr;
      return acc;
    },
    { totalProperties: 0, totalApproved: 0, totalRejected: 0, totalCollection: 0 }
  );
};

export const aggregateByCity = (data) => {
  const cityMap = data.reduce((acc, property) => {
    const city = property.tenant;
    if (!acc[city]) {
      acc[city] = { city, totalCollection: 0, approved: 0, rejected: 0, pending: 0, total: 0 };
    }
    acc[city].totalCollection += property.collection_inr;
    acc[city].total += 1;
    if (property.status === 'Approved') acc[city].approved += 1;
    if (property.status === 'Rejected') acc[city].rejected += 1;
    if (property.status === 'Pending') acc[city].pending += 1;
    return acc;
  }, {});
  return Object.values(cityMap).sort((a, b) => b.totalCollection - a.totalCollection);
};

export const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-IN').format(value);
};

export const getUniqueCities = (data) => {
  return [...new Set(data.map((p) => p.tenant))].sort();
};

export const buildDataSummary = (data) => {
  const cityStats = aggregateByCity(data);
  return {
    totalRecords: data.length,
    cities: cityStats.map((c) => ({
      city: c.city,
      totalProperties: c.total,
      approved: c.approved,
      rejected: c.rejected,
      pending: c.pending,
      totalCollection: Math.round(c.totalCollection),
    })),
  };
};
