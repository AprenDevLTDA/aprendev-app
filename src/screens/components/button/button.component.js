import { StyleSheet, Button } from 'react-native';

const Button_component = ({ titulo,  funcao}) => {
  return <Button style={styles.button} onPress={funcao} title={titulo} />;
};

const styles = StyleSheet.create({
  button: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    height: 60,
  },
});

export default Button_component;
