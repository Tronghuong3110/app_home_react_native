import HomeAdmin from '../admin/homeAdmin';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Statistic from '../admin/statistic';
import ManagerProductType from '../admin/managerProduct';

const Menu = ( { choosenComponent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = useNavigation()

  const menuItems = [
    { id: "home-admin", title: 'Trang chủ', component: <HomeAdmin/> },
    { id: "manager-product", title: 'Quản lý sản phẩm', component: <ManagerProductType/> },
    { id: "statistic", title: 'Thống kê', component: <Statistic/> }
  ];

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const switchComponent = (componentName) => {
    // console.log(componentName)
    setIsMenuOpen(false)
    choosenComponent(componentName)
  }

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem} onPress={() => switchComponent(item.component)}>
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
    position: "relative",
    zIndex: 100000
  },
  menuToggle: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  menuToggleText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  menuWrapper: {
    position: 'absolute',
    top: 85,
    width: windowWidth / 2,
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
