import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 1, title: 'Menu Item 1' },
    { id: 2, title: 'Menu Item 2' },
    { id: 3, title: 'Menu Item 3' },
    { id: 4, title: 'Menu Item 4' },
    { id: 5, title: 'Menu Item 5' },
    { id: 6, title: 'Menu Item 6' },
    { id: 7, title: 'Menu Item 7' },
    { id: 8, title: 'Menu Item 8' },
  ];

  const openMenu = () => {
    // alert("Open menu")
    setIsMenuOpen(!isMenuOpen);
  };

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );
 
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.menuToggle} onPress={openMenu}>
        {isMenuOpen ? (
          <Text style={styles.menuToggleText}>&times;</Text>
        ) : (
          <Text style={styles.menuToggleText}>&#x2630;</Text>
        )}
        {/* <Text>Open menu</Text> */}
      </TouchableOpacity>

      {isMenuOpen && (
        <View style={styles.menuWrapper}>
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.menu}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    position: "relative"
    // zIndex: 100000
  },
  menuToggle: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  menuToggleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuWrapper: {
    position: 'absolute',
    // top: 10,
    // left: 50,
    width: windowWidth / 2,
    // height: 100,
    backgroundColor: '#fff',
    borderRadius: 5,
    zIndex: 1, 
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  menu: {
    marginTop: 10,
    paddingBottom: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuItemText: {
    fontSize: 16,
  },
});

export default Menu;
