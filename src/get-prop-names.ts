import { ComponentType } from 'react';

const cache = new WeakMap();

function getPropNames<Props>(
  component: ComponentType<Props>,
): Map<keyof Props, true> {
  if (!cache.has(component)) {
    const propNames = component.propTypes
      ? Object.keys(component.propTypes)
      : [];

    cache.set(
      component,
      new Map(propNames.map((propName): [string, true] => [propName, true])),
    );
  }

  return cache.get(component);
}

export default getPropNames;
