import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist'; // eslint-disable-line
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
import promise from 'redux-promise';
import logger from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies

import reducers from './reducer';

const config = {
  ...offlineConfig,
  // @overwrite effect
  effect: (effect, action) => {
    console.log(`Executing effect for ${action.type}:`, effect);

    return fetch(effect.url, { // eslint-disable-line
      method: effect.method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(effect.body),
    })
    .then(res => {
      console.log('response', res);

      return res.ok
        ? res.json()
        : Promise.reject(res.text().then(msg => new Error(msg)));
    });
  },
  // @overwrite discard
  discard: (error, action, retries) => {
    console.log(error);
    return retries > 0;
  },
  // @overwrite retry
  retry: (action) => (action.meta.urgent ? 100 : 10000),
  // @overwrite persist
  persistCallback: () => console.log('Rehydratation complete'),
  persistOptions: {
    storage: AsyncStorage,
    whitelist: ['incReducer'],
    debounce: 300,
  },
};

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(promise, logger),
    offline(config),
  ),
);

// Just to clear storage
// persistStore(store, { storage: AsyncStorage }).purge();

export default store;
