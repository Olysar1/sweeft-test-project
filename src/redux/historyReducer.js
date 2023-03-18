const HISTORY_INITIAL_STATE = {
  history: [],
};

const historyReducer = (state = HISTORY_INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADDTOHISTORY":
      //   const temp = `${action.payload.prefix} ${action.payload.name} ${action.payload.lastName}`;
      return {
        history: [...state.history, action.payload],
      };
    default:
      return state;
  }
};

export default historyReducer;
