/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'

import {SafeAreaView} from 'react-native'
import {Provider} from 'react-redux'
import MainNavigation from './src/navigation/MainNavigation'
import {store} from './src/store/config'

function App (): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </SafeAreaView>
  )
}

export default App
