import {StyleSheet} from 'react-native';
import {theme} from '../../../core/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  picutureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    borderRadius: 100,
  },

  nameContainer: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    fontSize: 18,
    color: theme.colors.black,
    marginTop: 10,
  },
  nav: {
    flex: 1,
    justifyContent: 'center',
  },

  navItens: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.dark,
    borderRadius: 5,
    alignItems: 'center',
    padding: 12,
    marginTop: 30,
    height: 50,
  },

  navIcon: {
    marginTop: 6,
  },

  navText: {
    fontSize: 18,
    color: '#560CCE',
    paddingLeft: 5,
  },

  iconSignOut: {
    paddingLeft: 5,
  },
  signOut: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.dark,
    justifyContent: 'center',
    backgroundColor: '#560CCE',
    borderRadius: 5,
    alignItems: 'center',
    padding: 12,
    marginTop: 30,
  },

  signOutText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default styles;
