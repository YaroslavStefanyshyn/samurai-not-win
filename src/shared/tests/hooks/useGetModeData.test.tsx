import { renderHook } from '@testing-library/react-hooks';
import {useGetModeData} from "../../hooks/useGetModeData";
import fetch from 'jest-fetch-mock';

describe('useGetModeData', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should fetch and return mode data', async () => {
    const responseData = [
      { field: 5, value: 'easy', label: 'Easy' },
      { field: 15, value: 'normal', label: 'Normal' },
      { field: 25, value: 'hard', label: 'Hard' }
    ];
    fetch.mockResponseOnce(JSON.stringify(responseData));

    const { result, waitForNextUpdate } = renderHook(() => useGetModeData());

    expect(result.current.loading).toBe(true);
    expect(result.current.modeData).toBe(null);
    expect(result.current.error).toBe(null);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.modeData).toEqual([
      { field: 5, value: 'easy', label: 'Easy' },
      { field: 15, value: 'normal', label: 'Normal' },
      { field: 25, value: 'hard', label: 'Hard' },
    ]);
    expect(result.current.error).toBe(null);
  });
});
