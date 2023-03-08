import {render, screen} from "@testing-library/react";
import ResultArea from "../../components/ResultArea";

describe("ResultArea component", () => {
  const props = {
    onSquareNum: [1, 2, 3],
    selectedSquares: 2,
  };

  it("should render the correct number of square elements", () => {
    render(<ResultArea {...props} />);
    const squareElements = screen.getAllByTestId("square-element");
    expect(squareElements).toHaveLength(1);
  });

  it("should set the maxHeight style property of the result area block to the offsetHeight of the playground element", () => {
    const mockGetElementById = jest.fn(() => ({ offsetHeight: 100 }));
    const originalGetElementById = document.getElementById;
    // @ts-ignore
    // eslint-disable-next-line testing-library/no-node-access
    document.getElementById = mockGetElementById;
    render(<ResultArea {...props} />);
    expect(mockGetElementById).toHaveBeenCalledWith("playground");
    expect(document.querySelector(".App_result-area_block")).toHaveStyle("max-height: 100px");
    document.getElementById = originalGetElementById;
  });
});
