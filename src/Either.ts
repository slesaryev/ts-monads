/**
 * Custom error class for Either errors.
 */
export class EitherError extends Error {
  /**
   * Constructs an instance of EitherError.
   * @param message - The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = 'EitherError';
  }
}

/**
 * Represents a value of one of two possible types (a disjoint union).
 * @template L - The type of the left value.
 * @template R - The type of the right value.
 */
export class Either<L, R> {
  private left: L | null;
  private right: R | null;

  /**
   * Constructs an instance of Either monad.
   * @param left - The value of the left type, or null/undefined if not present.
   * @param right - The value of the right type, or null/undefined if not present.
   * @throws {EitherError} If both values are defined or both are undefined.
   */
  constructor(left: L | null | undefined, right: R | null | undefined) {
    if (Either.isDefined(left) && Either.isDefined(right)) {
      throw new EitherError('Either can\'t have both values defined.');
    }

    if (!Either.isDefined(left) && !Either.isDefined(right)) {
      throw new EitherError('Either requires a left or right value to be defined.');
    }

    this.left = left ?? null;
    this.right = right ?? null;
  }

  /**
   * Checks if a value is defined (not null or undefined).
   * @param value - The value to check.
   * @returns True if the value is defined, otherwise false.
   */
  private static isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
  }

  /**
   * Checks if the Either monad is holding a right value.
   * @returns True if holding a right value, otherwise false.
   */
  public isRight(): boolean {
    return Either.isDefined(this.right);
  }

  /**
   * Checks if the Either monad is holding a left value.
   * @returns True if holding a left value, otherwise false.
   */
  public isLeft(): boolean {
    return !this.isRight();
  }

  /**
   * Transforms the right value using a function, returning a new Either monad.
   * If the Either is left, it returns the left value unchanged.
   * @param fn - A function that transforms the right value.
   * @returns A new Either monad with the transformed right value, or the unchanged left value.
   */
  public map<U>(fn: (value: R) => U): Either<L, U> {
    return this.isRight() ? right<L, U>(fn(this.right as R)) : left<L, U>(this.left as L);
  }

  /**
   * Transforms the left value using a function, returning a new Either monad.
   * If the Either is right, it returns the right value unchanged.
   * @param fn - A function that transforms the left value.
   * @returns A new Either monad with the transformed left value, or the unchanged right value.
   */
  public mapLeft<U>(fn: (value: L) => U): Either<U, R> {
    return this.isRight() ? right<U, R>(this.right as R) : left<U, R>(fn(this.left as L));
  }

  /**
   * Flat-maps the right value using a function that returns an Either monad.
   * If the Either is left, it returns the left value unchanged.
   * @param fn - A function that transforms the right value into a new Either monad.
   * @returns A new Either monad resulting from the flat-mapping.
   */
  public flatMap<U>(fn: (value: R) => Either<L, U>): Either<L, U> {
    return this.isRight() ? fn(this.right as R) : left<L, U>(this.left as L);
  }

  /**
   * Matches the Either monad to execute one of two functions based on the current value.
   * @param onLeft - A function to execute if the Either is left.
   * @param onRight - A function to execute if the Either is right.
   * @returns The result of the executed function based on the Either state.
   */
  public fold<UL, UR>(onLeft: (value: L) => UL, onRight: (value: R) => UR): UL | UR {
    return this.isRight()
      ? onRight(this.right as R)
      : onLeft(this.left as L);
  }

  /**
   * Returns the right value if it exists, otherwise returns a default value.
   * @param defaultValue - The default value to return if the Either is left.
   * @returns The right value or the default value.
   */
  public getOrElse(defaultValue: R): R {
    return this.isRight() ? this.right as R : defaultValue;
  }

  /**
   * Returns the right value if it exists, otherwise throws an error.
   * @param error - The error to throw if the Either is left.
   * @returns The right value.
   * @throws The provided error if the Either is left.
   */
  public getOrThrow(error: Error): R {
    if (this.isLeft()) {
      throw error;
    }
    return this.right as R;
  }

  /**
   * Returns the right value if it exists; otherwise, computes a value using the provided supplier function.
   * @param supplier - A function that supplies a value if the Either is left.
   * @returns The right value or the value supplied by the supplier function.
   */
  public getOrElseGet(supplier: () => R): R {
    return this.isRight() ? this.right as R : supplier();
  }

  /**
   * Returns a string representation of the Either monad instance.
   * @returns A string indicating whether it is a Left or Right value.
   */
  public toString(): string {
    if (this.isRight()) {
      return `Right(${this.right})`;
    } else {
      return `Left(${this.left})`;
    }
  }
}

/**
 * Creates a Left Either monad with the provided value.
 * @param value - The value for the left side.
 * @returns An Either monad instance representing the left value.
 */
export const left = <L, R>(value: L): Either<L, R> => new Either<L, R>(value, null);

/**
 * Creates a Right Either monad with the provided value.
 * @param value - The value for the right side.
 * @returns An Either monad instance representing the right value.
 */
export const right = <L, R>(value: R): Either<L, R> => new Either<L, R>(null, value);

