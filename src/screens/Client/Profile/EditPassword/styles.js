import {StyleSheet} from 'react-native';
import {theme} from '../../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  form: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10 * 3,
  },

  button: {
    backgroundColor: '#560CCE',
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: '90%',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: '#000',
    height: 44,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    color: '#000',
  },

  icon: {
    paddingRight: 7,
  },

  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
