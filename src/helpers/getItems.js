const getItems = (obj) => {
  let objToReturn = obj;
  delete objToReturn['shouldDisplay'];
  return objToReturn;
};

export default getItems;
