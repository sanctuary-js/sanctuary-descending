<a href="https://github.com/fantasyland/fantasy-land"><img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="75" height="75" align="left"></a>

# sanctuary-descending

Descending is a simple container type: a value of type `Descending a`
always contains exactly one value, of type `a`.

Values of type `Descending a` sort in the reverse order of values of
type `a`.

Descending differs from [Identity][] only in the behaviour of its
`fantasy-land/lte` method.

```javascript
> S.sort ([5, 1, 2])
[1, 2, 5]

> S.sort ([Descending (5), Descending (1), Descending (2)])
[Descending (5), Descending (2), Descending (1)]

> S.sortBy (Descending) ([5, 1, 2])
[5, 2, 1]
```

`Descending a` satisfies the following [Fantasy Land][] specifications:

```javascript
> const Useless = require ('sanctuary-useless')

> const isTypeClass = x =>
.   type (x) === 'sanctuary-type-classes/TypeClass@1'

> S.map (k => k + ' '.repeat (16 - k.length) +
.             (Z[k].test (Descending (Useless)) ? '\u2705   ' :
.              Z[k].test (Descending (['foo'])) ? '\u2705 * ' :
.              /* otherwise */                    '\u274C   '))
.       (S.keys (S.unchecked.filter (isTypeClass) (Z)))
[ 'Setoid          ✅ * ',  // if ‘a’ satisfies Setoid
. 'Ord             ✅ * ',  // if ‘a’ satisfies Ord
. 'Semigroupoid    ❌   ',
. 'Category        ❌   ',
. 'Semigroup       ✅ * ',  // if ‘a’ satisfies Semigroup
. 'Monoid          ❌   ',
. 'Group           ❌   ',
. 'Filterable      ❌   ',
. 'Functor         ✅   ',
. 'Bifunctor       ❌   ',
. 'Profunctor      ❌   ',
. 'Apply           ✅   ',
. 'Applicative     ✅   ',
. 'Chain           ✅   ',
. 'ChainRec        ✅   ',
. 'Monad           ✅   ',
. 'Alt             ❌   ',
. 'Plus            ❌   ',
. 'Alternative     ❌   ',
. 'Foldable        ✅   ',
. 'Traversable     ✅   ',
. 'Extend          ✅   ',
. 'Comonad         ✅   ',
. 'Contravariant   ❌   ' ]
```

#### <a name="Descending" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L136">`Descending :: a -⁠> Descending a`</a>

Descending's sole data constructor. Additionally, it serves as the
Descending [type representative][].

```javascript
> Descending (42)
Descending (42)
```

#### <a name="Descending.fantasy-land/of" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L160">`Descending.fantasy-land/of :: a -⁠> Descending a`</a>

`of (Descending) (x)` is equivalent to `Descending (x)`.

```javascript
> S.of (Descending) (42)
Descending (42)
```

#### <a name="Descending.fantasy-land/chainRec" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L173">`Descending.fantasy-land/chainRec :: ((a -⁠> c, b -⁠> c, a) -⁠> Descending c, a) -⁠> Descending b`</a>

```javascript
> Z.chainRec (
.   Descending,
.   (next, done, x) => Descending (x >= 0 ? done (x * x) : next (x + 1)),
.   8
. )
Descending (64)

> Z.chainRec (
.   Descending,
.   (next, done, x) => Descending (x >= 0 ? done (x * x) : next (x + 1)),
.   -8
. )
Descending (0)
```

#### <a name="Descending.prototype.@@show" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L196">`Descending#@@show :: Showable a => Descending a ~> () -⁠> String`</a>

`show (Descending (x))` is equivalent to
`'Descending (' + show (x) + ')'`.

```javascript
> show (Descending (['foo', 'bar', 'baz']))
'Descending (["foo", "bar", "baz"])'
```

#### <a name="Descending.prototype.fantasy-land/equals" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L209">`Descending#fantasy-land/equals :: Setoid a => Descending a ~> Descending a -⁠> Boolean`</a>

`Descending (x)` is equal to `Descending (y)` [iff][] `x` is equal to `y`
according to [`Z.equals`][].

```javascript
> S.equals (Descending ([1, 2, 3])) (Descending ([1, 2, 3]))
true

> S.equals (Descending ([1, 2, 3])) (Descending ([3, 2, 1]))
false
```

