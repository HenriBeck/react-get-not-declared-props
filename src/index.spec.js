// @flow

import test from 'ava';

import getNotDeclaredProps, { createGetNotDeclaredProps } from '.';

const Component = () => null;

Component.propTypes = { prop1: null };

test('remove all props which are defined inside propTypes', (t) => {
  t.deepEqual(
    getNotDeclaredProps({
      prop1: true,
      prop2: false,
    }, Component),
    { prop2: false },
  );
});

test('should work when no propTypes are declared on the component', (t) => {
  t.deepEqual(
    // $FlowFixMe: Test for when the component doesn't have propTypes
    getNotDeclaredProps({ prop1: true }, {}),
    { prop1: true },
  );
});

test('createGetNotDeclaredProps should return a function', (t) => {
  t.true(typeof createGetNotDeclaredProps([]) === 'function');
});

test('createGetNotDeclaredProps should return getNotDeclaredProps', (t) => {
  const newGetNotDeclaredProps = createGetNotDeclaredProps(['prop3']);

  t.deepEqual(
    newGetNotDeclaredProps({
      prop1: true,
      prop2: false,
      prop3: true,
    }, Component),
    { prop2: false },
  );
});

test('createGetNotDeclaredProps should return the same as getNotDeclaredProps', (t) => {
  const newGetNotDeclaredProps = createGetNotDeclaredProps([]);
  const props = {
    prop1: true,
    prop2: false,
  };

  t.deepEqual(
    newGetNotDeclaredProps(props, Component, []),
    getNotDeclaredProps(props, Component, []),
  );
});

