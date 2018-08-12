// parser-test.js
import { expect } from 'chai';
const debug = require('debug')('kitchen:parser');

import parse from './parser';
import testCases from './parser-test-data.js';

describe.only('recruitScript parser', () => {
  testCases.forEach(testCase => {
	  describe('parse()', () => {
	    it(`Parses the ${testCase.name} script`, () => {
	      expect(() => parse(testCase.text))
	      .to.not.throw;
	    });

	    it(`Checks the output of the ${testCase.name} script`, () => {
	    	const { errs, survey } = parse(testCase.text);
	      expect(errs.length)
	      .to.be.equal(0);
	    });
	  });
  });
});
