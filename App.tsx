import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from './Src/Components/ProductListScreen';
import ProductDetailsScreen from './Src/Components/ProductDetailsScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product List">
        <Stack.Screen name="Product List" component={ProductListScreen} />
        <Stack.Screen name="Product Details" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
