import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { PaymentsScreen } from "@src/screens/payments";

const Stack = createStackNavigator();

export const DashboardNavigator: React.FC = () => {
    return (
        <Stack.Navigator headerMode="none" mode="modal" initialRouteName="PaymentHome">
            <Stack.Screen name="PaymentHome" component={PaymentsScreen} />
        </Stack.Navigator>
    );
};

export default DashboardNavigator;
