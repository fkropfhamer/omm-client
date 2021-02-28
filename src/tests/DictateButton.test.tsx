import {render} from "@testing-library/react";
import React from "react";
import DictateButton from "../components/DictateButton";

test('renders correct', () => {
    const container = render(<DictateButton onSpeech={jest.fn()}/>);
    expect(container).toMatchSnapshot();
});
