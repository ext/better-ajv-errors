---
"@sidvind/better-ajv-errors": major
---

New `colors` option for colorizing output.

By default output will no longer have colors unless this option is set,
typically by using native `styleText` from `node:util` or a third-party
dependency such as `kleur` (the previous library used to set colors).

The recommended configuration using no third-party dependencies:

```js
import { styleText } from "node:util";
import betterAjvErrors from "@sidvind/better-ajv-errors";

const output = betterAjvErrors(schema, data, errors, {
  colors: {
    error: styleText.bind(undefined, "red"),
    property: styleText.bind(undefined, "magenta"),
    bold: styleText.bind(undefined, "bold"),
  },
});
```

To restore previous behaviour using `kleur`:

```js
import * as kleur from "kleur/colors";
import betterAjvErrors from "@sidvind/better-ajv-errors";

const output = betterAjvErrors(schema, data, errors, {
  colors: {
    error: kleur.red,
    property: kleur.magenta,
    bold: kleur.bold,
  },
});
```
