const initialState = {
  userListing: [],
  address: {},
};

export default function (state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case "SETADDRESS":
      return { ...state, address: action.payload };
    case "USER_LISTING":
      return { ...state, userListing: action.payload };
    case "USER_DELETE":
      var filter = state.userListing.filter(
        (item) => item.id !== action.payload
      );
      console.log(filter);
      return { ...state, userListing: filter };

    default:
      return state;
  }
}