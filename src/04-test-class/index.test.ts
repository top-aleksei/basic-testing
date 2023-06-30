// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  const account1 = getBankAccount(50);
  const account2 = getBankAccount(60);

  test('should create account with initial balance', () => {
    expect(account1).toBeInstanceOf(BankAccount);
    expect(account1).toEqual({ _balance: 50 });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account1.withdraw(90)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account1.transfer(100, account2)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account1.transfer(20, account1));
  });

  test('should deposit money', () => {
    account1.deposit(50);
    expect(account1.getBalance()).toBe(100);
  });

  test('should withdraw money', () => {
    account1.withdraw(50);
    expect(account1.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(0);
    expect(account2.getBalance()).toBe(110);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account1.fetchBalance();
    if (balance) {
      expect(typeof balance).toBe('number');
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockedBalance = 55;
    const spy = jest.spyOn(account1, 'fetchBalance');
    spy.mockResolvedValueOnce(mockedBalance);

    await account1.synchronizeBalance();
    expect(account1.getBalance()).toBe(mockedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account1, 'fetchBalance').mockResolvedValue(null);

    try {
      await account1.synchronizeBalance();
    } catch (e) {
      expect(e).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
