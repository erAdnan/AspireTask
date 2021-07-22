import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HomeScreen } from "@src/screens/home";

const Stack = createStackNavigator();

export const HomeNavigator: React.FC = () => {
    return (
        <Stack.Navigator headerMode="none" mode="modal" initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default HomeNavigator;
