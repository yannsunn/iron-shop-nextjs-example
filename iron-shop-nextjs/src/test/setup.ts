import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js modules
vi.mock('next/image', () => ({
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return { type: 'img', props: { src, alt, ...rest } };
  },
}));

vi.mock('next/link', () => ({
  default: (props: any) => {
    const { children, href, ...rest } = props;
    return { type: 'a', props: { href, ...rest, children } };
  },
}));

// Mock intersection observer
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});