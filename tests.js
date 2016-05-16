var Rift = require("./Main").Rift;

exports.initialize = function(test) {
    var a = new Rift(),
        collec = a.repr();

    test.notEqual(collec, null);
    test.equal(collec.length, 0);
    test.done();
};

exports.display = function(test) {
    var a = new Rift();
    a.append({a:2});

    test.equal(a.display(), '[{"a":2}]');
    test.done();
};

exports.append = function(test) {
    var a = new Rift(),
        elem = JSON.stringify({a:2});

    // test appending one element
    a.append({a:2});
    test.equal(a.repr().length, 1);

    // test appending same element
    a.append({a:2});
    test.equal(a.repr()[elem].count, 2);

    test.done();
};

exports.appendarr = function(test) {
    var a = new Rift(),
        b = [1, 2, 3];
    a.appendarr(b);

    test.equal(a.repr().length, 4);
    test.done();
};

exports.appendrift = function(test) {
    var a = new Rift(),
        b = new Rift();
    a.append({a:2});
    b.append({b:3});
    a.appendrift(b);

    test.equal(a.repr().length, 2);
    test.done();
};

exports.appendleft = function(test) {
    var a = new Rift();

    // test appending one element
    a.appendleft({a:2});
    test.equal(a.repr().length, 1);
    test.equal(JSON.stringify(a.repr()[0]), JSON.stringify({a:2}));

    // test appending another element
    a.appendleft({b:3});
    test.equal(a.repr().length, 2);
    test.equal(JSON.stringify(a.repr()[0]), JSON.stringify({b:3}));

    test.done();
};

exports.insert = function(test) {
    var a = new Rift();

    // add random index
    test.equal(a.insert({a:2}, 10), false);

    // add upon existing element
    a.append({a:2});
    a.insert({a:2}, 0);
    var elem = JSON.stringify({a:2});
    test.equal(a.repr()[elem].count, 2);

    test.done();
};

exports.contains = function(test) {
    var a = new Rift();
    a.append({a:2});

    test.equal(a.contains({a:2}), true);
    test.equal(a.contains({b:3}), false);

    test.done();
};

exports.count = function(test) {
    var a = new Rift();
    a.append({a:2});
    a.append({a:2});

    // check existing element
    test.equal(a.count({a:2}), 2);

    // check nonexistent element
    test.equal(a.count({c:2}), 0);

    test.done();
};

exports.pop = function(test) {
    var a = new Rift();
    a.append({b:2});
    a.append({a:2});
    a.append({a:2});

    // pop multiple elements
    var elem = JSON.stringify({a:2});
    test.equal(JSON.stringify(a.pop()), elem);
    test.equal(a.repr()[elem].count, 1);

    test.done();
};

exports.remove = function(test) {
    var a = new Rift();
    a.append({a:2});
    a.append({a:2});

    // remove nonexistent element
    test.equal(a.remove({c:3}), false);

    // remove multiple elements
    var elem = JSON.stringify({a:2});
    test.equal(a.remove({a:2}), true);
    test.equal(a.repr()[elem].count, 1);
    test.equal(a.remove({a:2}), true);
    test.equal(a.repr().length, 0);

    test.done();
};

exports.setvalue = function(test) {
    var a = new Rift(),
        elem = JSON.stringify({a:2});
    a.append({a:2});
    a.setvalue({a:2}, 10);

    test.equal(a.repr()[elem].value, 10);
    test.done();
};

exports.set = function(test) {
    var a = new Rift(),
        elem = JSON.stringify({a:2});
    a.set({a:2}, 10);

    test.equal(a.repr().length, 1);
    test.equal(a.repr()[elem].value, 10);

    test.done();
};

exports.get = function(test) {
    var a = new Rift();
    a.set({a:2}, 10);

    test.equal(a.get({a:2}), 10);
    test.equal(a.get({c:3}), false);
    test.done();

};

exports.indexOf = function(test) {
    var a = new Rift();
    a.append({a:2});
    a.append({b:4});

    test.equal(a.indexOf({a:2}), 0);
    test.equal(a.indexOf({b:4}), 1);
    test.equal(a.indexOf({c:6}), false);

    test.done();
};

exports.index = function(test) {
    var a = new Rift(),
        elem = JSON.stringify({a:2});
    a.append({a:2});

    test.equal(JSON.stringify({a:2}), elem);
    a.remove({a:2});
    test.equal(a.index(0), false);

    test.done();
};

exports.equals = function(test) {
    var a = new Rift(),
        b = new Rift();

    a.append({a:2});
    b.append({a:2});
    test.equal(a.equals(b), true);
    b.append({b:2});
    test.equal(a.equals(b), false);

    test.done();
};

exports.length = function(test) {
    var a = new Rift();
    a.append({a:2});

    test.equal(a.length(), 2);
    test.done();
};

exports.slice = function(test) {
    var a = new Rift();
    a.append({a:2});
    a.append({b:3});
    a.append({c:4});

    test.equal(a.repr().length, 3);
    test.done();
}
