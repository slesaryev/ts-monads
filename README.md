# TypeScript Monads

`ts-monads` is a TypeScript library providing following monads for functional programming in TypeScript:

- [Maybe](#maybe-monad-usage-examples)
  - [Creating `Maybe` Instance](#creating-a-maybe-instance)
  - [Using the `maybe` Function](#using-the-maybe-function)
  - [Checking if `Maybe` Contains a Value](#checking-if-maybe-contains-a-value)
  - [Transforming Values with `map`](#transforming-values-with-map)
  - [Flat-Mapping Values with `flatMap`](#flat-mapping-values-with-flatmap)
  - [Retrieving Values](#retrieving-values)
- [Either](#either-monad-usage-examples)
  - [Creating Either Instances](#creating-either-instances)
  - [Accessing Values](#accessing-values)
  - [Transforming Values](#transforming-values)
  - [Error Handling](#error-handling)
  - [Utility Functions](#utility-functions)

## Installation

```bash
npm install @slesaryev/ts-monads
```

```bash
yarn add @slesaryev/ts-monads
```

## Usage

### `Maybe` Monad Usage Examples

The `Maybe` monad represents a value that may or may not be present. It provides methods for handling and transforming the value if it exists, or dealing with the absence of a value.

#### Importing the `Maybe` Monad

```typescript
import { Maybe, maybe } from "@slesaryev/ts-monads";
```

#### Creating a `Maybe` Instance

```typescript
// Creating a Maybe with a present value
const justFive = Maybe.just(5);

// Creating a Maybe with no value
const nothing = Maybe.nothing<number>();
```

#### Using the `maybe` Function

```typescript
// Creating a Maybe with a value or Nothing
const maybeFive = maybe(5); // Just(5)
const maybeNull = maybe(null); // Nothing
const maybeUndefined = maybe(); // Nothing
```

#### Checking if `Maybe` Contains a Value

```typescript
console.log(justFive.isJust()); // true
console.log(nothing.isJust()); // false
```

#### Transforming Values with `map`

```typescript
// Transforming the contained value
const doubled = justFive.map((value) => value * 2);
console.log(doubled.getOrElse(0)); // 10

// Mapping on a Nothing
const nothingDoubled = nothing.map((value) => value * 2);
console.log(nothingDoubled.getOrElse(0)); // 0
```

#### Flat-Mapping Values with `flatMap`

```typescript
// Flat-mapping with a function returning a Maybe
const flatMapped = justFive.flatMap((value) => Maybe.just(value * 2));
console.log(flatMapped.getOrElse(0)); // 10

// Flat-mapping on a Nothing
const nothingFlatMapped = nothing.flatMap((value) => Maybe.just(value * 2));
console.log(nothingFlatMapped.getOrElse(0)); // 0
```

#### Retrieving Values

```typescript
// Get the value or a default value
console.log(justFive.getOrElse(0)); // 5
console.log(nothing.getOrElse(0)); // 0

// Get the value or null
console.log(justFive.getOrNull()); // 5
console.log(nothing.getOrNull()); // null

// Get the value or undefined
console.log(justFive.getOrUndefined()); // 5
console.log(nothing.getOrUndefined()); // undefined

// Get the value or throw an error
try {
  console.log(justFive.getOrThrow(new Error("No value present"))); // 5
} catch (e) {
  console.error(e);
}

try {
  console.log(nothing.getOrThrow(new Error("No value present")));
} catch (e) {
  console.error(e); // Error: No value present
}

// Get the value or use a supplier function
console.log(justFive.getOrElseGet(() => 0)); // 5
console.log(nothing.getOrElseGet(() => 0)); // 0
```

### `Either` Monad Usage Examples

#### Creating Either Instances

```typescript
import { Either, left, right, EitherError } from "@slesaryev/ts-monads";

// Create a Left instance
const leftValue: Either<string, number> = left("An error occurred");

// Create a Right instance
const rightValue: Either<string, number> = right(42);
```

#### Accessing Values

```typescript
import { Either, left, right } from "@slesaryev/ts-monads";

const eitherValue: Either<string, number> = right(42);

// Using `fold` to handle both cases
const result = eitherValue.fold(
  (left) => `Left value: ${left}`, // Handles the Left case
  (right) => `Right value: ${right}`, // Handles the Right case
);

console.log(result); // Output: "Right value: 42"

// Using `orElse` to get the Right value or provide a default
const rightValue = eitherValue.orElse(0);
console.log(rightValue); // Output: 42

// Attempting to get a Left value (will always be null if it's Right)
const leftValue = eitherValue.orElse("default");
console.log(leftValue); // Output: "default" (because it's a Right)
```

#### Transforming Values

```typescript
import { Either, left, right } from "@slesaryev/ts-monads";

// Transform the Right value
const transformedRight: Either<string, string> = right(42).map(
  (value) => `Number: ${value}`,
);
console.log(transformedRight.toString()); // Output: "Right(Number: 42)"

// Transform the Left value
const transformedLeft: Either<string, number> = left("Error").mapLeft(
  (value) => `Error: ${value}`,
);
console.log(transformedLeft.toString()); // Output: "Left(Error: Error)"

// Flat-map the Right value
const flatMappedRight: Either<string, string> = right(42).flatMap((value) =>
  right(`Number: ${value}`),
);
console.log(flatMappedRight.toString()); // Output: "Right(Number: 42)"

// Flat-map the Left value
const flatMappedLeft: Either<string, number> = left("Error").flatMap((value) =>
  right(value + 1),
);
console.log(flatMappedLeft.toString()); // Output: "Left(Error)"
```

#### Error Handling

```typescript
import { Either, left, right, EitherError } from "@slesaryev/ts-monads";

try {
  // Attempt to create an Either with both values defined (will throw error)
  const faultyEither = new Either("left", "right");
} catch (error) {
  if (error instanceof EitherError) {
    console.error(error.message); // Output: "Either can't have both values defined."
  } else {
    console.error("Unexpected error:", error);
  }
}

// Using `getOrThrow` to get the Right value or throw an error
const value = right(42).getOrThrow(new Error("Value not present"));
console.log(value); // Output: 42
```

#### Utility Functions

```typescript
import { Either, left, right } from "@slesaryev/ts-monads";

// Create an Either instance with utility functions
const eitherFromUtility = (value: number | null): Either<string, number> =>
  value !== null ? right(value) : left("Value is null");

// Example usage
const eitherValue = eitherFromUtility(100);
console.log(eitherValue.toString()); // Output: "Right(100)"
```

### License

MIT License. See [LICENSE](LICENSE) file for details.
