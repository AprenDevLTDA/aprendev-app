import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer, Image } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, FontAwesome, AntDesign, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import Home from '../../home';
import Perfil from '../../../screens/perfil/perfil'
import ConfigScreen from '../../../screens/configuration-screen/config_screen'

import CourseScreen from '../../course/course_screen';

const Wrapper = () => {

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
        component={Home} />


      <Tab.Screen

        name="Cursos"
        options={{
          headerShown: false,
          tabBarLabel: 'Cursos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-sharp" color={color} size={size} />
          ),
        }}
        component={CourseScreen} />
      <Tab.Screen
        name="Perfil"
        options={{

          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
        component={Perfil} />
      <Tab.Screen
        name='Configuração'
        options={{
          headerShown: false,
          tabBarLabel: 'Configuração',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
        component={ConfigScreen} />
    </Tab.Navigator>
  );
};



export default Wrapper;
