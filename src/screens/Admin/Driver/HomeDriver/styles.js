import {StyleSheet} from 'react-native';
import {theme} from '../../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: theme.colors.white,
  },
  logo: {
    width: 200,
    height: 200,
  },
  search: {
    marginTop: 40,
    marginBottom: 50,
    width: '100%',
  },
  form: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: '90%',
    left: '80%',
  },
  button: {
    padding: 15,
    marginRight: 15,
    backgroundColor: theme.colors.darker,
    borderRadius: 50,
    marginTop: -20,
  },
});

export default styles;
