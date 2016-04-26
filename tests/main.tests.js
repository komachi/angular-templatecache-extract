import test from 'ava';
import {readFile} from 'fs';
import Promise from 'bluebird';
import angularTemplatecacheExtract from '../src/index.js';

test('Should return html code from angular templateCache', t => {
  return Promise.promisify(readFile)(`${__dirname}/angularapp.js`)
    .then(file => {
      return angularTemplatecacheExtract(file.toString());
    })
    .then(result => {
      t.deepEqual(result, ['<div>Test1</div>', '<div>Test2</div>']);
    });
});
