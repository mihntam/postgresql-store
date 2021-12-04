const initialState = { data: [], isCount: true };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ITEM":
      return { ...state, ...action.res };
    case "NOT_FOUND_ITEM":
      return { ...state, data: [], error: action.msg, status: action.status };
    case "COUNT":
      console.log(state.isCount);
      return { ...state, isCount: !state.isCount };

    default:
      return state;
  }
};

export default reducer;
