import assert       from 'assert';

import laws         from 'fantasy-laws';
import jsc          from 'jsverify';
import test         from 'oletus';
import show         from 'sanctuary-show';
import Z            from 'sanctuary-type-classes';
import type         from 'sanctuary-type-identifiers';
import Useless      from 'sanctuary-useless';

import Descending   from '../index.js';


//    DescendingArb :: Arbitrary a -> Arbitrary (Descending a)
const DescendingArb = arb => arb.smap (Descending, Z.extract, show);

//    NonEmpty :: Arbitrary a -> Arbitrary (NonEmpty a)
const NonEmpty = arb => jsc.suchthat (arb, x => not (empty (x)));

//    NumberArb :: Arbitrary Number
const NumberArb = jsc.oneof (
  jsc.constant (NaN),
  jsc.constant (-Infinity),
  jsc.constant (Number.MIN_SAFE_INTEGER),
  jsc.constant (-10000),
  jsc.constant (-9999),
  jsc.constant (-0.5),
  jsc.constant (-0),
  jsc.constant (0),
  jsc.constant (0.5),
  jsc.constant (9999),
  jsc.constant (10000),
  jsc.constant (Number.MAX_SAFE_INTEGER),
  jsc.constant (Infinity),
);

//    empty :: Monoid m => m -> Boolean
const empty = m => Z.equals (m, Z.empty (m.constructor));

//    not :: Boolean -> Boolean
const not = b => !b;

//    testLaws :: String -> Object -> Object -> Undefined
const testLaws = typeClass => laws => arbs => {
  (Object.keys (laws)).forEach (name => {
    eq (laws[name].length) (arbs[name].length);
    const prettyName = name.replace (/[A-Z]/g, c => ' ' + c.toLowerCase ());
    test (`${typeClass} laws \x1B[2m›\x1B[0m ${prettyName}`,
          laws[name] (...arbs[name]));
  });
};

//    eq :: a -> b -> Undefined !
function eq(actual) {
  assert.strictEqual (arguments.length, eq.length);
  return function eq$1(expected) {
    assert.strictEqual (arguments.length, eq$1.length);
    assert.strictEqual (show (actual), show (expected));
    assert.strictEqual (Z.equals (actual, expected), true);
  };
}


test ('metadata', () => {
  eq (typeof Descending) ('function');
  eq (Descending.name) ('Descending');
  eq (Descending.length) (1);
});

test ('@@type', () => {
  eq (type (Descending (0))) ('sanctuary-descending/Descending@1');
  eq (type.parse (type (Descending (0))))
     ({namespace: 'sanctuary-descending', name: 'Descending', version: 1});
});

test ('@@show', () => {
  eq (show (Descending (['foo', 'bar', 'baz'])))
     ('Descending (["foo", "bar", "baz"])');
  eq (show (Descending (Descending (Descending (-0)))))
     ('Descending (Descending (Descending (-0)))');
});

test ('Setoid', () => {
  eq (Z.Setoid.test (Descending (Useless))) (false);
  eq (Z.Setoid.test (Descending (/(?:)/))) (true);
});

test ('Ord', () => {
  eq (Z.Ord.test (Descending (Useless))) (false);
  eq (Z.Ord.test (Descending (/(?:)/))) (false);
  eq (Z.Ord.test (Descending (0))) (true);
});

test ('Semigroupoid', () => {
  eq (Z.Semigroupoid.test (Descending ([]))) (false);
});

test ('Category', () => {
  eq (Z.Category.test (Descending ([]))) (false);
});

test ('Semigroup', () => {
  eq (Z.Semigroup.test (Descending (Useless))) (false);
  eq (Z.Semigroup.test (Descending (0))) (false);
  eq (Z.Semigroup.test (Descending ([]))) (true);
});

test ('Monoid', () => {
  eq (Z.Monoid.test (Descending ([]))) (false);
});

test ('Group', () => {
  eq (Z.Group.test (Descending ([]))) (false);
});

test ('Filterable', () => {
  eq (Z.Filterable.test (Descending ([]))) (false);
});

test ('Functor', () => {
  eq (Z.Functor.test (Descending (Useless))) (true);
});

test ('Bifunctor', () => {
  eq (Z.Bifunctor.test (Descending ([]))) (false);
});

test ('Profunctor', () => {
  eq (Z.Profunctor.test (Descending (Math.sqrt))) (false);
});

test ('Apply', () => {
  eq (Z.Apply.test (Descending (Useless))) (true);
});

test ('Applicative', () => {
  eq (Z.Applicative.test (Descending (Useless))) (true);
});

test ('Chain', () => {
  eq (Z.Chain.test (Descending (Useless))) (true);
});

test ('ChainRec', () => {
  eq (Z.ChainRec.test (Descending (Useless))) (true);
});

test ('Monad', () => {
  eq (Z.Monad.test (Descending (Useless))) (true);
});

