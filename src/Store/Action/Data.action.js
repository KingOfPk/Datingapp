export function SetAddress(data) {
  console.log(data);
  return {
    type: "SETADDRESS",
    payload: data,
  };
}
