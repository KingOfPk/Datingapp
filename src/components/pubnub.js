import React from "react";
import { usePubNub } from "pubnub-react";

const pubnub = () => {
  const pub = usePubNub();
  return pub;
};

export default pubnub;
