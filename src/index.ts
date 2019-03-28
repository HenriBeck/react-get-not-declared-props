import { ComponentType } from 'react';
import getPropNames from './get-prop-names';

function omit<Props extends Record<string, any>, ReceivedProps extends Props>(
  props: ReceivedProps,
  keys: Map<keyof Props, true>,
): Omit<ReceivedProps, keyof Props> {
  const propNames = Object.keys(props) as Array<keyof Props>;

  return propNames.reduce(
    (acc, key) => {
      if (keys.has(key)) {
        return acc;
      }

      return {
        ...acc,
        [key]: props[key],
      };
    },
    {} as Omit<ReceivedProps, keyof Props>,
  );
}

type Omit<Obj1, Names> = Pick<Obj1, Exclude<keyof Obj1, Names>>;

function getNotDeclaredProps<
  Props extends Record<string, any>,
  ReceivedProps extends Props
>(
  props: ReceivedProps,
  instance: ComponentType<Props>,
): Omit<ReceivedProps, keyof Props> {
  const propNames = getPropNames(instance);

  return omit(props, propNames);
}

export default getNotDeclaredProps;
