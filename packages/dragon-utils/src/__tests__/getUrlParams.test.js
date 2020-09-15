import { getUrlParams } from '../getUrlParams'

test('getUrlParams', () => {
  expect(getUrlParams('errcode','','www.haha.com?errcode=111')).toBe('111')
  expect(getUrlParams('errcode','','www.haha.com?aaa=111222&errcode=111')).toBe('111')
  expect(getUrlParams('errcode','','www.haha.com?aaa=111222&errcode=111#/haha/&errcode=555')).toBe('555')
  expect(getUrlParams('errcode','dddd','www.haha.com?errcode=')).toBe('')
  expect(getUrlParams('errcode')).toBe('')
  expect(getUrlParams()).toBe('')
})
