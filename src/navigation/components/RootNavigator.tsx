import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Tab from "./TabNavigator";

const Stack = createStackNavigator();

export class RootNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator
                initialRouteName={"Tab"}
                mode={"card"}
                headerMode={"none"}
                screenOptions={{
                    cardOverlayEnabled: true,
                    headerShown: false,
                }}>
                <Stack.Screen name="Tab" component={Tab} />
            </Stack.Navigator>
        );
    }
}


export default RootNavigator;
