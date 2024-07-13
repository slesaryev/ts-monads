/**
 * Custom error class for Either errors.
 */
class EitherError extends Error {
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
export class EitherMonad<L, R> {
  private left: L | null;
  private right: R | null;

  /**
   * Constructs an instance of EitherMonad.
   * @param left - The value of the left type, or null/undefined if not present.
   * @param right - The value of the right type, or null/undefined if not present.
   * @throws {EitherError} If both values are defined or both are undefined.
   */
  constructor(left: L | null | undefined, right: R | null | undefined) {
    if (EitherMonad.isDefined(left) && EitherMonad.isDefined(right)) {
      throw new EitherError('Either can\'t have both values defined.');
    }

    if (!EitherMonad.isDefined(left) && !EitherMonad.isDefined(right)) {
      throw new EitherError('Either requires left or right value to be defined.');
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
   * Checks if the EitherMonad is holding a right value.
   * @returns True if holding a right value, otherwise false.
   */
  private isRight(): boolean {
    return EitherMonad.isDefined(this.right);
  }

  /**
   * Transforms the right value using a function, returning a new EitherMonad.
   * If the Either is left, it returns the left value unchanged.
   * @param fn - A function that transforms the right value.
   * @returns A new EitherMonad with the transformed right value, or the unchanged left value.
   */
  public map<U>(fn: (value: R) => U): EitherMonad<L, U> {
    return this.isRight() ? Right<L, U>(fn(this.right as R)) : Left<L, U>(this.left as L);
  }

  /**
   * Transforms the left value using a function, returning a new EitherMonad.
   * If the Either is right, it returns the right value unchanged.
   * @param fn - A function that transforms the left value.
   * @returns A new EitherMonad with the transformed left value, or the unchanged right value.
   */
  public mapLeft<U>(fn: (value: L) => U): EitherMonad<U, R> {
    return this.isRight() ? Right<U, R>(this.right as R) : Left<U, R>(fn(this.left as L));
  }

  /**
   * Flat-maps the right value using a function that returns an EitherMonad.
   * If the Either is left, it returns the left value unchanged.
   * @param fn - A function that transforms the right value into a new EitherMonad.
   * @returns A new EitherMonad resulting from the flat-mapping.
   */
  public flatMap<U>(fn: (value: R) => EitherMonad<L, U>): EitherMonad<L, U> {
    return this.isRight() ? fn(this.right as R) : Left<L, U>(this.left as L);
  }

  /**
   * Matches the EitherMonad to execute one of two functions based on the current value.
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
  public orElse(defaultValue: R): R {
    return this.isRight() ? this.right as R : defaultValue;
  }

  /**
   * Returns a string representation of the EitherMonad instance.
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
 * Creates an EitherMonad with a left or right value.
 * @param left - The left value, or null/undefined if not present.
 * @param right - The right value, or null/undefined if not present.
 * @returns An EitherMonad instance.
 */
export const Either = <L, R>(left: L | null | undefined, right: R | null | undefined): EitherMonad<L, R> => new EitherMonad<L, R>(left, right);

/**
 * Creates a Left EitherMonad with the provided value.
 * @param value - The value for the left side.
 * @returns An EitherMonad instance representing the left value.
 */
export const Left = <L, R>(value: L): EitherMonad<L, R> => new EitherMonad<L, R>(value, null);

/**
 * Creates a Right EitherMonad with the provided value.
 * @param value - The value for the right side.
 * @returns An EitherMonad instance representing the right value.
 */
export const Right = <L, R>(value: R): EitherMonad<L, R> => new EitherMonad<L, R>(null, value);
