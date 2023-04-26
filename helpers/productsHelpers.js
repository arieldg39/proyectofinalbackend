const buildQuery = async (category) => {
  const query = {};
  if (category) query.category = category;
  return query;
}

module.exports = { buildQuery };