// Uncomment the code below and write your tests
import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  const baseURL = 'https://jsonplaceholder.typicode.com';
  const urlPath = '/todos/1';
  const data = { data: 'some data' };

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(urlPath);
    expect(axios.create).toBeCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create');
    jest.spyOn(axios.Axios.prototype, 'get');

    await throttledGetDataFromApi(urlPath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axios.Axios.prototype.get).toBeCalledWith(urlPath);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create');
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue(data);

    const response = await throttledGetDataFromApi(urlPath);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(response).toEqual(data.data);
  });
});
