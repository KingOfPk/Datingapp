export function SetAddress(data) {
  console.log(data);
  return {
    type: "SETADDRESS",
    payload: data,
  };
}

export function SetUserListing(data) {
  console.log(data);
  return {
    type: "USER_LISTING",
    payload: data,
  };
}

export function DeleteUser(data) {
  console.log(data);
  return {
    type: "USER_DELETE",
    payload: data,
  };
}
export function setUnreadMessage(data) {
  console.log(data);
  return {
    type: "SET_UNREAD_MESSAGE",
    payload: data,
  };
}

export function setUnreadLike(data) {
  console.log(data);
  return {
    type: "SET_UNREAD_LIKE",
    payload: data,
  };
}
export function setBlockList(data) {
  console.log(data);
  return {
    type: "SET_BLOCK_LIST",
    payload: data,
  };
}
