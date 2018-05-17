const DIVE_IN = {
  'object': true,
  //'array': true
};

const prod = process.env === 'production';

export const CREATED = prod ? 1 : 'created';
export const DELETED = prod ? 2 : 'deleted';
export const CHANGED = prod ? 3 : 'changed';

const detectChanges = (oldState, newState) => {
  const changes = {};

  const keysA = Object.keys(newState);
  const keysB = Object.keys(oldState);

  keysA
    .forEach(key => {
      const valueA = newState[key];
      const valueB = oldState[key];
      if (valueA !== valueB) {
        const typeA = typeof valueA;
        const typeB = typeof valueB;
        if (typeA === typeB && DIVE_IN[typeA]) {
          changes[key] = detectChanges(valueB, valueA);
        } else {
          if (!valueB) {
            changes[key] = CREATED;
          } else {
            changes[key] = CHANGED;
          }
        }
      }
    });

  if (keysA.length !== keysB.length) {
    keysB
      .forEach(key => {
        if (!newState[key]) {
          changes[key] = DELETED;
        }
      });
  }

  return changes;
};

export {detectChanges}