import React from "react";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { create } from "react-test-renderer";
import ConnectedGamePage, { GamePage } from "./GamePage";
import GameFirstDialog from "../GameFirstDialog";
import initialState from "../../reducers/initialState";

describe("<GamePage />", () => {
  //const actions = {
    //saveFuelSavings: jest.fn(),
    //calculateFuelSavings: jest.fn()
  //};

  it("should contain <GameFirstDialog />", () => {
    const wrapper = shallow(
      <GamePage
        //actions={actions}
        //fuelSavings={initialState.fuelSavings}
      />
    );

    expect(wrapper.find(GameFirstDialog).length).toEqual(1);
  });

  it("should match snapshot", () => {
    const store = configureMockStore()(initialState);
    const component = create(
      <Provider store={store}>
        <ConnectedGamePage />
      </Provider>
    );
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
