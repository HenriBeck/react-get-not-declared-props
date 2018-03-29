// @flow

type Props = {};
type Component = { propTypes: Props };

function omit(obj: Props, keys: Array<string>): Props {
  const set = new Set(keys);

  return Object
    .keys(obj)
    .reduce((acc, key) => {
      if (set.has(key)) {
        return acc;
      }

      return Object.assign({}, acc, { [key]: obj[key] });
    }, {});
}

export default function getNotDeclaredProps(
  props: Props,
  instance: Component,
  additionalProps: Array<string> = [],
): Props {
  return omit(props, [
    ...additionalProps,
    ...Object.keys(instance.propTypes),
  ]);
}

export function createGetNotDeclaredProps(propNames: Array<string>) {
  return (
    props: Props,
    instance: Component,
    additionalProps: Array<string> = [],
  ) => getNotDeclaredProps(props, instance, [
    ...propNames,
    ...additionalProps,
  ]);
}
