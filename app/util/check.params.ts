// eslint-disable-next-line @typescript-eslint/ban-types
const checkParams = (query: {}): any => {
  const keys = Object.keys(query);
  return keys.find((key) => {
    if (query[key] === null || query[key] === undefined) {
      return key;
    }
  });
};

export default checkParams;
