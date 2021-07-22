import * as React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components/native";
import { LayoutChangeEvent, StatusBar, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dispatch } from "@reduxjs/toolkit";
import { colors } from "@src/common/colors";
import { Card } from "@src/common/components/Card";
import images from "@src/assets/images";
import { SafeAreaSpacer } from "@src/common/components/SafeAreaSpacer";
import { actions as homeActions } from "@src/screens/debitcard/slicer";
import { getDataSelector } from "@src/screens/debitcard/selector";
import { RootState } from "@src/screens/debitcard/parent";
import * as RootNavigation from "@src/services/navigation";

const BackgroundScrollView = styled.ScrollView`
`;
const RecentRowWrapper = styled.View`
    flex-flow: row;
    justify-content: space-between;
    margin: 20px 0px;
`;
const RowTop = styled.View`
    flex-flow: row;
`;
const TitleText = styled.Text`
    font-weight: 400; 
    font-size: 14px; 
    margin: 0px 10px;
`;
const HeaderText = styled.Text`
    font-weight: 600; 
    font-size: 24px; 
    color: white;
`;
const BalanceAmountText = styled.Text`
    font-weight: 600; 
    font-size: 24px; 
    color: black;
    margin-top: 10px;
    margin-left: 10px;
`;
const CurrencyText = styled.Text`
    font-weight: 600; 
    font-size: 13px; 
    color: white;
`;
const SubTitleText = styled.Text`
    font-weight: 400; 
    font-size: 13px; 
    color: ${colors.grey};
    opacity: 0.4;
    margin: 5px 0px;
`;
const TopWrapper = styled.View`
    margin-left: 20px;
    padding-top: 20px;
    margin-right: 20px;
    height: 220px;
`;
const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0;
    width: 25px;
    height: 25px;
    align-items: center;
    justify-content: center;
`;
const BackWrapper = styled.View`
    display: flex;
    width: 90%;
    flex-flow: row;
    align-items: center;
`;
const LogoWrapper = styled.View`
    width: 100%;
    flex-flow: row;
    align-items: center;
`;
const HeaderTextViewWrapper = styled.View`
    margin-top: 25px;
`;
const AmountViewWrapper = styled.View`
    display: flex;
    flex-flow: row;
    align-items: center;
    margin: 10px 0px;
`;
const CurrencyViewWrapper = styled.View`
    background-color: ${colors.activeGreen};
    padding: 5px 10px;
    border-radius: 5px;
`;
const TopInfoWrapper = styled.View`
    height: 220px;
    width: 100%;
    flex-flow: row;
    background-color: ${colors.blueBg};
`;

const RecentViewWrapper = styled.TouchableOpacity`
    background-color: #A3EBB1;
    opacity: 0.6;
    padding: 5px 20px;
    border-radius: 5px;
    height: 40px;
    align-items: center;
    justify-content: center;
`;
const RecentCurrencyText = styled.Text`
    font-weight: 600; 
    font-size: 12px; 
    color: ${colors.activeGreen};
`;
const cardStyles = css`
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    border-top-width: 1px;
    border-top-color: #e3e3e3;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    z-index: 10;
    elevation: 10;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
    shadow-color: #000000;
    shadow-offset: 2px 2px;
    shadow-radius: 10px;
    shadow-opacity: 0.5;
    overflow: visible;
`;

const SaveButton = styled.TouchableOpacity`
    width: 300px;
    height: 56px;
    align-items: center;
    justify-content: center;
    align-self: center;
    background-color: ${colors.activeGreen};
    border-radius: 30px;
    bottom: 10px;
    position: absolute;
`;
export interface Props {
    updateWeeklySaveLimit: (value: string) => void;
    weeklySaveLimit: string;
}
export interface State {
    layout: {
        height: number;
        width: number;
        x: number;
        y: number;
    };
    weeklyLimit: string;
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.blueBg,
    },
    scrollStyle: {
        backgroundColor: "transparent"
    },
    scrollcontentStyle: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    }
});

export class SpendLimitScreen extends React.PureComponent<Props, State> {
 
    constructor(props: Props) {
        super(props);
        this.state = {
            layout: {
                height: 0,
                width: 0,
                x: 0,
                y: 0,
            },
            weeklyLimit: props?.weeklySaveLimit ?? "0.00",
        }
    }

    public onLayout = (event: LayoutChangeEvent) => {
        this.setState({ layout: event.nativeEvent.layout });
    };
    public onSavePress = () => {
        this.props.updateWeeklySaveLimit(this.state.weeklyLimit);
        RootNavigation.goBack();
    };
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
                <TopInfoWrapper>
                    <TopWrapper>
                        <LogoWrapper>
                            <BackWrapper>
                                <BackButton
                                    onPress={() => RootNavigation.goBack()}
                                >
                                    <HeaderText testID={"text-debit-card-back"} >
                                        {"<"}
                                    </HeaderText>
                                </BackButton>
                            </BackWrapper>
                            <Image
                                testID={"id-top-logo"}
                                style={{
                                    width: 25,
                                    height: 25,
                                    right: 0
                                }}
                                source={images.homeFilled}
                            />
                        </LogoWrapper>
                        <HeaderTextViewWrapper>
                            <HeaderText testID={"text-debit-card"} >
                                Spending Limit
                            </HeaderText>
                        </HeaderTextViewWrapper>
                    </TopWrapper>
                </TopInfoWrapper>
                <BackgroundScrollView
                    onLayout={this.onLayout}
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollcontentStyle}
                >
                    <>
                        <Card styles={cardStyles}>
                            <RowTop>
                                <Image
                                    source={images.pickup}
                                />
                                <TitleText>Set a weekly debit card spending limit</TitleText>
                            </RowTop>
                            <AmountViewWrapper>
                                <CurrencyViewWrapper>
                                    <CurrencyText>$$</CurrencyText>
                                </CurrencyViewWrapper>
                                <BalanceAmountText testID={"amount-text-value"} >
                                    {this.state.weeklyLimit.toLocaleString('en-US') ?? "0.00"}
                                </BalanceAmountText>
                            </AmountViewWrapper>
                            <SubTitleText>Here weekly means the last 7 days - not the calendar week</SubTitleText>
                            <RecentRowWrapper>
                                <RecentViewWrapper onPress={() => { this.setState({ weeklyLimit: "5,000" }) }}>
                                    <RecentCurrencyText>$5,000</RecentCurrencyText>
                                </RecentViewWrapper>
                                <RecentViewWrapper onPress={() => { this.setState({ weeklyLimit: "10,000" }) }}>
                                    <RecentCurrencyText>$10,000</RecentCurrencyText>
                                </RecentViewWrapper>
                                <RecentViewWrapper onPress={() => { this.setState({ weeklyLimit: "20,000" }) }}>
                                    <RecentCurrencyText>$20,000</RecentCurrencyText>
                                </RecentViewWrapper>
                            </RecentRowWrapper>
                            <SaveButton
                                onPress={this.onSavePress}
                            >
                                <HeaderText testID={"save-button-text"} >
                                    Save
                                </HeaderText>
                            </SaveButton>
                        </Card>
                    </>
                </BackgroundScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (state: RootState) => {
    return {
        isLoading: state.dashboard.isLoading,
        weeklySaveLimit: state.dashboard.weeklySaveLimit
    };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        updateWeeklySaveLimit: (value: string) => {
            dispatch(homeActions.updateWeeklySaveLimit({ value }))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpendLimitScreen);
