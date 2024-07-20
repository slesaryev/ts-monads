
import { Maybe, maybe } from '../src/Maybe';

// Test data
const someValue = 5;
const anotherValue = 10;
const defaultValue = 99;
const error = new Error('Error occurred');

describe('Maybe Monad', () => {
  test('Maybe.just creates a Maybe with a value', () => {
    const just = Maybe.just(someValue);
    expect(just.isJust()).toBe(true);
    expect(just.getOrElse(defaultValue)).toBe(someValue);
  });

  test('Maybe.nothing creates a Maybe with no value', () => {
    const nothing = Maybe.nothing();
    expect(nothing.isJust()).toBe(false);
    expect(nothing.getOrElse(defaultValue)).toBe(defaultValue);
  });

  test('maybe function creates a Maybe with a value or nothing', () => {
    const just = maybe(someValue);
    const nothing = maybe(null);

    expect(just.isJust()).toBe(true);
    expect(nothing.isJust()).toBe(false);
  });

  test('map transforms the value if present', () => {
    const just = Maybe.just(someValue);
    const mapped = just.map(value => value * 2);

    expect(mapped.isJust()).toBe(true);
    expect(mapped.getOrElse(defaultValue)).toBe(someValue * 2);
  });

  test('map does nothing if the Maybe is Nothing', () => {
    const nothing = Maybe.nothing<number>();
    const mapped = nothing.map(value => value * 2);

    expect(mapped.isJust()).toBe(false);
    expect(mapped.getOrElse(defaultValue)).toBe(defaultValue);
  });

  test('flatMap transforms the value using a function that returns a Maybe', () => {
    const just = Maybe.just(someValue);
    const flatMapped = just.flatMap(value => Maybe.just(value * 2));

    expect(flatMapped.isJust()).toBe(true);
    expect(flatMapped.getOrElse(defaultValue)).toBe(someValue * 2);
  });

  test('flatMap does nothing if the Maybe is Nothing', () => {
    const nothing = Maybe.nothing<number>();
    const flatMapped = nothing.flatMap(value => Maybe.just(value * 2));

    expect(flatMapped.isJust()).toBe(false);
    expect(flatMapped.getOrElse(defaultValue)).toBe(defaultValue);
  });

  test('getOrElse returns the contained value if it exists', () => {
    const just = Maybe.just(someValue);
    expect(just.getOrElse(defaultValue)).toBe(someValue);
  });

  test('getOrElse returns the default value if the Maybe is Nothing', () => {
    const nothing = Maybe.nothing<number>();
    expect(nothing.getOrElse(defaultValue)).toBe(defaultValue);
  });

  test('getOrNull returns the contained value or null', () => {
    const just = Maybe.just(someValue);
    const nothing = Maybe.nothing<number>();

    expect(just.getOrNull()).toBe(someValue);
    expect(nothing.getOrNull()).toBeNull();
  });

  test('getOrUndefined returns the contained value or undefined', () => {
    const just = Maybe.just(someValue);
    const nothing = Maybe.nothing<number>();

    expect(just.getOrUndefined()).toBe(someValue);
    expect(nothing.getOrUndefined()).toBeUndefined();
  });

  test('getOrThrow returns the value if it exists', () => {
    const just = Maybe.just(someValue);
    expect(just.getOrThrow(error)).toBe(someValue);
  });

  test('getOrThrow throws an error if the Maybe is Nothing', () => {
    const nothing = Maybe.nothing<number>();
    expect(() => nothing.getOrThrow(error)).toThrow(error);
  });

  test('getOrElseGet returns the contained value or the value from the supplier', () => {
    const just = Maybe.just(someValue);
    const nothing = Maybe.nothing<number>();

    expect(just.getOrElseGet(() => anotherValue)).toBe(someValue);
    expect(nothing.getOrElseGet(() => anotherValue)).toBe(anotherValue);
  });
});

