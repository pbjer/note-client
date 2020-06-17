export const paramBuilder = (args) => {
  let queryParam = '';
  if (args.length >= 1) {
    const params = args.join('&');
    queryParam = `?${params}`;
  }
  return queryParam;
}
