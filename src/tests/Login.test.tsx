import {render} from "@testing-library/react";
import React from "react";
import Login from "../components/Login";

test('renders correct', () => {
    const routeComponentPropsMock = {
        history: {} as any,
        location: {} as any,
        match: {} as any,
    }

    const container = render(<Login {...routeComponentPropsMock}/>);
    expect(container).toMatchSnapshot();
});
