import {StyleSheet} from 'react-native';
import {theme} from '../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  textTitle: {
    color: '#000',
    textAlign: 'center',
  },
  text: {
    color: '#000',
  },
  cardContainer: {
    borderRadius: 8,
    padding: 10,
    margin: 10,
    backgroundColor: theme.colors.white,
  },
  date: {
    fontSize: 18,
    padding: 5,
    color: theme.colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  status0: {
    color: '#E33a1a',
  },
  status1: {
    color: '#4169E1',
  },
  status2: {
    color: '#87bd43',
  },
});

export default styles;
