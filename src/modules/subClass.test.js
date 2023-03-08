import DataCollection from './subClass.js';

describe('DataCollection', () => {
  let dataCollection;

  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };

  // Mock document.querySelector method
  document.querySelector = jest.fn(() => {
    return {
      innerHTML: ''
    };
  });

  beforeEach(() => {
    // create a new instance of DataCollection for each test
    dataCollection = new DataCollection();
    // replace localStorage with the mock object
    global.localStorage = localStorageMock;
  });

  afterEach(() => {
    // clear the mock object after each test
    localStorageMock.clear();
  });

  it('adds an item to the list', () => {
    dataCollection.setDataInLocal('test task');
    expect(dataCollection.data).toHaveLength(1);
    expect(dataCollection.data[0].task).toBe('test task');
  });

  it('deletes an item from the list', () => {
    dataCollection.setDataInLocal('test task 1');
    dataCollection.setDataInLocal('test task 2');
    dataCollection.deleteItem(0);
    expect(dataCollection.data).toHaveLength(1);
    expect(dataCollection.data[0].task).toBe('test task 2');
  });
});
