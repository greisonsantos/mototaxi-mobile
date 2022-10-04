import {StyleSheet} from 'react-native';
import {theme} from '../../../core/theme';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: theme.colors.black,
    fontSize: 21,
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: 'center',
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputSelect: {
    backgroundColor: '#CACED2',
    justifyContent: 'center',
    color: '#000',
    height: 50,
    borderColor: '#000',
    bottom: 10,
    marginTop: 20,
    paddingLeft: 10,
  },
});

export default styles;
