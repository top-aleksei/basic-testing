import path from 'path';

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  const time = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    const cb = () => console.log('test callback');

    doStuffByTimeout(cb, time);
    expect(setTimeout).toBeCalledWith(cb, time);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();

    doStuffByTimeout(cb, time);

    jest.advanceTimersByTime(time - 1);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(cb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  const intreval = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();

    doStuffByInterval(cb, intreval);
    expect(setInterval).toBeCalledWith(cb, intreval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const repeats = 10;

    doStuffByInterval(cb, intreval);
    jest.advanceTimersByTime(intreval * repeats);
    expect(cb).toBeCalledTimes(repeats);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously('pathToFile');
    expect(path.join).toBeCalledWith(__dirname, 'pathToFile');
  });

  test('should return null if file does not exist', async () => {
    const fileContent = await readFileAsynchronously('notExistingPath');
    expect(fileContent).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileName = 'index.ts';
    const fullPath = path.join(__dirname, fileName);

    const fileContent = await readFile(fullPath, { encoding: 'utf-8' });

    expect(await readFileAsynchronously(fileName)).toBe(fileContent);
  });
});
