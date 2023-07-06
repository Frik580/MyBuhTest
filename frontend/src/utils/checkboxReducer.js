export const checkboxReducer = (state, action) => {
    switch (action?.type) {
      case "setToo": {
        return {
          too: true,
        };
      }

      case "setIp": {
        return {
          ip: true,
        };
      }

      case "setOther": {
        return {
          other: true,
        };
      }

      case "setJur": {
        return {
          other: true,
          jur: true,
        };
      }

      case "setChp": {
        return {
          other: true,
          chp: true,
        };
      }

      case "setFiz": {
        return {
          other: true,
          fiz: true,
        };
      }

      default:
        return state;
    }
  };