# Da Daaam (Global Javascript Extended Types)

I don't even know, are there packages better

Just wanted to write mine, own

Soooo..

# [Check Last Update](#changelog)

# Types

- $object
- $Array
- $string
- $number

I gave them some methods which I use too often

# Installation

```sh
npm install datypes
```

Or

```sh
yarn add datypes
```

# Get Started

First we have to initialize global function $

**You have to run this function in your main file only once**

```ts
import initTypes from "datypes"

initTypes()
```

Now We can define variables

**Let's do**

```ts
const person = $({
  name: "Dann",
  age: 18,
  hobbies: $(["_", "_"]),
})
```

So what can we actually do?

```ts
person.$empty() // false
person.$forEach((value, key) => console.log(`${key} : `, value))
const cloneWithoutRefs = person.$clone()
person.$hasSome("age", "hobbies", "girlfriend") // true
person.$hasAll("age", "hobbies", "girlfriend") // false

person.hobbies.remove(0) // ["_"] removes it's element
person.hobbies.log() // logs value
```

Types now are global

```ts
let age: $number
let person: $object<MyInterface>
```

Also array method **.readonly()**

```ts
const arr = $([1, 2, 3]) // type - number[]
const readonlyArr = arr.readonly() // type - readonly number[]
```

# $ArrayLength

```ts
const numbers = $.$ArrayLength(5, (i) => i) // [0, 1, 2, 3, 4]

const randomDigits = $.$ArrayLength(4, () => $.randomNumber(0, 9)) // [4, 6, 7, 1]
```

# Changelog

v1.3.0

- Removed static methodes from $number, $string, $object and $Array
- Added new static methods for global function $
  - is$number (whether or not value is an instance of $number)
  - is$string (whether or not value is an instance of $string)
  - is$object (whether or not value is an instance of $object)
  - is$Array (whether or not value is an instance of $Array)
  - randomNumber (returns random number between a range)
  - [$ArrayLength](#arraylength) (returns an $Array with spec. length by custom map)

v1.2.3

- New methods for Arrays (includesAny, includesAll, compute)
- New methods for Strings (includesAny, includesAll, capitalizeFirst)

## It's not All!

[Install](#installation) and check yourself!
