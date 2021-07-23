const checkParams = (query: {}): any => {
  // {} 타입으로 쓸수 있도록 하기
  const keys = Object.keys(query);
  return keys.find((key) => {
    if (query[key] === null || query[key] === undefined) {
      return key;
    }
  });
};

export default checkParams;
