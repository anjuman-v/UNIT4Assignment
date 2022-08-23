
const adding = require('./add');
const subtracting = require('./subtract');
const multiplying = require('./multiply')
const dividing = require('./divide')

var x = 500, y = 80;

console.log(adding.add(x, y));

console.log(subtracting.sub(x, y));

console.log(multiplying.mult(x, y));

console.log(dividing.div(x, y));
