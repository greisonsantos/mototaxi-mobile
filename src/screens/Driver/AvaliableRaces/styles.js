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
  strong: {
    fontWeight: 'bold',
  },
  cardContainer: {
    borderRadius: 8,
    padding: 5,
    margin: 1,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: theme.colors.white,
  },
  date: {
    fontSize: 18,
    padding: 5,
    color: theme.colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    textAlign: 'center',
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
