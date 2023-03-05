# Da Daaam (Global Javascript Extended Types)

I don't even know, are there packages better

Just wanted to write mine, own

Soooo..

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

# Changelog

- New methods for Arrays (includesAny, includesAll, compute)
- New methods for Strings (includesAny, includesAll, capitalizeFirst)

## It's not All!

[Install](#installation) and check yourself!
