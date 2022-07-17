import {StyleSheet} from 'react-native';
import theme from '../../../core/theme';

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,

  },
  
  logo: {
    width: 250,
    height: 250,
  },
  buttonLogout: {
    borderRadius: 8,
    backgroundColor: '#FF0000',
    width: 315,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10,
    marginTop: 25,
  },
  containerTextButtonLogout: {
    marginLeft: 25,
    fontSize: 16,
  },
  textButtonLogout: {
    color: '#fff',
  },
});

export default styles;
