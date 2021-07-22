import * as React from "react";
import styled from "styled-components/native";

const CardComponent = styled.View`
    background-color: #FFF;
    border-top-color: #e3e3e3;
    border-left-color: #e3e3e3;
    border-right-color: #e3e3e3;
    border-bottom-color: #dfdfdf;
    border-top-width: 0;
    border-bottom-width: 2px;
    border-left-width: 0;
    border-right-width: 0;
    border-radius: 6px;
    overflow: hidden;
    ${(props) => props.styles}
`;

export interface CardProps {
    testID?: string;
    styles?: any;
}

export const Card: React.FC<CardProps> = ({ children, styles, testID }) => (
    <CardComponent testID={testID} styles={styles} accessible={false}>
        {children}
    </CardComponent>
);
