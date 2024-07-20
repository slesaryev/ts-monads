import { Either, left, right, EitherError } from '../src/Either';

describe('Either', () => {
  describe('Creation', () => {
    it('should create a Left Either', () => {
      const value = 'error';
      const result = left<string, number>(value);
      expect(result.toString()).toBe(`Left(${value})`);
      expect(result.isLeft()).toBe(true);
      expect(result.isRight()).toBe(false);
    });

    it('should create a Right Either', () => {
      const value = 42;
      const result = right<string, number>(value);
      expect(result.toString()).toBe(`Right(${value})`);
      expect(result.isRight()).toBe(true);
      expect(result.isLeft()).toBe(false);
    });

    it('should throw an error if both values are defined', () => {
      expect(() => new Either('error', 42)).toThrow(EitherError);
    });

    it('should throw an error if neither value is defined', () => {
      expect(() => new Either<string, number>(null, undefined)).toThrow(EitherError);
    });

    it('should create a Left Either with null for the right value', () => {
      const value = 'error';
      const result = new Either<string, number>(value, null);
      expect(result.toString()).toBe(`Left(${value})`);
    });

    it('should create a Right Either with null for the left value', () => {
      const value = 42;
      const result = new Either<string, number>(null, value);
      expect(result.toString()).toBe(`Right(${value})`);
    });

    it('should create a Left Either with undefined for the right value', () => {
      const value = 'error';
      const result = new Either<string, number>(value, undefined);
      expect(result.toString()).toBe(`Left(${value})`);
    });

    it('should create a Right Either with undefined for the left value', () => {
      const value = 42;
      const result = new Either<string, number>(undefined, value);
      expect(result.toString()).toBe(`Right(${value})`);
    });

    it('should create a Left Either with null for the right value and left value defined', () => {
      const value = 'error';
      const result = new Either<string, number>(value, null);
      expect(result.toString()).toBe(`Left(${value})`);
    });

    it('should create a Right Either with null for the left value and right value defined', () => {
      const value = 42;
      const result = new Either<string, number>(null, value);
      expect(result.toString()).toBe(`Right(${value})`);
    });
  });

  describe('map', () => {
    it('should map the right value', () => {
      const result = right<string, number>(42).map(x => x * 2);
      expect(result.toString()).toBe('Right(84)');
    });

    it('should not map the left value', () => {
      const result = left<string, number>('error').map(x => x * 2);
      expect(result.toString()).toBe('Left(error)');
    });
  });

  describe('mapLeft', () => {
    it('should map the left value', () => {
      const result = left<string, number>('error').mapLeft(x => x.toUpperCase());
      expect(result.toString()).toBe('Left(ERROR)');
    });

    it('should not map the right value', () => {
      const result = right<string, number>(42).mapLeft(x => x.toUpperCase());
      expect(result.toString()).toBe('Right(42)');
    });
  });

  describe('flatMap', () => {
    it('should flatMap the right value', () => {
      const result = right<string, number>(42).flatMap(x => right<string, number>(x * 2));
      expect(result.toString()).toBe('Right(84)');
    });

    it('should not flatMap the left value', () => {
      const result = left<string, number>('error').flatMap(x => right<string, number>(x * 2));
      expect(result.toString()).toBe('Left(error)');
    });
  });

  describe('fold', () => {
    it('should fold the left value', () => {
      const result = left<string, number>('error').fold(
        x => `Left: ${x}`,
        x => `Right: ${x}`
      );
      expect(result).toBe('Left: error');
    });

    it('should fold the right value', () => {
      const result = right<string, number>(42).fold(
        x => `Left: ${x}`,
        x => `Right: ${x}`
      );
      expect(result).toBe('Right: 42');
    });
  });

  describe('getOrElse', () => {
    it('should return the right value', () => {
      const result = right<string, number>(42).getOrElse(0);
      expect(result).toBe(42);
    });

    it('should return the default value if left', () => {
      const result = left<string, number>('error').getOrElse(0);
      expect(result).toBe(0);
    });
  });

  describe('getOrThrow', () => {
    it('should return the right value', () => {
      const result = right<string, number>(42).getOrThrow(new Error('error'));
      expect(result).toBe(42);
    });

    it('should throw an error if left', () => {
      expect(() => left<string, number>('error').getOrThrow(new Error('error'))).toThrow(Error);
    });
  });

  describe('getOrElseGet', () => {
    it('should return the right value', () => {
      const result = right<string, number>(42).getOrElseGet(() => 0);
      expect(result).toBe(42);
    });

    it('should return the supplied value if left', () => {
      const result = left<string, number>('error').getOrElseGet(() => 0);
      expect(result).toBe(0);
    });
  });
});
