import test from 'ava';

import getNotDeclaredProps, { createGetNotDeclaredProps } from './get-not-declared-props';

const instance = {
  propTypes: {
    firstProp: true,
    secondProp: false,
  },
};

const props = {
  firstProp: true,
  thirdProp: false,
};

test('remove all props', (t) => {
  const props = {
    firstProp: true,
    thirdProp: false,
  };

  t.deepEqual(getNotDeclaredProps(props, instance), { thirdProp: false });
});

test('createGetNotDeclaredProps should return a function', (t) => {
  t.true(typeof createGetNotDeclaredProps() === 'function');
});

test('createGetNotDeclaredProps should return getNotDeclaredProps', (t) => {
  const newGetNotDeclaredProps = createGetNotDeclaredProps('thirdProp');

  t.deepEqual(newGetNotDeclaredProps(props, instance), {});
});

