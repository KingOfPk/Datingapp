export function getUserDetail(data) {
  console.log(data);
  return {
    type: "GET_USER_DETAIL",
    payload: data,
  };
}
