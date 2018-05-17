# Immutable-changes

detects changes applied to 2 "immutable" objects, like 2 different redux states

## API
```js
import {detectChanges} from 'immutable-changes';

const state1 = {a, b, c};
const state2 = {...state1, d};

detectChanges(state1, state2) => {d: "created"}
```

detectChanges will return an object, containing keys of

## Licence
MIT
