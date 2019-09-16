export const setValueToObj = (obj: {}, value: any, path: string): {} => {
  const pathArr = path.split('.');
  let newObj = Object.assign({}, obj);
  let i;

  // tslint:disable-next-line:no-increment-decrement
  for (i = 0; i < pathArr.length - 1; i++) {
    newObj = newObj[pathArr[i]];
  }

  newObj[pathArr[i]] = value;
  return newObj;
};
