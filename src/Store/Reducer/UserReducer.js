const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  // console.log(action.payload)
  switch (action.type) {
    case "GET_USER_DETAIL":
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
