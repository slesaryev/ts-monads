import { Either, Left, Right } from './Either';

describe('EitherMonad', () => {
  it('should create a Right EitherMonad', () => {
    const either = Right<string, number>(42);
    expect(either.toString()).toBe('Right(42)');
  });

  it('should create a Left EitherMonad', () => {
    const either = Left<string, number>('Error');
    expect(either.toString()).toBe('Left(Error)');
  });

  it('should throw an error if both left and right are defined', () => {
    expect(() => Either('Error', 42)).toThrow('Either can\'t have both values defined.');
  });

  it('should throw an error if both left and right are undefined', () => {
    expect(() => Either(null, null)).toThrow('Either requires left or right value to be defined.');
  });

  it('should map over a Right EitherMonad', () => {
    const either = Right<string, number>(42);
    const mapped = either.map(value => value + 1);
    expect(mapped.toString()).toBe('Right(43)');
  });

  it('should not map over a Left EitherMonad', () => {
    const either = Left<string, number>('Error');
    const mapped = either.map(value => value + 1);
    expect(mapped.toString()).toBe('Left(Error)');
  });

  it('should mapLeft over a Left EitherMonad', () => {
    const either = Left<string, number>('Error');
    const mapped = either.mapLeft(value => `${value} occurred`);
    expect(mapped.toString()).toBe('Left(Error occurred)');
  });

  it('should not mapLeft over a Right EitherMonad', () => {
    const either = Right<string, number>(42);
    const mapped = either.mapLeft(value => `${value} occurred`);
    expect(mapped.toString()).toBe('Right(42)');
  });

  it('should flatMap over a Right EitherMonad', () => {
    const either = Right<string, number>(42);
    const flatMapped = either.flatMap(value => Right<string, number>(value + 1));
    expect(flatMapped.toString()).toBe('Right(43)');
  });

  it('should not flatMap over a Left EitherMonad', () => {
    const either = Left<string, number>('Error');
    const flatMapped = either.flatMap(value => Right<string, number>(value + 1));
    expect(flatMapped.toString()).toBe('Left(Error)');
  });

  it('should fold over a Right EitherMonad', () => {
    const either = Right<string, number>(42);
    const result = either.fold(
      left => `Error: ${left}`,
      right => `Value: ${right}`
    );
    expect(result).toBe('Value: 42');
  });

  it('should fold over a Left EitherMonad', () => {
    const either = Left<string, number>('Error');
    const result = either.fold(
      left => `Error: ${left}`,
      right => `Value: ${right}`
    );
    expect(result).toBe('Error: Error');
  });

  it('should return the right value with orElse', () => {
    const either = Right<string, number>(42);
    expect(either.orElse(100)).toBe(42);
  });

  it('should return the default value with orElse on a Left EitherMonad', () => {
    const either = Left<string, number>('Error');
    expect(either.orElse(100)).toBe(100);
  });
});

