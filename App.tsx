import React, { useState } from 'react';
import AuthScreen from './android/app/src/components/AuthScreen';
import HomeScreen from './android/app/src/components/HomeScreen';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersScreen from "./android/app/src/components/OrderScreen";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await auth().signOut();
    setUser(null);
  };

//   return user ? <HomeScreen user={user} onLogout={handleLogout} /> : <AuthScreen onLogin={setUser} />;
// };
return (
  <NavigationContainer>
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home">
            {({ navigation }) => <HomeScreen user={user} onLogout={handleLogout} navigation={navigation} />}
          </Stack.Screen>
          <Stack.Screen name="Orders" component={OrdersScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth">
          {({ navigation }) => <AuthScreen onLogin={setUser} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
};

export default App;
