import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import home from './Screens/home';
import detail from './Screens/detail';

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = 'home' component={home}/>
        <Stack.Screen name = 'detail' component={detail}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}