import { cn, formatPrice, truncateText } from '../utils';

describe('Utility Functions', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'not-included')).toBe('base conditional');
    });

    it('resolves Tailwind conflicts', () => {
      expect(cn('px-4 px-6')).toBe('px-6');
    });
  });

  describe('formatPrice function', () => {
    it('formats price with yen symbol', () => {
      expect(formatPrice(1000)).toBe('¥1,000');
    });

    it('handles zero price', () => {
      expect(formatPrice(0)).toBe('¥0');
    });

    it('handles large numbers', () => {
      expect(formatPrice(1234567)).toBe('¥1,234,567');
    });
  });

  describe('truncateText function', () => {
    it('truncates long text', () => {
      const longText = 'This is a very long text that should be truncated';
      expect(truncateText(longText, 20)).toBe('This is a very long...');
    });

    it('returns original text if shorter than limit', () => {
      const shortText = 'Short text';
      expect(truncateText(shortText, 20)).toBe('Short text');
    });

    it('handles empty string', () => {
      expect(truncateText('', 10)).toBe('');
    });
  });
});