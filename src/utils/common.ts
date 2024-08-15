const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Reflect.ownKeys(obj).length === 0;
};

export {isEmptyObject};
