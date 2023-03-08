import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../../components/Button";

describe("Button component", () => {
  const props = {
    className: "my-button",
    label: "Start",
    disabled: false,
    onClick: jest.fn(),
  };

  it("should render the button with the correct label", () => {
    render(<Button {...props} />);
    expect(screen.getByText(props.label)).toBeInTheDocument();
  });

  it("should add the specified className to the button", () => {
    render(<Button {...props} />);
    expect(screen.getByRole("button")).toHaveClass(props.className);
  });

  it("should call the onClick function when the button is clicked", () => {
    render(<Button {...props} />);
    fireEvent.click(screen.getByRole("button"));
    expect(props.onClick).toHaveBeenCalled();
  });

  it("should disable the button when the disabled prop is true", () => {
    render(<Button {...props} disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
