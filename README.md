# niranjan
Immutable data library for react js with simpler interface.

Interface is same as https://github.com/mquan/cortex with immutability added.

# Quickstart
Creat a new Niranjan object, note that we are not using the new keyword.
```javascript
var rawData = {a: 100, b:{c: 200} };

var data = Niranjan(rawData);
```



Get value of a
```javascript

data.a.getValue()
```

Get value of b
```javascript

data.b.getValue() // {c:200}
```



Get value of c

```javascript
data.b.c.getValue()
```

When we change the value of any node, then all the ancestor node changes, others dont change. Lets change the value of c

```javascript
var old_a = data.a;
var old_b = data.b;
var old_c = data.c;

data.b.c.set(201);

data.b == old_b //false
data.b.c == old_c //false
data.a == old_a //true, this doesnt change as its not an ancestor of c

```

Binding an event whenever any data changes

```javascript
data.onUpdate(function(){
  //write code here to re-render your entire React page
})
```

