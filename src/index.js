import esquery from 'esquery';
import esprima from 'esprima';
import Promise from 'bluebird';
import staticEval from 'static-eval';

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
      if (elem.arguments && elem.arguments[1]) {
        result.push(staticEval(elem.arguments[1]));
      }
      return Promise.resolve();
    }).then(() => {
      resolve(result);
    });
  });
}
