import React, { Component } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import LikesYou from "./LikesYou";
import YouLike from "./YouLike";
import { font } from "../../components/fonts";

const Tab = createMaterialTopTabNavigator();

function LikeTabs() {
  const navigation = useNavigation();
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
      <Tab.Screen
        name="LIKES YOU"
        children={() => (
          <LikesYou
            goToCart={(item) =>
              navigation.navigate("UserProfile", { data: item })
            }
          />
        )}
      />
      <Tab.Screen
        name="YOU LIKE"
        children={() => (
          <YouLike
            goToCart={(item) =>
              navigation.navigate("UserProfile", { data: item })
            }
          />
        )}
      />
    </Tab.Navigator>
  );
}

export default LikeTabs;
