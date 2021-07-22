import * as React from "react";
import { Image, Switch } from "react-native";
import styled from "styled-components/native";
import { colors } from "@src/common/colors";

const ItemWrapper = styled.View`
    padding: 5px 20px;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;

const NameWrapper = styled.View`
    flex: 1;
    margin-left: 15px;
    flex-direction: column;
`;

const IconWrapper = styled.View`
    justify-content: center;
`;
const TitleText = styled.Text`
    font-size: 14px; 
    color: #000000;
`;
const SubTitleText = styled.Text`
    font-size: 12px; 
    color: ${colors.grey};
    opacity: 0.4;
`;

export interface ItemProps {
    testID: string;
    title: string;
    subTitle: string;
    imageSrc: any;
    isEnabled: boolean;
    onSwitchChange?: () => void;
    showToggle?: boolean;
}

export default class ListItem extends React.PureComponent<ItemProps> {
    public render() {
        return (
            <ItemWrapper
                testID={this.props.testID}
            >
                <Image
                    style={{ width: 32, height: 32 }}
                    source={this.props?.imageSrc}
                />
                <NameWrapper>
                    <TitleText testID={"user-text-subtitle"} >
                        {this.props.title}
                    </TitleText>
                    <SubTitleText testID={"user-text-subtitle"}>
                        {this.props.subTitle}
                    </SubTitleText>
                </NameWrapper>
                {this.props.showToggle && (
                    <IconWrapper>
                        <Switch
                            trackColor={{ false: "#0000001F", true: "#01D167" }}
                            thumbColor={"#FFFFFF"}
                            ios_backgroundColor="#00000029"
                            onValueChange={this.props.onSwitchChange}
                            value={this.props.isEnabled}
                            style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
                        />
                    </IconWrapper>
                )}
            </ItemWrapper>
        );
    }
}
