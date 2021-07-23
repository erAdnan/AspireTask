import * as React from "react";
import styled, { css } from "styled-components/native";
import { Image } from "react-native";
import { colors } from "@src/common/colors";
import { Card } from "@src/common/components/Card";
import images from "@src/assets/images";

const Wrapper = styled.View`
    width: 90%;
    top: -100px;
    position: absolute;
    align-self: center;
    z-index: 100;
    overflow: visible;
`;
const debitcardStyles = css`
    width: 100%;
    min-height: 220px;
    border-radius: 10px;
    shadow-radius: 10px;
    background-color: ${colors.activeGreen};
    align-self: center;
    padding: 20px;
`;
const EyeViewWrapper = styled.TouchableOpacity`
    background-color: #FFFFFF;
    padding: 10px 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    right: 0px;
    bottom: -8px;
    width: 150px;
    align-self: flex-end;

`;
const Row = styled.View`
    flex-flow: row;
`;
const MiniLogoRow = styled.View`
    flex-flow: row;
    align-items: center;
    right: 0px;
    align-self: flex-end;
`;
const StatusText = styled.Text`
    font-weight: 600; 
    font-size: 12px; 
    color: ${colors.activeGreen};
`;

const NameText = styled.Text`
    font-weight: 600; 
    font-size: 22px; 
    color: white;
    top: 20px;
`;
const InputRow = styled.View`
    flex-flow: row;
    margin-top: 40px;
`;
const StyledInput = styled.TextInput`
    font-size: 14px;
    font-weight: 600;
    flex: 1;
    color: white;
`;
const DateText = styled.Text`
    font-weight: 600; 
    font-size: 13px; 
    color: white;
    margin-top: 10px;
`;
const BottomRow = styled.View`
    flex-flow: row;
    margin-top: 10px;
`;
const CVVRow = styled.View`
    flex-flow: row;
    margin-left: 20px;
    align-items: center;
`;

const VisaLogoRow = styled.View`
    flex-flow: row;
    align-items: center;
    right: 0px;
    align-self: flex-end;
    margin-top: 10px;
`;

export interface CardProps {
    onChangeText?: () => {}
}
export interface CardState {
    isSecured: boolean;
}
export class DebitCard extends React.PureComponent<CardProps, CardState> {
    state = {
        isSecured: false
    }
    public render() {
        return (
            <Wrapper>
                <EyeViewWrapper onPress={() => this.setState({ isSecured: !this.state.isSecured })}>
                    <Row>
                        <Image
                            source={images.eye}
                        />
                        <StatusText>
                            {this.state.isSecured ? "Show card number" : "Hide card number"}
                        </StatusText>
                    </Row>

                </EyeViewWrapper>
                <Card styles={debitcardStyles}>
                    <MiniLogoRow>
                        <Image
                            source={images.aspireLogo}
                        />
                    </MiniLogoRow>
                    <NameText>
                        Mark Henry
                    </NameText>
                    <InputRow>
                        <StyledInput
                            onChangeText={this.props.onChangeText}
                            value={"1234"}
                            editable={false}
                            secureTextEntry={this.state.isSecured}
                            maxLength={4}
                        />
                        <StyledInput
                            onChangeText={this.props.onChangeText}
                            value={"5678"}
                            editable={false}
                            secureTextEntry={this.state.isSecured}
                            maxLength={4}
                        />
                        <StyledInput
                            onChangeText={this.props.onChangeText}
                            value={"9012"}
                            editable={false}
                            secureTextEntry={this.state.isSecured}
                            maxLength={4}
                        />
                        <StyledInput
                            onChangeText={this.props.onChangeText}
                            value={"4567"}
                            editable={false}
                            maxLength={4}
                        />
                    </InputRow>
                    <BottomRow>
                        <DateText>
                            Thru: 12/20
                        </DateText>
                        <CVVRow>
                            <DateText>
                                CVV:
                            </DateText>
                            <DateText>
                                {this.state.isSecured ? "***" : "456"}
                            </DateText>
                        </CVVRow>
                    </BottomRow>
                    <VisaLogoRow>
                        <Image
                            source={images.visa}
                        />
                    </VisaLogoRow>
                </Card>
            </Wrapper>
        );
    }
}

export default DebitCard;
