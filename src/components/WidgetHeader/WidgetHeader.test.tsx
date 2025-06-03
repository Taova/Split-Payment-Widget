import { render, screen, fireEvent } from "@testing-library/react";
import WidgetHeader from ".";

describe("WidgetHeader", () => {
  it("renders correctly", () => {
    render(<WidgetHeader onClick={jest.fn()} />);
    expect(screen.getByText("Págalo en")).toBeInTheDocument();
    expect(screen.getByText("Más info")).toBeInTheDocument();
  });

  it('calls onClick when "Más info" button is clicked', () => {
    const handleClick = jest.fn();
    render(<WidgetHeader onClick={handleClick} />);
    fireEvent.click(screen.getByText("Más info"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
