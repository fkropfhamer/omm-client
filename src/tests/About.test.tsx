import {render} from "@testing-library/react";
import React from "react";
import About from "../components/About";

test('renders correct', () => {
    const container = render(<About />);
    expect(container).toMatchSnapshot();
});
