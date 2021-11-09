import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
  Platform,
} from 'react-native';
import {Provider as StoreProvider} from 'react-redux';
import reducers from './src/Store/Reducer';

import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './src/router/AppNavigator';

// import crashlytics from "@react-native-firebase/crashlytics";

class App extends Component {
  render() {
    const store = createStore(reducers, applyMiddleware(ReduxThunk));
    return (
      <StoreProvider store={store}>
        <View style={{flex: 1}}>
          <AppNavigator />
        </View>
      </StoreProvider>
    );
  }
}

export default App;
