const buildQuery = async (category) => {
  const query = {};
  if (category) query.category = category;
  console.log(category, query);
  return query;
}

module.exports = { buildQuery };