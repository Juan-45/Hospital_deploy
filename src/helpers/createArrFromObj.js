const createArrFromObject = (obj) => {
  const arr = [];
  for (let key in obj) {
    if (key !== 'shouldDisplay') {
      const currentItem = obj[key];
      arr.push(currentItem);
    }
  }
  return arr;
};

export default createArrFromObject;
