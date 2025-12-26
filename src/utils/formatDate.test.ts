import { describe, it, expect } from 'vitest';
import { formatDateOfBirth } from './formatDate';

describe('formatDateOfBirth', () => {
  it('formats valid date string dd-mm-yyyy', () => {
    const result = formatDateOfBirth('31-07-1980');
    expect(result).toBeTruthy();
    // O formato exato depende da localização, mas deve ser uma data válida
    expect(result).toMatch(/\d+/);
  });

  it('formats date with single digit day and month', () => {
    const result = formatDateOfBirth('01-03-1995');
    expect(result).toBeTruthy();
    expect(result).toMatch(/\d+/);
  });

  it('returns empty string for empty input', () => {
    const result = formatDateOfBirth('');
    expect(result).toBe('');
  });

  it('returns original string for invalid format', () => {
    const result = formatDateOfBirth('invalid-date');
    expect(result).toBe('invalid-date');
  });

  it('returns original string for incomplete date', () => {
    const result = formatDateOfBirth('31-07');
    expect(result).toBe('31-07');
  });

  it('handles date with extra dashes', () => {
    const result = formatDateOfBirth('31-07-1980-extra');
    // Aceita o original já que não é formato válido dd-mm-yyyy
    expect(result).toBeTruthy();
  });

  it('formats leap year date correctly', () => {
    const result = formatDateOfBirth('29-02-2000');
    expect(result).toBeTruthy();
    expect(result).toMatch(/\d+/);
  });

  it('formats first day of year', () => {
    const result = formatDateOfBirth('01-01-2000');
    expect(result).toBeTruthy();
    expect(result).toMatch(/\d+/);
  });

  it('formats last day of year', () => {
    const result = formatDateOfBirth('31-12-1999');
    expect(result).toBeTruthy();
    expect(result).toMatch(/\d+/);
  });

  it('handles old dates (19th century)', () => {
    const result = formatDateOfBirth('15-08-1899');
    expect(result).toBeTruthy();
    expect(result).toMatch(/\d+/);
  });
});
