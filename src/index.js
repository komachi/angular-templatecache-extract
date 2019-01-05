import esquery from 'esquery';
import espree from 'espree';
import Promise from 'bluebird';
import staticEval from 'static-eval';

function angularTemplatecacheExtract(js) {
  return new Promise((resolve) => {
    const result = [];
    const content = espree.parse(js);
    const tree = esquery(
      content,
      'CallExpression[callee.object.name="$templateCache"]'
      + '[callee.object.type="Identifier"]'
      + '[callee.property.name="put"]'
      + '[callee.property.type="Identifier"]',
    );
    Promise.map(tree, (elem) => {
      if (elem.arguments && elem.arguments[1]) {
        const ev = staticEval(elem.arguments[1]);
        if (ev) {
          result.push(ev);
        }
      }
      return Promise.resolve();
    }).then(() => {
      resolve(result);
    });
  });
}

export default angularTemplatecacheExtract;
