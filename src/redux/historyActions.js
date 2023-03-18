const addToHistory = (payload) => {
  return {
    type: "ADDTOHISTORY",
    payload: payload,
  };
};

export default addToHistory;
