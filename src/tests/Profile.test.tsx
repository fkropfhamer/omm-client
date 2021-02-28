import {render} from "@testing-library/react";
import React from "react";
import Profile from "../components/Profile";

test('renders correct', () => {
    const routeComponentPropsMock = {
        history: [] as any,
        location: {} as any,
        match: { params: {} } as any,
    }

    const container = render(<Profile {...routeComponentPropsMock}/>);
    expect(container).toMatchSnapshot();
});
