import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useReducedMotion } from './useReducedMotion';

// Mock matchMedia
const mockMatchMedia = vi.fn();

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: mockMatchMedia,
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('useReducedMotion', () => {
  it('returns false when prefers-reduced-motion is not set', () => {
    const mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
    expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('returns true when prefers-reduced-motion is set', () => {
    const mockMediaQuery = {
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(true);
  });

  it('adds and removes event listener correctly', () => {
    const mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { unmount } = renderHook(() => useReducedMotion());

    expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );

    unmount();

    expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    );
  });

  it('handles missing matchMedia gracefully', () => {
    // Remove matchMedia from window
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: undefined,
    });

    const { result } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);
  });

  it('updates state when media query changes', () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null;
    
    const mockMediaQuery = {
      matches: false,
      addEventListener: vi.fn((event, handler) => {
        changeHandler = handler;
      }),
      removeEventListener: vi.fn(),
    };
    mockMatchMedia.mockReturnValue(mockMediaQuery);

    const { result, rerender } = renderHook(() => useReducedMotion());

    expect(result.current).toBe(false);

    // Simulate media query change
    if (changeHandler) {
      changeHandler({ matches: true } as MediaQueryListEvent);
      rerender();
    }

    expect(result.current).toBe(true);
  });
});