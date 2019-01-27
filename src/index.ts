import {ComponentType} from 'react';
import getPropNames from './get-prop-names';

type Props = Record<string, any>;

function omit(props: Props, keys: Map<string, true>) {
  return Object
    .keys(props)
    .reduce((acc, key) => {
      if (keys.has(key)) {
        return acc;
      }

      return {
        ...acc,
        [key]: props[key],
      };
    }, {});
}

function getNotDeclaredProps(props: Props, instance: ComponentType<object>) {
  const propNames = getPropNames(instance);

  return omit(props, propNames);
}

export default getNotDeclaredProps;
