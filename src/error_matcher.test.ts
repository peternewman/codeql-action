
import test from 'ava';

import { namedMatchersForTesting } from './error_matcher';

/*
NB We test the regexes for all the matchers against example log output snippets.
*/

test('noSourceCodeFound matches against example javascript output', async t => {
  t.assert(testErrorMatcher("noSourceCodeFound", `
  2020-09-07T17:39:53.9050522Z [2020-09-07 17:39:53] [build] Done extracting /opt/hostedtoolcache/CodeQL/0.0.0-20200630/x64/codeql/javascript/tools/data/externs/web/ie_vml.js (3 ms)
  2020-09-07T17:39:53.9051849Z [2020-09-07 17:39:53] [build-err] No JavaScript or TypeScript code found.
  2020-09-07T17:39:53.9052444Z [2020-09-07 17:39:53] [build-err] No JavaScript or TypeScript code found.
  2020-09-07T17:39:53.9251124Z [2020-09-07 17:39:53] [ERROR] Spawned process exited abnormally (code 255; tried to run: [/opt/hostedtoolcache/CodeQL/0.0.0-20200630/x64/codeql/javascript/tools/autobuild.sh])
  `));
});

function testErrorMatcher(matcherName: string, logSample: string): boolean {

  const regex = namedMatchersForTesting[matcherName] ? namedMatchersForTesting[matcherName][1] : null;

  if (regex) {
    return regex.test(logSample);
  } else {
    if (namedMatchersForTesting[matcherName]) {
      throw new Error(`Cannot test matcher ${matcherName} with null regex`);
    } else {
      throw new Error(`Unknown matcher ${matcherName}`);
    }
  }

}
