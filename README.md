# RiftsJS

####The JavaScript Array transformed.

RiftsJS is a Node package that implements the Rift data structure, an extended `Javascript` array that combines the functionality of a Hashmap, Hashset, and Array or ordered collection into a single object. `RiftJS` does this by manipulating the fact that in JavaScript, arrays are implemented as objects, not fixed size memory, as in languages such as `Java` or `C`.

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

To install RiftsJS, just use the Node Package Manager.

```
npm install riftsjs
```

##Usage

A Rift object has many methods that can be used with it, to make storage of data and elements quick and easy.

First, you have to require the package, then create a Rift object.

```
var rjs = require("riftjs");

var a = new rjs.Rift();
```
####`.repr()`:

Returns the internal array, refered to as `this.collection`.

####`.display()`:

Returns the stringified version of the entire Rift object.

####`.append(other)`:

Appends other to the end of the rift, and also stringifies the input to be checked for inclusion in constant time.

####`.appendarr(arr)`:

Does the same as the append method but does so for each member of a javascript array.

####`.appendleft(elem)`:

Does the same as append but `unshift()`s the element to be placed at the zero position of the array.

####`.insert(other, index)`:

Does the same as append but inserts the `other` argument at specific position in the collection. The index is always rounded to it's remainder of the ordered length of the collection. This means putting `60`, as the index with a collection of 3 elements will insert at the 0 position.

If index is `NaN`, this method will not insert and return  `false`.

####`.contains(other)`:

Checks if the `JSON.stringify()` of other is in the Rift. Very fast and easy to check for inclusion while returning ordered collection functionality.

####`.count(other)`:

In a rift, every element string key has a `Node()` object attached to it, that holds a corrsepsonding value. As elements as appended, a count is always kept track along the way for each element. This makes counting elements an `O(1)` operation.

####`.pop()`:

Removes and returns the last inserted element into the rift. Note: If an element no longer exists in the ordered portion of the array, it is also deleted from the hashed portion.

####`.remove(other)`:

Removes one of `other` from the rift. Does not return the removed element.

####`.removeall(other)`:

Removes all occurences of `other` in the rift.

####`.setval(key, val)`:

If a `key` is already in the rift, this will set the value on it, to be referenced with `get()`. Does nothing if the key is not present in the rift.

####`.set(key, val)`:

Sets a value to a key in the rift. If the key is not in the rift, it appends it to the collection. Example.

```
   var a = new Rift();
   a.set({a:1}, 4)
   a
=> { type: 'rift', collection: [ { a: 1 }, '{"a":1}': { count: 1, value: 4 } ] }
   a.get({a:1})
   4
```

####`.get(key)`:

Retrieves the value for a key in the rift. If the key is not in the rift, returns false.

####`.indexOf(item)`:

Gets the first numerical index of `item` in the rift. If `item` is not in the collection, returns false.

####`.index(num)`:

Takes a number as an input, and returns the element at that numerical index. If index is NaN, returns false.

####`.equals(other)`:

Checks if the current Rift is equal to the stringified version of another Rift. Order is taken into consideration for the comparison.

####`.length()`:

Returns the length of all keys in the rift, both numerical indexes, and string keys.

####`.slice(start, end)`:

Returns an array slice on the ordered collection portion of the rift.

####`.printKeys()`:

Prints all the keys of the entire rift. Uses `console.log`

####`.printOrdered()`:

Prints only the numerical indexes used in the ordered collection of the rift.

####`.orderedCollection()`:

Returns an array of the entire ordered collection of the Rift.

##Example Usage

```
   var a = new Rift();
   a
=> { type: 'rift', collection: [] }
   a.append({f:3})
   a.append({a:3})
   a.append({a:2})
   a
=> { type: 'rift',
  collection: 
   [ { f: 3 },
     { a: 3 },
     { a: 2 },
     '{"f":3}': { count: 1, value: null },
     '{"a":3}': { count: 1, value: null },
     '{"a":2}': { count: 1, value: null } ] }
   a.contains({f:3})
=> true
   a.contains({f:2})
=> false
   a.contains({a:2})
=> true
   a.remove({a:3})
=> true
   a
=> { type: 'rift',
  collection: 
   [ { f: 3 },
     { a: 2 },
     '{"f":3}': { count: 1, value: null },
     '{"a":2}': { count: 1, value: null } ] }
   a.remove({a:2})
=> true
   a.insert({A:55}, 1)
   a
=> { type: 'rift',
  collection: 
   [ { A: 55 },
     { f: 3 },
     '{"f":3}': { count: 1, value: null },
     '{"A":55}': { count: 1, value: null } ] }
```

##License

RiftJS is MIT licensed an open sourced.