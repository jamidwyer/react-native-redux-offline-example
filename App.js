import React from 'react';
import { Provider } from 'react-redux';
import Reactotron from 'reactotron-react-native';

import store from './src/store';
import Main from './src/Main';

export default class App extends React.Component {
  render() {
    if (__DEV__) { // eslint-disable-line
      Reactotron
        .configure() // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect(); // let's connect!
    }

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