test ('Alt', () => {
  eq (Z.Alt.test (Descending ([]))) (false);
});

test ('Plus', () => {
  eq (Z.Plus.test (Descending ([]))) (false);
});

test ('Alternative', () => {
  eq (Z.Alternative.test (Descending ([]))) (false);
});

test ('Foldable', () => {
  eq (Z.Foldable.test (Descending (Useless))) (true);
});

test ('Traversable', () => {
  eq (Z.Traversable.test (Descending (Useless))) (true);
});

test ('Extend', () => {
  eq (Z.Extend.test (Descending (Useless))) (true);
});

test ('Comonad', () => {
  eq (Z.Comonad.test (Descending (Useless))) (true);
});

test ('Contravariant', () => {
  eq (Z.Contravariant.test (Descending (Math.sqrt))) (false);
});

testLaws ('Setoid') (laws.Setoid) ({
  reflexivity: [
    DescendingArb (NumberArb),
  ],
  symmetry: [
    DescendingArb (NumberArb),
    DescendingArb (NumberArb),
  ],
  transitivity: [
    DescendingArb (NumberArb),
    DescendingArb (NumberArb),
    DescendingArb (NumberArb),
  ],
});

testLaws ('Ord') (laws.Ord) ({
  totality: [
    DescendingArb (NumberArb),
    DescendingArb (NumberArb),
  ],
  antisymmetry: [
    DescendingArb (NumberArb),
    DescendingArb (NumberArb),
  ],
  transitivity: [
    DescendingArb (NumberArb),
    DescendingArb (NumberArb),
    DescendingArb (NumberArb),
  ],
});

testLaws ('Semigroup') (laws.Semigroup (Z.equals)) ({
  associativity: [
    DescendingArb (jsc.string),
    DescendingArb (jsc.string),
    DescendingArb (jsc.string),
  ],
});

testLaws ('Functor') (laws.Functor (Z.equals)) ({
  identity: [
    DescendingArb (NumberArb),
  ],
  composition: [
    DescendingArb (NumberArb),
    jsc.constant (Math.sqrt),
    jsc.constant (Math.abs),
  ],
});

testLaws ('Apply') (laws.Apply (Z.equals)) ({
  composition: [
    DescendingArb (jsc.constant (Math.sqrt)),
    DescendingArb (jsc.constant (Math.abs)),
    DescendingArb (NumberArb),
  ],
});

testLaws ('Applicative') (laws.Applicative (Z.equals, Descending)) ({
  identity: [
    DescendingArb (NumberArb),
  ],
  homomorphism: [
    jsc.constant (Math.abs),
    NumberArb,
  ],
  interchange: [
    DescendingArb (jsc.constant (Math.abs)),
    NumberArb,
  ],
});

testLaws ('Chain') (laws.Chain (Z.equals)) ({
  associativity: [
    DescendingArb (jsc.asciistring),
    jsc.constant (s => Descending (s.replace (/[A-Z]/g, ''))),
    jsc.constant (s => Descending (s.toUpperCase ())),
  ],
});

testLaws ('ChainRec') (laws.ChainRec (Z.equals, Descending)) ({
  equivalence: [
    jsc.constant (x => x >= 0),
    jsc.constant (x => Descending (x + 1)),
    jsc.constant (x => Descending (x * x)),
    jsc.integer,
  ],
});

testLaws ('Monad') (laws.Monad (Z.equals, Descending)) ({
  leftIdentity: [
    jsc.constant (x => Descending ([x, x])),
    DescendingArb (NumberArb),
  ],
  rightIdentity: [
    DescendingArb (NumberArb),
  ],
});

testLaws ('Foldable') (laws.Foldable (Z.equals)) ({
  associativity: [
    jsc.constant (Z.concat),
    jsc.string,
    DescendingArb (jsc.string),
  ],
});

testLaws ('Traversable') (laws.Traversable (Z.equals)) ({
  naturality: [
    jsc.constant (Array),
    jsc.constant (Descending),
    jsc.constant (xs => Descending (xs[0])),
    DescendingArb (NonEmpty (jsc.array (NumberArb))),
  ],
  identity: [
    jsc.constant (Array),
    DescendingArb (NumberArb),
  ],
  composition: [
    jsc.constant (Array),
    jsc.constant (Descending),
    DescendingArb (jsc.array (DescendingArb (NumberArb))),
  ],
});

testLaws ('Extend') (laws.Extend (Z.equals)) ({
  associativity: [
    DescendingArb (jsc.integer),
    jsc.constant (descending => Z.extract (descending) + 1),
    jsc.constant (descending => Math.pow (Z.extract (descending), 2)),
  ],
});

testLaws ('Comonad') (laws.Comonad (Z.equals)) ({
  leftIdentity: [
    DescendingArb (NumberArb),
  ],
  rightIdentity: [
    DescendingArb (NumberArb),
    jsc.constant (descending => Math.pow (Z.extract (descending), 2)),
  ],
});
