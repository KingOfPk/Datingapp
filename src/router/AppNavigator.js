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
const Stack = createStackNavigator();
// const navigationRef = React.createRef();
export default class Appnavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Preference"
          screenOptions={{ headerMode: false }}
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
          <Stack.Screen name="ChooseLookingFor" component={ChooseLookingFor} />
          <Stack.Screen
            name="ChooseAgeOrDistance"
            component={ChooseAgeOrDistance}
          />
          <Stack.Screen name="ChatUserList" component={ChatUserList} />
          <Stack.Screen name="Preference" component={Preference} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
