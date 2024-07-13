# TypeScript Monads

`ts-monads` is a TypeScript library providing Maybe and Either monads for functional programming in TypeScript.

## Installation

```bash
npm install @slesaryev/ts-monads
```

## Usage

### Maybe Monad

```typescript
import { Maybe } from "@slesaryev/ts-monads";

const maybeValue = Maybe(42);

const doubledValue = maybeValue.map((value) => value * 2).orElse(0);

console.log(doubledValue); // Output: 84
```

### Either Monad

```typescript
import { Either, Right, Left } from "@slesaryev/ts-monads";

const eitherValue = Either<string, number>(null, 42);

const result = eitherValue
  .map((value) => value + 10)
  .fold(
    (error) => `Error: ${error}`,
    (value) => `Value: ${value}`,
  );

console.log(result); // Output: Value: 52
```

## API

### `Maybe<T>`

`map<U>(fn: (value: T) => U | null | undefined): MaybeMonad<U>`
Transforms the contained value using a function.

`flatMap<U>(fn: (value: T) => MaybeMonad<U>): MaybeMonad<U>`
Flat-maps the contained value using a function that returns a MaybeMonad.

`orElse(defaultValue: T): T`
Returns the contained value if it exists; otherwise, returns a default value.

`orNull(): T | null`
Returns the contained value if it exists; otherwise, returns null.

### `Either<L, R>`

`map<U>(fn: (value: R) => U): EitherMonad<L, U>`
Transforms the right value using a function.

`mapLeft<U>(fn: (value: L) => U): EitherMonad<U, R>`
Transforms the left value using a function.

`flatMap<U>(fn: (value: R) => EitherMonad<L, U>): EitherMonad<L, U>`
Flat-maps the right value using a function that returns an EitherMonad.

`fold<UL, UR>(onLeft: (value: L) => UL, onRight: (value: R) => UR): UL | UR`
Applies a function based on whether the Either is Left or Right.

`orElse(defaultValue: R): R`
Returns the right value if it exists; otherwise, returns a default value.

`toString(): string`
Returns a string representation of the Either.

### License

MIT License. See [LICENSE](LICENSE) file for details.
