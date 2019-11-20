import deepUnfreeze from 'deep-unfreeze';
import lodashSet from 'lodash.set';

export const setValueToFrozenObj = (obj: {}, value: any, path: string): {} => {
  const tempObj = deepUnfreeze(obj);
  lodashSet(tempObj, path, value);

  return tempObj;
};
