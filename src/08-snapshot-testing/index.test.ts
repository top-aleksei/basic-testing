// Uncomment the code below and write your tests
// import { generateLinkedList } from './index';

import { generateLinkedList } from '08-snapshot-testing';

describe('generateLinkedList', () => {
  const testElements = [1, 2, 3, 4];
  const testLinkedList = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: {
            value: null,
            next: null,
          },
        },
      },
    },
  };
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(testElements)).toStrictEqual(testLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(testElements)).toMatchSnapshot();
  });
});
