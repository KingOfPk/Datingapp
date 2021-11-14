import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LikesYou from "./LikesYou";
import YouLike from "./YouLike";
import { font } from "../../components/fonts";

const Tab = createMaterialTopTabNavigator();

function LikeTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        // scrollEnabled: true,
        style: { backgroundColor: "#416181" },
        activeTintColor: "#fff",
        inactiveTintColor: "#C4C4C4",
        labelStyle: {
          textTransform: "none",
          fontSize: 18,
          fontFamily: font.Bold,
        },
        indicatorStyle: {
          borderBottomWidth: 3,
          borderColor: "#416181",
        },
      }}
    >
      <Tab.Screen name="LIKES YOU" component={LikesYou} />
      <Tab.Screen name="YOU LIKE" component={YouLike} />
    </Tab.Navigator>
  );
}

export default LikeTabs;
