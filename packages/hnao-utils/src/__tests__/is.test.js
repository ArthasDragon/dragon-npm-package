import { isPlainObj, isPhone } from '../Is'

test('getUrlParams', () => {
  expect(isPlainObj({})).toBeTruthy()
  expect(isPhone('18333333333')).toBeTruthy()
  expect(isPhone('1833333333')).toBeFalsy()
})
