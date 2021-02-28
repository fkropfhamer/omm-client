import {render} from "@testing-library/react";
import React from "react";
import Register from "../components/Register";

test('renders correct', () => {
    const routeComponentPropsMock = {
        history: {} as any,
        location: {} as any,
        match: {} as any,
    }

    const container = render(<Register {...routeComponentPropsMock}/>);
    expect(container).toMatchSnapshot();
});
