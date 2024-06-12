import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const App = () => <Text>App Screen</Text>;
const AppTwo = () => <Text>AppTwo Screen</Text>;

const Menu = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="App"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#fff',
            width: 240,
          },
          drawerContentOptions: {
            activeBackgroundColor: '#fff',
            inactiveTintColor: '#fff',
          },
        }}>
        <Drawer.Screen
          name="App"
          component={App}
          options={{
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#000' : '#313131' }}>
                Primeira Tela
              </Text>
            ),
            drawerIcon: ({ focused }) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                color={focused ? '#000' : '#313131'}
                size={20}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="MenuApp"
          component={AppTwo}
          options={{
            drawerLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#000' : '#313131' }}>
                Segunda Tela
              </Text>
            ),
            drawerIcon: ({ focused }) => (
              <Icon
                name={focused ? 'menu' : 'menu-outline'}
                color={focused ? '#000' : '#313131'}
                size={20}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Menu;
