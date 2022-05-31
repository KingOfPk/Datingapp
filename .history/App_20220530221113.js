import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { Provider as StoreProvider } from "react-redux";
import reducers from "./src/Store/Reducer";

import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import AppNavigator from "./src/router/AppNavigator";
import { check, PERMISSIONS, RESULTS, request } from "react-native-permissions";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import crashlytics from "@react-native-firebase/crashlytics";

messaging()
  .hasPermission()
  .then((enabled) => {
    if (enabled) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
          AsyncStorage.setItem("token", token);
        })
        .catch((error) => {
          /* handle error */
        });
    }
  })
  .catch((error) => {
    /* handle error */
  });

messaging().onMessage(async (remoteMessage) => {
  console.log("A new FCM message arrived!", remoteMessage.notification);
  // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  const { body, title } = remoteMessage.notification;
  PushNotification.localNotification({
    title: title,
    message: body, // (required)
  });
});

class App extends Component {
  componentDidMount = () => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        console.log(
          "NOTIFICATION CLICK STATE : --->" + notification.userInteraction
        );
        if (notification.userInteraction === true) {
          console.log("Nav", Nav1);
          Nav1.navigate("ChatScreen", {});
          // console.log('Nav', this.Nav);
        }
      },
      popInitialNotification: true,
    });
    if (Platform.OS == "ios") {
      request(PERMISSIONS.IOS.MICROPHONE).then((result) => {
        console.log(result);
      });
    } else {
      request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
        console.log(result);
      });
    }
    this.requestUserPermission();
  };
  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  newRef = (item) => {
    Nav1 = item;
  };

  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
    return (
      <StoreProvider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator GetRef={this.newRef} />
        </View>
      </StoreProvider>
    );
  }
}

export default App;
