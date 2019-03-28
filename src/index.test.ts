import test from 'ava';
import { string } from 'prop-types';
import { Component, FunctionComponent } from 'react';
import getNotDeclaredProps from '.';

interface Props {
  name: string;
}

class ClassComp extends Component<Props> {
  static propTypes = { name: string };
}

const FunctionComp: FunctionComponent<Props> = () => null;

FunctionComp.propTypes = { name: string };

test('ClassComp: should work with a class component', (t) => {
  t.deepEqual(
    getNotDeclaredProps(
      {
        name: '',
        disabled: true,
      },
      ClassComp,
    ),
    { disabled: true },
  );
});

test('FunctionComp: should return only the props which are not declared', (t) => {
  t.deepEqual(
    getNotDeclaredProps(
      {
        name: '',
        disabled: true,
      },
      FunctionComp,
    ),
    { disabled: true },
  );
});
