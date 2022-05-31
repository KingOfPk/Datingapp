import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddNewMusic from "../screens/AddNewMusic";
import SplashScreen from "../screens/SplashScreen";
import AllowLocation from "../screens/AllowLocation";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OnBoarding from "../screens/OnBoarding";
import RecordBio from "../screens/RecordBio";
import ChooseConnections from "../screens/ChooseConnections";
import ChooseInterest from "../screens/ChooseInterest";
import ChooseHobby from "../screens/ChooseHobby";
import ChooseLookingFor from "../screens/ChooseLookingFor";
import ChooseAgeOrDistance from "../screens/ChooseAgeOrDistance";
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import ChatUserList from "../screens/ChatUserList";
import Preference from "../screens/Preference";
import Setting from "../screens/Setting";
import EditProfile from "../screens/EditProfile";
import ActivePlans from "../screens/ActivePlans";
import LikeScreen from "../screens/LikeScreen";
import ChatScreen from "../screens/ChatScreen";
import UserMatchScreen from "../screens/UserMatchScreen";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";

const Stack = createStackNavigator();

const pubnub = new PubNub({
  subscribeKey: "sub-c-0090e58e-63bd-11ec-bc1d-9abcb724faed",
  publishKey: "pub-c-1a94d5cb-d4b9-4ac9-a482-34a98f726a6b",
});

// const navigationRef = React.createRef();
export default class Appnavigator extends Component {
  render() {
    return (
      <NavigationContainer ref={(nav) => this.props.GetRef(nav)}>
        <PubNubProvider client={pubnub}>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerMode: false, gestureEnabled: false }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="AllowLocation" component={AllowLocation} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="RecordBio" component={RecordBio} />
            <Stack.Screen
              name="ChooseConnections"
              component={ChooseConnections}
            />
            <Stack.Screen name="ChooseInterest" component={ChooseInterest} />
            <Stack.Screen name="ChooseHobby" component={ChooseHobby} />
            <Stack.Screen
              name="ChooseLookingFor"
              component={ChooseLookingFor}
            />
            <Stack.Screen
              name="ChooseAgeOrDistance"
              options={{ gestureEnabled: false }}
              component={ChooseAgeOrDistance}
            />
            <Stack.Screen name="ChatUserList" component={ChatUserList} />
            <Stack.Screen name="Preference" component={Preference} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="ActivePlans" component={ActivePlans} />
            <Stack.Screen name="LikeScreen" component={LikeScreen} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="UserMatchScreen" component={UserMatchScreen} />
            {/* <Stack.Screen name="UserMatchScreen" component={UserMatchScreen} /> */}
          </Stack.Navigator>
        </PubNubProvider>
      </NavigationContainer>
    );
  }
}
