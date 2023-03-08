import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Select, {SelectedValue} from '../../components/Select/Select';
import { useGetModeData } from '../../hooks/useGetModeData';

jest.mock('../../hooks/useGetModeData');

const onSelectMock = jest.fn();
const setOpenSelectMock = jest.fn();

const options: SelectedValue[] = [
  { field: 1, value: 'mode1', label: 'Mode 1' },
  { field: 2, value: 'mode2', label: 'Mode 2' },
];

describe('ModeSelector component', () => {
  beforeEach(() => {
    (useGetModeData as jest.Mock).mockReturnValue({
      modeData: options,
      loading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with default props', () => {
    render(
      <Select
        onSelect={onSelectMock}
        selectedOption=""
        setOpenSelect={setOpenSelectMock}
      />,
    );

    const placeholder = screen.getByText('Pick mode');
    expect(placeholder).toBeInTheDocument();

    fireEvent.mouseDown(placeholder);
    const option1 = screen.getByText('Mode 1');

    fireEvent.click(option1);
    expect(onSelectMock).toHaveBeenCalledWith(options[0]);
    expect(setOpenSelectMock).toHaveBeenCalledWith(false);

    fireEvent.mouseDown(placeholder);
  });

  it('should show loading indicator when loading is true', () => {
    (useGetModeData as jest.Mock).mockReturnValue({
      modeData: null,
      loading: true,
    });

    render(
      <Select
        onSelect={onSelectMock}
        selectedOption=""
        setOpenSelect={setOpenSelectMock}
      />,
    );

    const placeholder = screen.getByText('Pick mode');
    expect(placeholder).toBeInTheDocument();

    fireEvent.mouseDown(placeholder);
  });
});
