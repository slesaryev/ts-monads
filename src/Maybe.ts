/**
 * Represents a value that may or may not be present.
 * @template T - The type of the value contained within the Maybe.
 */
export class Maybe<T> {
  /**
   * Constructs an instance of Maybe.
   * @param value - The value to be contained, or null/undefined if absent.
   */
  constructor(private readonly value: T | null | undefined = null) { }

  /**
   * Creates a Maybe with a present value (Just).
   * @param value - The value to be contained.
   * @returns A Maybe instance containing the provided value.
   */
  public static just<U>(value: U): Maybe<U> {
    return new Maybe(value);
  }

  /**
   * Creates a Maybe with no value (Nothing).
   * @returns A Maybe instance representing Nothing.
   */
  public static nothing<U>(): Maybe<U> {
    return new Maybe<U>(null);
  }

  /**
   * Checks if the Maybe contains no value (i.e., is Nothing).
   * @returns True if the Maybe is Nothing, otherwise false.
   */
  private isNothing(): boolean {
    return this.value === null || this.value === undefined;
  }

  /**
   * Checks if the Maybe contains a value.
   * @returns True if the Maybe contains a value, otherwise false.
   */
  public isJust(): boolean {
    return !this.isNothing();
  }

  /**
   * Transforms the contained value using a function, returning a new Maybe.
   * If the Maybe is Nothing, it returns a Nothing.
   * @param fn - A function that transforms the contained value.
   * @returns A new Maybe with the transformed value, or Nothing if the original was Nothing.
   */
  public map<U>(fn: (value: T) => U): Maybe<U> {
    return this.isNothing() ? Maybe.nothing() : Maybe.just(fn(this.value as T));
  }

  /**
   * Flat-maps the contained value using a function that returns a Maybe.
   * If the Maybe is Nothing, it returns a Nothing.
   * @param fn - A function that transforms the contained value into a new Maybe.
   * @returns A new Maybe resulting from the flat-mapping.
   */
  public flatMap<U>(fn: (value: T) => Maybe<U>): Maybe<U> {
    return this.isNothing() ? Maybe.nothing() : fn(this.value as T);
  }

  /**
   * Returns the contained value if it exists; otherwise, returns a default value.
   * @param value - The default value to return if the Maybe is Nothing.
   * @returns The contained value or the default value.
   */
  public getOrElse(value: T): T {
    return this.isNothing() ? value : (this.value as T);
  }

  /**
   * Returns the contained value if it exists; otherwise, returns null.
   * @returns The contained value or null if the Maybe is Nothing.
   */
  public getOrNull(): T | null {
    return this.isNothing() ? null : this.value as T;
  }

  /**
   * Returns the contained value if it exists; otherwise, returns undefined.
   * @returns The contained value or undefined if the Maybe is Nothing.
   */
  public getOrUndefined(): T | undefined {
    return this.isNothing() ? undefined : this.value as T;
  }

  /**
   * Returns the contained value if it exists; otherwise, throws an error.
   * @param error - The error to throw if the Maybe is Nothing.
   * @returns The contained value.
   * @throws The provided error if the Maybe is Nothing.
   */
  public getOrThrow(error: Error): T {
    if (this.isNothing()) {
      throw error;
    }
    return this.value as T;
  }

  /**
   * Returns the contained value if it exists; otherwise, computes a value using the provided supplier function.
   * @param supplier - A function that supplies a value if the Maybe is Nothing.
   * @returns The contained value or the value supplied by the supplier function.
   */
  public getOrElseGet(supplier: () => T): T {
    return this.isNothing() ? supplier() : this.value as T;
  }
}

/**
 * Creates a Maybe with the provided value, or a Nothing if the value is null or undefined.
 * @param v - The value to be contained, or null/undefined if absent.
 * @returns An instance of Maybe containing the provided value or Nothing.
 */
export const maybe = <T>(v: T | null | undefined): Maybe<T> =>
  v !== null && v !== undefined ? Maybe.just(v) : Maybe.nothing<T>();
