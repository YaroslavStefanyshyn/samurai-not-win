import { renderHook } from '@testing-library/react-hooks';
import { useWindowSize } from '../../hooks/useWindowSize';

describe('useWindowSize', () => {
  it('should update window size on resize', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toEqual(result.current.width);
    expect(result.current.height).toEqual(result.current.height);

    // Simulate window resize
    window.innerWidth = 600;
    window.innerHeight = 800;
    window.dispatchEvent(new Event('resize'));

    expect(result.current.width).toEqual(600);
    expect(result.current.height).toEqual(800);
  });

  it('should remove event listener on unmount', () => {
    const { unmount } = renderHook(() => useWindowSize());

    const spyRemoveEventListener = jest.spyOn(window, 'removeEventListener');

    unmount();

    expect(spyRemoveEventListener).toHaveBeenCalled();
    expect(spyRemoveEventListener).toHaveBeenCalledWith('resize', expect.any(Function));

    spyRemoveEventListener.mockRestore();
  });
});
