import {StyleSheet} from 'react-native';
import {theme} from '../../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  form: {
    width: '100%',
    marginTop: 50,
  },
  input: {
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    color: '#000',
    height: 60,
    //opacity: 0.6,
    borderRadius: 8,
    borderColor: '#8B8D8F',
    borderWidth: 1,
    bottom: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  inputSelect: {
    backgroundColor: theme.colors.white,
    color: '#000',
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    bottom: 10,
    marginTop: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.white,
  },
});

export default styles;
