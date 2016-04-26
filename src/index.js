import esquery from 'esquery';
import esprima from 'esprima';
import Promise from 'bluebird';

export default js => {
  return new Promise(resolve => {
    let result = [];
    let content = esprima.parse(js);
    let tree = esquery(
      content,
      'CallExpression[callee.object.name="$templateCache"]' +
      '[callee.object.type="Identifier"]' +
      '[callee.property.name="put"]' +
      '[callee.property.type="Identifier"]'
    );
    Promise.map(tree, elem => {
      if (elem.arguments && elem.arguments[1] && elem.arguments[1].value) {
        result.push(elem.arguments[1].value);
      }
      return Promise.resolve();
    }).then(() => {
      resolve(result);
    });
  });
}
