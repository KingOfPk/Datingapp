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
