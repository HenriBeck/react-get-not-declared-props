// @flow

// eslint-disable-next-line filenames/match-exported
import { type ComponentType } from 'react';

function omit<
  Props: {},
  Keys: $ReadOnlyArray<string>
>(props: Props, keys: Keys) {
  return Object
    .keys(props)
    .reduce((acc, key) => {
      if (keys.indexOf(key) >= 0) {
        return acc;
      }

      return {
        ...acc,
        [key]: props[key],
      };
    }, {});
}

function getNotDeclaredProps<Props: {}, PassedProps: {}>(
  props: PassedProps,
  instance: ComponentType<Props>,
  additionalProps?: $ReadOnlyArray<string> = [],
) {
  const propNames = instance.propTypes ? Object.keys(instance.propTypes) : [];

  return omit(props, [
    ...additionalProps,
    ...propNames,
  ]);
}

export function createGetNotDeclaredProps(propNames: $ReadOnlyArray<string>) {
  return <Props: {}, PassedProps: {}>(
    props: PassedProps,
    instance: ComponentType<Props>,
    additionalProps?: $ReadOnlyArray<string> = [],
  ) => getNotDeclaredProps(props, instance, [
    ...propNames,
    ...additionalProps,
  ]);
}

export default getNotDeclaredProps;
