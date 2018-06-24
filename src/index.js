// @flow

// eslint-disable-next-line filenames/match-exported
type Component = { propTypes: {} };
type Props = {};

function omit(props: Props, keys: $ReadOnlyArray<string>) {
  return Object
    .keys(props)
    .reduce((acc, key) => {
      if (keys.includes(key)) {
        return acc;
      }

      return {
        ...acc,
        [key]: props[key],
      };
    }, {});
}

function getNotDeclaredProps(
  props: Props,
  instance: Component,
  additionalProps?: $ReadOnlyArray<string> = [],
) {
  const propNames = instance.propTypes ? Object.keys(instance.propTypes) : [];

  return omit(props, [
    ...additionalProps,
    ...propNames,
  ]);
}

export function createGetNotDeclaredProps(propNames: $ReadOnlyArray<string>) {
  return (
    props: Props,
    instance: Component,
    additionalProps?: $ReadOnlyArray<string> = [],
  ) => getNotDeclaredProps(props, instance, [
    ...propNames,
    ...additionalProps,
  ]);
}

export default getNotDeclaredProps;
