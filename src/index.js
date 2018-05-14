// @flow

type Component = { propTypes: {} };
type Props = {};

function omit(props: Props, keys: Array<string>) {
  const set = new Set(keys);

  return Object
    .keys(props)
    .reduce((acc, key) => {
      if (set.has(key)) {
        return acc;
      }

      return Object.assign({}, acc, { [key]: props[key] });
    }, {});
}

export default function getNotDeclaredProps(
  props: Props,
  instance: Component,
  additionalProps?: Array<string> = [],
) {
  return omit(props, [
    ...additionalProps,
    ...(instance.propTypes ? Object.keys(instance.propTypes) : []),
  ]);
}

export function createGetNotDeclaredProps(propNames: Array<string>) {
  return (
    props: Props,
    instance: Component,
    additionalProps?: Array<string> = [],
  ) => getNotDeclaredProps(props, instance, [
    ...propNames,
    ...additionalProps,
  ]);
}
