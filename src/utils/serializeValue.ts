export const serializeValue = (val: string, type: string) => {
  switch (type) {
    case 'string':
      return val;
    case 'number':
      return +val;
    case 'boolean': {
      try {
        return JSON.parse(val);
      } catch (err) {
        return val;
      }
    }
    default:
      return val;
  }
};
