import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HomeScreen } from "@src/screens/debitcard";
import { SpendLimitScreen } from "@src/screens/debitcard/children/spendLimit";

const Stack = createStackNavigator();

export const DebitCardsNavigator: React.FC = () => {
    return (
        <Stack.Navigator headerMode="none" mode="modal" initialRouteName="DebitCardHome">
            <Stack.Screen name="DebitCardHome" component={HomeScreen} />
            <Stack.Screen name="SpendLimit" component={SpendLimitScreen} />
        </Stack.Navigator>
    );
};

export default DebitCardsNavigator;
