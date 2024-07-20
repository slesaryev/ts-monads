import { either, left, right } from '../src/Either';

describe('Either monad', () => {
  it('should create a Right either monad', () => {
    const val = right<string, number>(42);
    expect(val.toString()).toBe('Right(42)');
  });

  it('should create a Left either monad', () => {
    const either = left<string, number>('Error');
    expect(either.toString()).toBe('Left(Error)');
  });

  it('should throw an error if both left and right are defined', () => {
    expect(() => either('Error', 42)).toThrow('Either can\'t have both values defined.');
  });

  it('should throw an error if both left and right are undefined', () => {
    expect(() => either(null, null)).toThrow('Either requires left or right value to be defined.');
  });

  it('should map over a Right eitherMonad', () => {
    const val = right<string, number>(42);
    const mapped = val.map(value => value + 1);
    expect(mapped.toString()).toBe('Right(43)');
  });

  it('should not map over a Left eitherMonad', () => {
    const err = left<string, number>('Error');
    const mapped = err.map(value => value + 1);
    expect(mapped.toString()).toBe('Left(Error)');
  });

  it('should mapLeft over a Left eitherMonad', () => {
    const err = left<string, number>('Error');
    const mapped = err.mapLeft(value => `${value} occurred`);
    expect(mapped.toString()).toBe('Left(Error occurred)');
  });

  it('should not mapLeft over a Right eitherMonad', () => {
    const val = right<string, number>(42);
    const mapped = val.mapLeft(value => `${value} occurred`);
    expect(mapped.toString()).toBe('Right(42)');
  });

  it('should flatMap over a Right eitherMonad', () => {
    const val = right<string, number>(42);
    const flatMapped = val.flatMap(value => right<string, number>(value + 1));
    expect(flatMapped.toString()).toBe('Right(43)');
  });

  it('should not flatMap over a Left eitherMonad', () => {
    const err = left<string, number>('Error');
    const flatMapped = err.flatMap(value => right<string, number>(value + 1));
    expect(flatMapped.toString()).toBe('Left(Error)');
  });

  it('should fold over a Right eitherMonad', () => {
    const val = right<string, number>(42);
    const result = val.fold(
      left => `Error: ${left}`,
      right => `Value: ${right}`
    );
    expect(result).toBe('Value: 42');
  });

  it('should fold over a Left eitherMonad', () => {
    const err = left<string, number>('Error');
    const result = err.fold(
      left => `Error: ${left}`,
      right => `Value: ${right}`
    );
    expect(result).toBe('Error: Error');
  });

  it('should return the right value with orElse', () => {
    const val = right<string, number>(42);
    expect(val.orElse(100)).toBe(42);
  });

  it('should return the default value with orElse on a Left eitherMonad', () => {
    const err = left<string, number>('Error');
    expect(err.orElse(100)).toBe(100);
  });
});

