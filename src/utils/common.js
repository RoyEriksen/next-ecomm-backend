export function filter(obj, ...keys) {
    if (typeof obj !== 'object' || Array.isArray(obj)) {
        return {};
    }

    return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
          acc[key] = obj[key];
        }
        return acc;
      }, {});
    }

  