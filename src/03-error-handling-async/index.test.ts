// Uncomment the code below and write your tests
import {
  MyAwesomeError,
  rejectCustomError,
  // throwError,
  // throwCustomError,
  resolveValue,
  throwCustomError,
  throwError,
  // MyAwesomeError,
  // rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(2)).resolves.toBe(2);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('Test error text');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e).toHaveProperty('message', 'Test error text');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(e).toHaveProperty('message', 'Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (e) {
      expect(e).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toBeInstanceOf(MyAwesomeError);
  });
});
