exports.getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, items, totalPages, currentPage };
};
// exports.getPagingData = (page, limit , data ,totalItems) => {
// 	const currentPage = page ? +page : 0;
// 	const totalPages = Math.ceil(totalItems / limit);
// 	return { totalPages, currentPage ,data};
// };

exports.getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
