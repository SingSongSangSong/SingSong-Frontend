import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RcdStackNavigator from './src/navigation/RcdStackNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RcdStackNavigator />
    </NavigationContainer>
  );
}

export default App;
