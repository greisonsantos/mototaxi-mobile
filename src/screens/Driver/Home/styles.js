import {StyleSheet} from 'react-native';
import {theme} from '../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  text2: {
    color: theme.colors.black,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.light,
    borderRadius: 20,
    margin: 5,
    justifyContent: 'center',
  },
  viewIcon: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    width: 50,
    justifyContent: 'flex-end',
    marginLeft: 5,
  },
});

export default styles;
