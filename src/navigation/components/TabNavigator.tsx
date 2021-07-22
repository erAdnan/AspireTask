import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "@src/common/colors";
import styled, { css } from "styled-components/native";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { View, Image } from "react-native";
import HomeNavigator from "./HomeNavigator";
import DebitCardsNavigator from "./DebitCardsNavigator";
import PaymentsNavigator from "./PaymentsNavigator";
import CreditNavigator from "./CreditNavigator";
import ProfileNavigator from "./ProfileNavigator";
import images from "@src/assets/images";

export const StyledView = styled.View`
    border-top-width: 3px;
    position: absolute;
    top: 0px;
    width: 100%;
    align-items: center;
    padding-top: 5px;
    ${(props) => props.styles}
`;

export const getIcon = (name: string) => ({
    focused,
    color,
    size,
}: {
    focused: boolean;
    color: string;
    size: number;
}) => {
    const styles = {
        view: css`
            border-top-color: transparent;
        `,
    };
    return (
        <StyledView styles={styles.view}>
            <Image
                style={{ width: size, height: size, tintColor: color}}
                source={images[!focused ? name : `${name}Filled`]}
            />
        </StyledView>
    );
};

export const copyTestId = (testId: string | undefined) => {
    let result;
    const testIdStr = "copy-test-id-empty-view";
    // Detects if a babel plugin is copying testId
    const emptyView = <View testID={testIdStr} />;
    if (emptyView.props.accessibilityLabel === testIdStr) {
        result = testId;
    }
    return result;
};

export const options = ({ route }: { route: RouteProp<ParamListBase, string> }) => ({
    tabBarIcon: getIcon(route.name),
});

const Tab = createBottomTabNavigator();

const getNavigationTabScreens = () => {
    return [
        <Tab.Screen
            name="Home"
            key="Home"
            component={HomeNavigator}
            options={{
                tabBarTestID: "tab-bar-home",
                tabBarAccessibilityLabel: copyTestId("tab-bar-home"),
                tabBarLabel: "Home",
                tabBarIcon: getIcon("home"),
            }}
        />,
        <Tab.Screen
            name="DebitCard"
            key="DebitCard"
            component={DebitCardsNavigator}
            options={{
                tabBarTestID: "tab-bar-debitCard",
                tabBarAccessibilityLabel: copyTestId("tab-bar-debitCard"),
                tabBarLabel: "Debit Card",
                tabBarIcon: getIcon("card"),
            }}
        />,
        <Tab.Screen
            name="Payments"
            key="Payments"
            component={PaymentsNavigator}
            options={{
                tabBarTestID: "tab-bar-payments",
                tabBarAccessibilityLabel: copyTestId("tab-bar-payments"),
                tabBarLabel: "Payments",
                tabBarIcon: getIcon("payments"),
            }}
        />,
        <Tab.Screen
            name="Credit"
            key="Credit"
            component={CreditNavigator}
            options={{
                tabBarTestID: "tab-bar-credit",
                tabBarAccessibilityLabel: copyTestId("tab-bar-credit"),
                tabBarLabel: "Credit",
                tabBarIcon: getIcon("freeze"),
            }}
        />,
        <Tab.Screen
            name="Profile"
            key="Profile"
            component={ProfileNavigator}
            options={{
                tabBarTestID: "tab-bar-profile",
                tabBarAccessibilityLabel: copyTestId("tab-bar-profile"),
                tabBarLabel: "Profile",
                tabBarIcon: getIcon("user"),
            }}
        />,
    ];
};
export const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={options}
            tabBarOptions={{
                activeTintColor: colors.activeGreen,
                inactiveTintColor: colors.inactiveGrey,
            }}
            initialRouteName={"Dashboard"}>
            {getNavigationTabScreens()}
        </Tab.Navigator>
    );
};

export default TabNavigator;
