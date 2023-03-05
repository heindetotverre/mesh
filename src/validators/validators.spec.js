import { describe, it, expect } from "vitest"
import {
  nonumber,
  email,
  notempty,
  specialchar,
  minlength,
  issamevalue,
  slug
} from '../validators/index'

describe('validators: utils/validators', () => {
  it('should validate nonumber', () => {
    expect(nonumber('11')).toBe(false)
    expect(nonumber('foo')).toBe(true)
  })

  it('should validate email', () => {
    expect(email('11')).toBe(false)
    expect(email('foo@bar.test')).toBe(true)
  })

  it('should validate notempty', () => {
    expect(notempty([])).toBe(false)
    expect(notempty({})).toBe(false)
    expect(notempty('')).toBe(false)
    expect(notempty(['foo', 'bar'])).toBe(true)
    expect(notempty({ foo: 'bar' })).toBe(true)
    expect(notempty('bar')).toBe(true)
    expect(notempty(0)).toBe(true)
    expect(notempty(1)).toBe(true)
  })

  it('should validate specialchar', () => {
    expect(specialchar('foo')).toBe(false)
    expect(specialchar('b@r')).toBe(true)
  })
  
  it('should validate minlength', () => {
    expect(minlength('foo')).toBe(false)
    expect(minlength('foobarfoo')).toBe(true)
  })

  it('should validate issamevalue', () => {
    expect(issamevalue('foo', 'bar')).toBe(false)
    expect(issamevalue('foo', 'foo')).toBe(true)
  })

  it('should validate slug', () => {
    expect(slug('foobar')).toBe(false)
    expect(slug('/foobar')).toBe(true)
  })
})