// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 12, b: 6, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: '43', b: 2, action: Action.Add, expected: null },
  { a: 12, b: null, action: Action.Subtract, expected: null },
  { a: 4, b: 2, action: 'wrong action', expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`Should correct work in case : ${a} ${action} ${b}`, () => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
