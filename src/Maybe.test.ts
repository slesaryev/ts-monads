import { Maybe } from './Maybe';

describe('MaybeMonad', () => {
  it('should create a MaybeMonad with a value', () => {
    const maybe = Maybe(42);
    expect(maybe.orNull()).toBe(42);
  });

  it('should create a MaybeMonad with null', () => {
    const maybe = Maybe(null);
    expect(maybe.orNull()).toBeNull();
  });

  it('should map over the value inside the MaybeMonad', () => {
    const maybe = Maybe(42).map(x => x + 1);
    expect(maybe.orNull()).toBe(43);
  });

  it('should map over a Nothing and remain Nothing', () => {
    const maybe = Maybe(null).map(x => (x as unknown as number) + 1);
    expect(maybe.orNull()).toBeNull();
  });

  it('should flatMap over the value inside the MaybeMonad', () => {
    const maybe = Maybe(42).flatMap(x => Maybe(x + 1));
    expect(maybe.orNull()).toBe(43);
  });

  it('should flatMap over a Nothing and remain Nothing', () => {
    const maybe = Maybe(null).flatMap(x => Maybe((x as unknown as number) + 1));
    expect(maybe.orNull()).toBeNull();
  });

  it('should return the contained value with orElse', () => {
    const maybe = Maybe(42);
    expect(maybe.orElse(0)).toBe(42);
  });

  it('should return the default value with orElse when Nothing', () => {
    const maybe = Maybe(null);
    // @ts-expect-error
    expect(maybe.orElse(0)).toBe(0);
  });

  it('should correctly identify Nothing', () => {
    const maybe = Maybe(null);
    expect(maybe.orNull()).toBeNull();
  });

  it('should correctly identify Something', () => {
    const maybe = Maybe(42);
    expect(maybe.orNull()).toBe(42);
  });
});

