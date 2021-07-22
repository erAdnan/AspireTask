import React, { useRef, useEffect } from 'react';
import { StyleSheet, Animated } from 'react-native';
import styled from "styled-components/native";

const Wrapper = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
`;
const ProgressBarView = styled.View`
    flex-flow: row;
    height: 15px;
    width: 100%;
    background-color: #A3EBB1;
    borderRadius: 20px;
`;

export interface Props {
    progress: number;
}
export const HorizontalProgressBar = (props: Props) => {
    let animation = useRef(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: props.progress,
            duration: 100,
            useNativeDriver: false
        }).start();
    }, [props.progress]);

    const width = animation.current.interpolate({
        inputRange: [0, 100],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    });

    return (
        <Wrapper>
            <ProgressBarView>
                <Animated.View style={[StyleSheet.absoluteFill,
                {
                    backgroundColor: "#01D167",
                    width,
                    borderRadius: 20,
                }]} />
            </ProgressBarView>
        </Wrapper>
    );
}

export default HorizontalProgressBar;
