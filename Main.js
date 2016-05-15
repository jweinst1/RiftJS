#!/usr/bin/env node

/*
* Main File for Rift JS*/

//multi use collection object, combines sets, lists, and maps into a javascript array
//rift object
/*
 The elements of a rift belong to a part of a sort of ordered elements, a distinct set, and a mapping collection, all at the same time.
 However, inserted objects must be wrapped in an object of some type, or else they will be confused with keys
 */

var Rift = (function () {
    function Rift() {
        this.type = "rift";
        this.collection = [];
    }
    //small instance object to keep track of counts
    function Node(value) {
        this.count = 1;
        this.value = value;
    }
    Rift.prototype.repr = function() {
        return this.collection;
    };
    Rift.prototype.display = function() {
        return JSON.stringify(this.collection);
    };
    Rift.prototype.append = function(other) {
        this.collection.push(other);
        var elem = JSON.stringify(other);
        if(elem in this.collection) {
            this.collection[elem].count += 1;
        }
        else {
            this.collection[elem] = new Node(null);
        }
    };
    //appends all elements in a javascript array to the collection
    Rift.prototype.appendarr = function(arr) {
        for(var i=0;i<arr.length;i++) {
            this.append(arr[i]);
        }
    };
    //appends all elements of a rift object to the collection
    Rift.prototype.appendrift = function(rift) {
        var collec = rift.repr();
        for(var i=0;i<collec.length;i++) {
            this.append(collec[i]);
        }
    };
    //appends new element to the first index, or left side
    Rift.prototype.appendleft = function(other) {
        this.collection.unshift(other);
        var elem = JSON.stringify(other);
        if(elem in this.collection) {
            this.collection[elem].count += 1;
        }
        else {
            this.collection[elem] = new Node(null);
        }
    };
    //non destructive inserting method
    Rift.prototype.insert = function(other, index) {
        index = index % this.collection.length;
        if(isNaN(index)) return false;
        this.collection.splice(index, 0, other);
        var elem = JSON.stringify(other);
        if(elem in this.collection) {
            this.collection[elem].count += 1;
        }
        else {
            this.collection[elem] = new Node(null);
        }
    };
    //O(1) determination of existence
    Rift.prototype.contains = function(other) {
        return JSON.stringify(other) in this.collection;
    };
    Rift.prototype.count = function(other) {
        var elem = JSON.stringify(other);
        if(elem in this.collection) {
            return this.collection[other].count;
        }
        else {
            return 0;
        }
    };
    //keeps track of numerability and doesn't delete if multiple elements
    Rift.prototype.pop = function() {
        var popped = this.collection.pop();
        var popstr = JSON.stringify(popped);
        if(popstr in this.collection) {
            if(this.collection[popstr].count > 1) {
                this.collection[popstr].count -= 1;
                return popped;
            }
            else {
                delete this.collection[popstr];
                return popped;
            }
        }
    };
    Rift.prototype.remove = function(other) {
        var removed = JSON.stringify(other);
        for(var i=0;i<this.collection.length;i++) {
            if(JSON.stringify(this.collection[i]) === removed) {
                this.collection.splice(i, 1);
                if(this.collection[removed].count > 1) {
                    this.collection[removed] -= 1;
                    return true;
                }
                else {
                    delete this.collection[removed];
                    return true;
                }
            }
        }
    };
    /*Deletes all occurences of other in the collection*/
    Rift.prototype.removeall = function(other) {
        var removed = JSON.stringify(other);
        for(var i=0;i<this.collection.length;i++) {
            if(JSON.stringify(this.collection[i]) === removed) {
                this.collection(i, 1);
            }
        }
        delete this.collection[removed];
    };
    //sets a value if an only if that value is already present in the collection
    Rift.prototype.setvalue = function(key, val) {
        var stringed = JSON.stringify(key);
        if(stringed in this.collection) {
            this.collection[stringed].value = val;
        }
    };
    /*appends a new object, and sets a new value associated with it. Does not append if key alredy present*/
    Rift.prototype.set = function(key, val) {
        var stringed = JSON.stringify(key);
        if(stringed in this.collection) {
            this.collection[stringed].value = val;
        }
        else {
            this.collection[stringed] = new Node(val);
            this.collection.push(key);
        }
    };
    /*attempts to retrieve the value associated with a key. If no value, returns null
     if the key does not exist, will return false*/
    Rift.prototype.get = function(key) {
        var stringed = JSON.stringify(key);
        if(stringed in this.collection) {
            return this.collection[stringed].value;
        }
        else {
            return false;
        }
    };
    Rift.prototype.indexOf = function(item) {
        var stringed = JSON.stringify(item);
        //optimization step where if the item is not in the collection, it will not search.
        if(!(stringed in this.collection)) return false;
        for(var i=0;i<this.collection.length;i++) {
            if(JSON.stringify(this.collection[i]) === stringed) {
                return i;
            }
        }
        return false;
    };
    /*Returns the numerical indexed value, with the input of a number type.
     Returns false if the collection is empty, or the input is NaN*/
    Rift.prototype.index = function(num) {
        num = num % this.collection.length;
        if(isNaN(num)) {
            return false;
        }
        else {
            return this.collection[num];
        }
    };
    Rift.prototype.equals = function(other) {
        var result = JSON.stringify(this) === JSON.stringify(other);
        return result;
    };
    //gets the length of entire collection, not just indexed items
    Rift.prototype.length = function() {
        var total = 0;
        for(var key in this.collection) {
            total += 1;
        }
        return total;
    };
    Rift.prototype.slice = function(start, end) {
        end = end % this.collection.length;
        start = start % this.collection.length;
        if(isNaN(start) || isNaN(end)) {
            return false;
        }
        else {
            return this.collection.slice(start, end);
        }
    };
    /*Prints all keys and indexes in the collection*/
    Rift.prototype.printKeys = function() {
        for(var key in this.collection) {
            console.log(key);
        }
    };
    /*Prints all ordered elements in the collection*/
    Rift.prototype.printOrdered = function() {
        for(var i=0;i<this.collection.length;i++) {
            console.log(this.collection[i]);
        }
    };
    /*returns an array slice containing only the ordered elements of the collection*/
    Rift.prototype.orderedCollection = function() {
        return this.collection.slice(0, this.collection.length);
    };
    return Rift;
})();

exports.Rift = Rift;
