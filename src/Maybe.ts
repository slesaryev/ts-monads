/**
 * Represents a value that may or may not be present.
 * @template T - The type of the value contained within the MaybeMonad.
 */
export class MaybeMonad<T> {
  /**
   * Constructs an instance of MaybeMonad.
   * @param value - The value to be contained, or null/undefined if absent.
   */
  public constructor(private readonly value: T | null | undefined = null) { }

  /**
   * Checks if the MaybeMonad contains no value (i.e., is Nothing).
   * @returns True if the MaybeMonad is Nothing, otherwise false.
   */
  private isNothing(): boolean {
    return this.value === null || this.value === undefined;
  }

  /**
   * Transforms the contained value using a function, returning a new MaybeMonad.
   * If the Maybe is Nothing, it returns a Nothing.
   * @param fn - A function that transforms the contained value.
   * @returns A new MaybeMonad with the transformed value, or Nothing if the original was Nothing.
   */
  public map<U>(fn: (value: T) => U | null | undefined): MaybeMonad<U> {
    return new MaybeMonad<U>(this.isNothing() ? null : fn(this.value as T));
  }

  /**
   * Flat-maps the contained value using a function that returns a MaybeMonad.
   * If the Maybe is Nothing, it returns a Nothing.
   * @param fn - A function that transforms the contained value into a new MaybeMonad.
   * @returns A new MaybeMonad resulting from the flat-mapping.
   */
  public flatMap<U>(fn: (value: T) => MaybeMonad<U>): MaybeMonad<U> {
    return this.isNothing() ? new MaybeMonad<U>() : fn(this.value as T);
  }

  /**
   * Returns the contained value if it exists; otherwise, returns a default value.
   * @param value - The default value to return if the Maybe is Nothing.
   * @returns The contained value or the default value.
   */
  public orElse(value: T): T {
    return this.isNothing() ? value : (this.value as T);
  }

  /**
   * Returns the contained value if it exists; otherwise, returns null.
   * @returns The contained value or null if the Maybe is Nothing.
   */
  public orNull(): T | null {
    return this.isNothing() ? null : this.value as T;
  }
}

/**
 * Creates a MaybeMonad with the provided value, or a Nothing if the value is null or undefined.
 * @param v - The value to be contained, or null/undefined if absent.
 * @returns An instance of MaybeMonad containing the provided value or Nothing.
 */
export const Maybe = <T>(v: T | null | undefined): MaybeMonad<T> => new MaybeMonad(v);
