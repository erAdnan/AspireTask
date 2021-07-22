import * as React from "react";
import { View, Text } from "react-native";
import { nanoid } from "nanoid/non-secure";

interface ErrorBoundaryState {
    hasError: boolean;
}

export default class ErrorBoundary extends React.Component<unknown, ErrorBoundaryState> {
    public readonly state: ErrorBoundaryState = { hasError: false };

    // TODO: Implement Me!
    public async componentDidCatch(e: Error, info: React.ErrorInfo) {
        this.setState({ hasError: true });
        const error = {
            info,
            message: e.message,
            name: e.name,
            stack: e.stack,
            errorId: nanoid(),
        };
        console.error(error)
        console.error(e, info);
    }
    public render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Text>An Error has occurred.</Text>
                </View>
            );
        } else {
            return this.props.children;
        }
    }
}
