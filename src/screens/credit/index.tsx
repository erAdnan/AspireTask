import * as React from "react";
import styled from "styled-components/native";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@src/common/colors";
import { SafeAreaSpacer } from "@src/common/components/SafeAreaSpacer";

const HeaderText = styled.Text`
flex: 1;
font-weight: 600; 
font-size: 24px; 
color: white
`;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.blueBg,
        justifyContent: "center",
        alignItems: "center"
    },
});

export class CreditCardScreen extends React.PureComponent {
    public render() {
        return (
            <SafeAreaView style={styles.safeArea} edges={['right', 'left']} >
                <StatusBar
                    animated={true}
                    backgroundColor={colors.blueBg}
                    translucent
                    showHideTransition={"slide"}
                    hidden={false} />
                <SafeAreaSpacer />
                <HeaderText testID={"text-debit-card"} >
                    Credit Card Screen
                </HeaderText>
            </SafeAreaView>
        );
    }
}

export default CreditCardScreen;
