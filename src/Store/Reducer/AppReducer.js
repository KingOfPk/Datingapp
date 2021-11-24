const initialState = {
  user: {},
  address: {},
};

export default function (state = initialState, action) {
  // console.log(action.payload)
  switch (action.type) {
    case "SETADDRESS":
      return { ...state, address: action.payload };

    default:
      return state;
  }
}
