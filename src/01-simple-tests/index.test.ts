// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 6, action: Action.Add });
    expect(result).toBe(9);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 6, action: Action.Subtract });
    expect(result).toBe(-3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 6, action: Action.Multiply });
    expect(result).toBe(18);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 6, action: Action.Divide });
    expect(result).toBe(0.5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 6,
      action: Action.Exponentiate,
    });
    expect(result).toBe(729);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 3, b: 6, action: 'wrongaction' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '3', b: 6, action: Action.Add });
    expect(result).toBeNull();
  });
});
