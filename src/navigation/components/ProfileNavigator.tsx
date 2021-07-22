import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ProfileScreen } from "@src/screens/profile";

const Stack = createStackNavigator();

export const ProfileNavigator: React.FC = () => {
    return (
        <Stack.Navigator headerMode="none" mode="modal" initialRouteName="ProfileHome">
            <Stack.Screen name="ProfileHome" component={ProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProfileNavigator;
