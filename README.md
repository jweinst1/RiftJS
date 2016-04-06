# RiftJS

####The JavaScript Array transformed.

RiftJS is a Node package that implements the Rift data structure, an extended `Javascript` array that combines the functionality of a Hashmap, Hashset, and Array or ordered collection into a single object. `RiftJS` does this by manipulating the fact that in JavaScript, arrays are implemented as objects, not fixed size memory, as in languages such as `Java` or `C`.

####Arrays

In `JavaScript`, arrays are specialized objects that act as ordered collections, they arrange elements in a specific order, with accepting multiple elements of a particular type. However, arrays also have the object functionality of setting and getting values. Let's look at this example.

```
   var x = [1, 2, 3];
   x.length
=> 3
   x["a"] = 3
=> 3
   x
=> [ 1, 2, 3, a: 3 ]
   x.length
=> 3
   x.pop()
=> 3
   x
=> [ 1, 2, a: 3 ]
```

Here, although we assigned a string value to a number in the array, the `length` property only refers to the elements in the ordered part of the array, not the ones assigned with the `<name>[key] = <value>` format. Furthermore, the array methods, such as `pop()`, `push()`, and more only effect the ordered portion of arrays. RiftJS takes advantage of this aspect, by using the non-ordered portion of arrays to store string values of objects and inserted elements. This allows the `in` operator in javascript to check for elements in an array in one step time, as opposed to linear time.

However, there is one acception to this separation. If a key in an array, is ever set with the string of an already present numerical index, that new value is placed as part of the ordered collection in the array. Here is an example.

```
   var x = [1, 2, 3]
   x
=> [ 1, 2, 3 ]
   x["1"] = 55;
=> 55
   x
=> [ 1, 55, 3 ]
   x.pop()
=> 3
   x.pop()
=> 55
```

This is why, the only objects Rifts cannot work with are straight javascript numbers. Numbers must be wrapped in an object, array, or other form to be stringified properly.

##Installation

To install RiftJS, just use the Node Package Manager.

```
npm install riftjs
```

##Usage

A Rift object has many methods that can be used with it, to make storage of data and elements quick and easy.

First, you have to require the package, then create a Rift object.

```
var rjs = require("riftjs");

var a = new rjs.Rift();
```
####`.repr()`:

####`.display()`:

####`.append(other)`:

####`.appendarr(arr)`:

####`.appendleft(elem)`:

####`.insert(other, index)`:

####`.contains(other)`:

####`.count(other)`:

####`.pop()`:

####`.remove(other)`:

####`.removeall(other)`:

####`.setval(key, val)`:

####`.set(key, val)`:

####`.get(key)`:

####`.indexOf(item)`:

####`.index(num)`:

####`.equals(other)`:

####`.length()`:

####`.slice(start, end)`:

####`.printKeys()`:

####`.printOrdered()`:

####`.orderedCollection()`:

##Example Usage

```

```