#### <a name="Descending.prototype.fantasy-land/lte" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L225">`Descending#fantasy-land/lte :: Ord a => Descending a ~> Descending a -⁠> Boolean`</a>

`Descending (x)` is less than or equal to `Descending (y)` [iff][]
`y` is less than or equal to `x` according to [`Z.lte`][] (note the
transposition of `x` and `y`).

```javascript
> S.sort ([Descending (5), Descending (1), Descending (2)])
[Descending (5), Descending (2), Descending (1)]
```

#### <a name="Descending.prototype.fantasy-land/concat" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L239">`Descending#fantasy-land/concat :: Semigroup a => Descending a ~> Descending a -⁠> Descending a`</a>

`concat (Descending (x)) (Descending (y))` is equivalent to
`Descending (concat (x) (y))`.

```javascript
> S.concat (Descending ([1, 2, 3])) (Descending ([4, 5, 6]))
Descending ([1, 2, 3, 4, 5, 6])
```

#### <a name="Descending.prototype.fantasy-land/map" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L252">`Descending#fantasy-land/map :: Descending a ~> (a -⁠> b) -⁠> Descending b`</a>

`map (f) (Descending (x))` is equivalent to `Descending (f (x))`.

```javascript
> S.map (Math.sqrt) (Descending (64))
Descending (8)
```

#### <a name="Descending.prototype.fantasy-land/ap" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L264">`Descending#fantasy-land/ap :: Descending a ~> Descending (a -⁠> b) -⁠> Descending b`</a>

`ap (Descending (f)) (Descending (x))` is equivalent to
`Descending (f (x))`.

```javascript
> S.ap (Descending (Math.sqrt)) (Descending (64))
Descending (8)
```

#### <a name="Descending.prototype.fantasy-land/chain" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L277">`Descending#fantasy-land/chain :: Descending a ~> (a -⁠> Descending b) -⁠> Descending b`</a>

`chain (f) (Descending (x))` is equivalent to `f (x)`.

```javascript
> S.chain (n => Descending (n + 1)) (Descending (99))
Descending (100)
```

#### <a name="Descending.prototype.fantasy-land/reduce" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L289">`Descending#fantasy-land/reduce :: Descending a ~> ((b, a) -⁠> b, b) -⁠> b`</a>

`reduce (f) (x) (Descending (y))` is equivalent to `f (x) (y)`.

```javascript
> S.reduce (S.concat) ([1, 2, 3]) (Descending ([4, 5, 6]))
[1, 2, 3, 4, 5, 6]
```

#### <a name="Descending.prototype.fantasy-land/traverse" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L301">`Descending#fantasy-land/traverse :: Applicative f => Descending a ~> (TypeRep f, a -⁠> f b) -⁠> f (Descending b)`</a>

`traverse (_) (f) (Descending (x))` is equivalent to
`map (Descending) (f (x))`.

```javascript
> S.traverse (Array) (x => [x + 1, x + 2, x + 3]) (Descending (100))
[Descending (101), Descending (102), Descending (103)]
```

#### <a name="Descending.prototype.fantasy-land/extend" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L314">`Descending#fantasy-land/extend :: Descending a ~> (Descending a -⁠> b) -⁠> Descending b`</a>

`extend (f) (Descending (x))` is equivalent to
`Descending (f (Descending (x)))`.

```javascript
> S.extend (S.reduce (S.add) (1)) (Descending (99))
Descending (100)
```

#### <a name="Descending.prototype.fantasy-land/extract" href="https://github.com/sanctuary-js/sanctuary-descending/blob/v2.1.0/index.js#L327">`Descending#fantasy-land/extract :: Descending a ~> () -⁠> a`</a>

`extract (Descending (x))` is equivalent to `x`.

```javascript
> S.extract (Descending (42))
42
```

[Fantasy Land]:             https://github.com/fantasyland/fantasy-land/tree/v4.0.1
[Identity]:                 https://github.com/sanctuary-js/sanctuary-identity
[`Z.equals`]:               https://github.com/sanctuary-js/sanctuary-type-classes/tree/v12.1.0#equals
[`Z.lte`]:                  https://github.com/sanctuary-js/sanctuary-type-classes/tree/v12.1.0#lte
[iff]:                      https://en.wikipedia.org/wiki/If_and_only_if
[type representative]:      https://github.com/fantasyland/fantasy-land/tree/v4.0.1#type-representatives
