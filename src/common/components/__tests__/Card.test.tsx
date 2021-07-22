import React from "react";
// import { render } from "@testing-library/react-native";
import { Card, CardProps } from "../Card";
import Enzyme from "enzyme";
import "jest-styled-components";

describe("Button Component", () => {
    const props: CardProps = {
        testID: "test",
    };

    it("should have an ID and render children", () => {
        const wrapper = Enzyme.shallow(<Card {...props}>Test Card</Card>);
        const testID = "test";
        const expected = "Test Card";
        expect(wrapper.findWhere((node) => node.prop("testID") === testID).props().children).toBe(expected);
    });
});
