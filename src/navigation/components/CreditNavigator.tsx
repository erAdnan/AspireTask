import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { CreditCardScreen } from "@src/screens/credit";

const Stack = createStackNavigator();

export const CreditNavigator: React.FC = () => {
    return (
        <Stack.Navigator headerMode="none" mode="modal" initialRouteName="CreditHome">
            <Stack.Screen name="CreditHome" component={CreditCardScreen} />
        </Stack.Navigator>
    );
};

export default CreditNavigator;
