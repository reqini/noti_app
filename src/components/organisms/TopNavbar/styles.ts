import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rightButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  profileButton: {
    marginLeft: 8,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  langSelectorContainer: {
    marginLeft: 8,
    position: 'relative',
    zIndex: 100,
  },
  langButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langButtonText: {
    fontSize: 18,
  },
  langDropdown: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 20,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#e9ecef',
    zIndex: 9999,
  },
  langDropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  langDropdownText: {
    fontSize: 16,
    color: '#333',
  },
}); 