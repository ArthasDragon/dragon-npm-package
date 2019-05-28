import { debounce } from '../debounce'
jest.useFakeTimers();

test('debounce', () => {
  let test = jest.fn();
  let debounceTest = debounce(test)
  debounceTest()
  debounceTest()

  jest.runAllTimers();

  expect(test).toHaveBeenCalledTimes(1);
})
