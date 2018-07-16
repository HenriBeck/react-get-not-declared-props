// @flow

// eslint-disable-next-line max-classes-per-file
import test from 'ava';
import React from 'react';

import getNotDeclaredProps, { createGetNotDeclaredProps } from '.';

const FunctionalComponentWithoutPropTypes = () => null;

const FunctionalComponentWithPropTypes = () => null;

FunctionalComponentWithPropTypes.propTypes = { declaredProp: null };

class ClassComponentWithoutPropTypes extends React.Component<{ declaredProp: string }> {}

class ClassComponentWithPropTypes extends React.Component<{ declaredProp: string }> {}

ClassComponentWithPropTypes.propTypes = { declaredProp: null };

test('createGetNotDeclaredProps should return a function', (t) => {
  t.true(typeof createGetNotDeclaredProps([]) === 'function');
});

test('Function Component without propTypes: should return the props', (t) => {
  const notDeclaredProps = getNotDeclaredProps({
    declaredProp: true,
    notDeclaredProp: false,
  }, FunctionalComponentWithoutPropTypes);

  t.deepEqual(notDeclaredProps, {
    declaredProp: true,
    notDeclaredProp: false,
  });
});

test('Function Component with propTypes: should only return the not declared props', (t) => {
  const notDeclaredProps = getNotDeclaredProps({
    declaredProp: true,
    notDeclaredProp: false,
  }, FunctionalComponentWithPropTypes);

  t.deepEqual(notDeclaredProps, { notDeclaredProp: false });
});

test('Function Component without propTypes: should accepts additional props to be omitted', (t) => {
  const notDeclaredProps = getNotDeclaredProps({
    declaredProp: true,
    notDeclaredProp: false,
  }, FunctionalComponentWithPropTypes, ['declaredProps', 'notDeclaredProp']);

  t.deepEqual(notDeclaredProps, {});
});

test('Function Component with propTypes: should accepts additional props to be omitted', (t) => {
  const notDeclaredProps = getNotDeclaredProps({
    declaredProp: true,
    notDeclaredProp: false,
  }, FunctionalComponentWithPropTypes, ['notDeclaredProp']);

  t.deepEqual(notDeclaredProps, {});
});

test('Class Component without propTypes: should return the props', (t) => {
  const notDeclaredProps = getNotDeclaredProps({
    declaredProp: true,
    notDeclaredProp: false,
  }, ClassComponentWithoutPropTypes);

  t.deepEqual(notDeclaredProps, {
    declaredProp: true,
    notDeclaredProp: false,
  });
});

test('Class Component with propTypes: should only return the not declared props', (t) => {
  const notDeclaredProps = getNotDeclaredProps({
    declaredProp: true,
    notDeclaredProp: false,
  }, ClassComponentWithPropTypes);

  t.deepEqual(notDeclaredProps, { notDeclaredProp: false });
});

test('Class Component without propTypes: should accepts additional props to be omitted', (t) => {
  const notDeclaredProps = getNotDeclaredProps({
    declaredProp: true,
    notDeclaredProp: false,
  }, ClassComponentWithoutPropTypes, ['declaredProp', 'notDeclaredProp']);

  t.deepEqual(notDeclaredProps, {});
});

test('Class Component with propTypes: should accepts additional props to be omitted', (t) => {
  const notDeclaredProps = getNotDeclaredProps({
    declaredProp: true,
    notDeclaredProp: false,
  }, ClassComponentWithPropTypes, ['notDeclaredProp']);

  t.deepEqual(notDeclaredProps, {});
});

test('createGetNotDeclaredProps should behave the same as getNotDeclaredProps', (t) => {
  const props = {
    declaredProp: true,
    notDeclaredProp: false,
  };

  t.deepEqual(
    createGetNotDeclaredProps([])(props, FunctionalComponentWithPropTypes),
    getNotDeclaredProps(props, FunctionalComponentWithPropTypes),
  );
});

