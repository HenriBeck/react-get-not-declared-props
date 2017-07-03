/* eslint-disable react/forbid-foreign-prop-types */

function hasKey(array, key) {
  return array.indexOf(key) !== -1;
}

function omit(obj, keys) {
  return Object
    .keys(obj)
    .filter(key => !hasKey(keys, key))
    .reduce((newObj, key) => Object.assign({}, newObj, { [key]: obj[key] }), {});
}

export default function getNotDeclaredProps(props, instance, additionalProps = []) {
  return omit(
    props,
    additionalProps.concat(Object.keys(instance.propTypes)),
  );
}

export function createGetNotDeclaredProps(...propNames) {
  return (props, instance) => getNotDeclaredProps(props, instance, propNames);
}
