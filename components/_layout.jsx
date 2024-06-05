import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SignUp from "../app/screen/auth/signup";
import LogIn from "../app/screen/auth/login";
import Home from "../app/screen/user/home";
import HomeAdmin from "../app/screen/admin/home";
import ManagerTypeProduct from "./admin/managerProduct";
import Statistic from "./admin/statistic";
import ListWeight from "../app/screen/user/listWeight";
import Admin from "../app/screen/admin/home";

const Stack = createStackNavigator();

const RootLayout = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="sign-in">
        <Stack.Screen
          name="sign-in"
          component={LogIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="sign-up"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home-user"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home-admin"
          component={HomeAdmin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="manager-product"
          component={ManagerTypeProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="statistic"
          component={Statistic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="show-list"
          component={ListWeight}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default RootLayout;
