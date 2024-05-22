import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SignUp from "../app/screen/auth/signup";
import LogIn from "../app/screen/auth/login";
import Home from "../app/screen/home/home"
import HeaderAdmin from "../app/screen/admin/headerAdmin"

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
          name="home-admin"
          component={HeaderAdmin}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default RootLayout;
