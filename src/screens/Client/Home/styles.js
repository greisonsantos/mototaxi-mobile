import {StyleSheet} from 'react-native';
import {theme} from '../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    color: theme.colors.white,
  },
  card: {
    width: '50%',
    backgroundColor: '#808080',
    borderRadius: 20,
    margin: 5,
  },
  viewIcon: {
    alignItems: 'flex-start',
  },
  icon: {
    width: 50,
    justifyContent: 'flex-end',
    marginLeft: 5,
  },
});

export default styles;
