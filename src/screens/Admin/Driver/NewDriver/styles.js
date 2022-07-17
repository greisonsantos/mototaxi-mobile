import {StyleSheet} from 'react-native';
import theme from '../../../core/theme';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding:10
  },

  form:{
    width:'100%',
    marginTop:20,
    marginTop:50
  },

  input:{
    justifyContent: 'center',
    height: 60,
    opacity: 0.6,
    borderRadius: 8,
    borderColor: '#8B8D8F',
    borderWidth: 1,
    bottom: 10,
    marginTop:10,
    paddingLeft:10
  },

  button: {
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
  }

})

export default styles;