import * as React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import DashboardScreen from '../screens/DashboardScreen/index'
import {NavigationContainer} from '@react-navigation/native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import PlayerScreen from '../screens/PlayersScreen'
import DetailsPlayer from '../screens/DetailsPlayer'

const MainNavigation = () => {
  const Stack = createNativeStackNavigator()
  const Tab = createMaterialTopTabNavigator()

  const InitialTab = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name='DashboardScreen'
          component={DashboardScreen}
          options={{title: 'Équipes'}}
        />
        <Tab.Screen
          name='PlayerScreen'
          component={PlayerScreen}
          options={{title: 'Joueurs'}}
        />
      </Tab.Navigator>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='InitialTab'>
        <Stack.Screen
          name='InitialTab'
          component={InitialTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name='DetailsPlayer'
          component={DetailsPlayer}
          options={{title: 'Détails du joueur'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MainNavigation
