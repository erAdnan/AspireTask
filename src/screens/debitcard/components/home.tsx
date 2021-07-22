import * as React from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components/native";
import { LayoutChangeEvent, StatusBar, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dispatch } from "@reduxjs/toolkit";
import { colors } from "@src/common/colors";
import { RootState } from "../parent";
import { Card } from "@src/common/components/Card";
import images from "@src/assets/images";
import { SafeAreaSpacer } from "@src/common/components/SafeAreaSpacer";
import * as RootNavigation from "@src/services/navigation";
import { actions as homeActions } from "../slicer";
import { getDataSelector } from "../selector";
import ListItem from "./listItem";
import DebitCard from "./debitcard";
import HorizontalProgressBar from "./progressBar";

const BackgroundScrollView = styled.ScrollView`
`;

const HeaderText = styled.Text`
flex: 1;
font-weight: 600; 
font-size: 24px; 
color: white
`;
const BalanceText = styled.Text`
font-weight: 400; 
font-size: 14px; 
color: white;
`;
const BalanceAmountText = styled.Text`
font-weight: 600; 
font-size: 24px; 
color: white;
margin-top: 10px;
margin-left: 10px;
`;
const CurrencyText = styled.Text`
font-weight: 600; 
font-size: 12px; 
color: white;
`;
const TopWrapper = styled.View`
flex: 1;
    margin-left: 20px;
    padding-top: 20px;
    margin-right: 20px;
    height: 220px;
    display: flex;
    flex-flow: column;
`;
const LogoWrapper = styled.View`
    display: flex;
    width: 100%;
    flex-flow: row;
    align-items: center;
`;
const BlanceViewWrapper = styled.View`
    margin-top: 25px;
    display: flex;
    flex-flow: column;
`;
const AmountViewWrapper = styled.View`
    display: flex;
    flex-flow: row;
    align-items: center;
`;
const CurrencyViewWrapper = styled.View`
    background-color: ${colors.activeGreen};
    padding: 2px 10px;
    border-radius: 5px;
`;
const TopInfoWrapper = styled.View`
    height: 220px;
    width: 100%;
    display: flex;
    flex-flow: row;
    background-color: ${colors.blueBg};
`;
const SpendingLimitWrapper = styled.View`
    margin-left: 20px;
    padding-top: 10px;
    margin-right: 20px;
    display: flex;
    flex-flow: column;
`;
const SpendingLimitText = styled.Text`
    flex: 1;
    font-weight: 300; 
    font-size: 13px;
`;

const SpendingLimitValueText = styled.Text`
    font-weight: 300; 
    font-size: 13px;
    ${(props) => props.styles}
`;

const cardStyles = css`
    width: 100%;
    padding-top: 160px;
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
export interface HomeScreenProps {
    fetchData: () => void;
    toggleLimitProgress: () => void;
    isLoading: boolean;
    data: any;
    showLimitProgress: boolean;
    weeklySaveLimit: string;
}
export interface HomeScreenState {
    layout: {
        height: number;
        width: number;
        x: number;
        y: number;
    };
    listData: any;
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.blueBg,
    },
    scrollStyle: {
        paddingTop: 300,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent"
    },
    scrollcontentStyle: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    }
});

export class HomeScreen extends React.PureComponent<HomeScreenProps, HomeScreenState> {
    public state = {
        layout: {
            height: 0,
            width: 0,
            x: 0,
            y: 0,
        },
        listData: [
            {
                title: "Top-up account",
                subTitle: "Deposit money to your account to use with card",
                icon: images.insight
            },
            {
                title: "Weekly spending limit",
                subTitle: "Your weekly spending limit is $5,000",
                showToggle: true,
                icon: images.transfer,
                enable: false
            },
            {
                title: "Freeze card",
                subTitle: "Your debit card is currently active",
                showToggle: true,
                icon: images.freeze,
                enable: false
            },
            {
                title: "Get a new card",
                subTitle: "This deactivates your current debit card",
                icon: images.newcard,
            },
            {
                title: "Deactivated cards",
                subTitle: "Your previously deactivated cards",
                icon: images.transfer,
            },
        ],
    };
    public componentDidMount = () => {
        this.props.fetchData();
    };
    public onLayout = (event: LayoutChangeEvent) => {
        this.setState({ layout: event.nativeEvent.layout });
    };

    _onSwitchChange = (index: number) => {
        const tempData = [...this.state.listData];
        if (!tempData[index].enable) {
            RootNavigation.navigate("SpendLimit");
        }
        this.props.toggleLimitProgress();
        tempData[index].enable = !tempData[index].enable;
        this.setState({ listData: tempData });

    };
    public render() {
        const { data } = this.props;
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
                            <HeaderText testID={"text-debit-card"} >
                                Debit Card
                            </HeaderText>
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
                        <BlanceViewWrapper>
                            <BalanceText testID={"amount-text-name"} >
                                Available Balance
                            </BalanceText>
                            <AmountViewWrapper>
                                <CurrencyViewWrapper>
                                    <CurrencyText>$$</CurrencyText>
                                </CurrencyViewWrapper>
                                <BalanceAmountText testID={"amount-text-value"} >
                                    {data?.balance?.toLocaleString('en-US') ?? "0.00"}
                                </BalanceAmountText>
                            </AmountViewWrapper>
                        </BlanceViewWrapper>
                    </TopWrapper>
                </TopInfoWrapper>
                <BackgroundScrollView
                    onLayout={this.onLayout}
                    style={styles.scrollStyle}
                    contentContainerStyle={styles.scrollcontentStyle}
                >
                    <>
                        <Card styles={cardStyles}>
                            <DebitCard />
                            {this.props.showLimitProgress && (
                                <SpendingLimitWrapper>
                                    <LogoWrapper>
                                        <SpendingLimitText testID={"text-debit-card"} >
                                            Debit card spending limit
                                        </SpendingLimitText>
                                        <SpendingLimitValueText testID={"SpendingLimitValueText"} styles={{ color: colors.activeGreen }}>
                                            $345
                                        </SpendingLimitValueText>
                                        <SpendingLimitValueText testID={"SpendingLimitValueText-rest"} styles={{ color: colors.grey, opacity: 0.4 }}>
                                            | ${this.props.weeklySaveLimit}
                                        </SpendingLimitValueText>
                                    </LogoWrapper>
                                    <HorizontalProgressBar
                                        progress={60}
                                    />
                                </SpendingLimitWrapper>
                            )}
                            {
                                this.state.listData.map((item, index) => {
                                    return (
                                        <ListItem
                                            testID={`${item.title}-${index}`}
                                            title={item.title}
                                            subTitle={item.subTitle}
                                            imageSrc={item.icon}
                                            isEnabled={item?.enable ?? false}
                                            showToggle={item?.showToggle}
                                            onSwitchChange={() => this._onSwitchChange(index)}
                                        />
                                    );
                                })
                            }
                        </Card>
                    </>
                </BackgroundScrollView>
            </SafeAreaView>
        );
    }
}

export const mapStateToProps = (state: RootState) => {
    const data = getDataSelector(state);
    return {
        isLoading: state.dashboard.isLoading,
        data,
        showLimitProgress: state.dashboard.showLimitProgress,
        weeklySaveLimit: state.dashboard.weeklySaveLimit
    };
};

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        fetchData: () => {
            dispatch(homeActions.startFetchingData())
        },
        toggleLimitProgress: () => {
            dispatch(homeActions.toggleLimitProgress())
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
