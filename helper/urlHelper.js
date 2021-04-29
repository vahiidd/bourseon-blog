export const cdnHandler = (item) => `https://cdn.bourseon.com/${item}`;

export const addBaseFetchUrl = (endPoint) =>
  `https://api.bourseon.com/posts/${endPoint}`;

export const endPointHandler = (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => acc + `${key === 'tag' ? 'tag[]' : key}=${value}&`,
    '?'
  );
