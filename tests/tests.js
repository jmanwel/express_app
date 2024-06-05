import assert from 'assert';
import { greet } from "../utils.js";
   
it('should return -1 when the value is not present', function () {
  assert.equal([1, 2, 3].indexOf(4), -1);
});

it('Basic', () => {
  assert.equal(1, 1);
});

it('Test function greet', () => {
  assert.equal(greet("Juan"), "Hello, Juan!");
});