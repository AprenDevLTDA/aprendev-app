import { StyleSheet, Text, View } from 'react-native';
import { AuthStackScreen } from './src/utils/navigation';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
export default function App() {
  useEffect(() => {
    StatusBar.setHidden(true);

  })

  return (
    <AuthStackScreen />
  );
}