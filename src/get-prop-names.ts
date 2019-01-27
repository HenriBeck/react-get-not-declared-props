import {ComponentType} from 'react';

const cache = new WeakMap();

function getPropNames(component: ComponentType<object>) {
  if (!cache.has(component)) {
    const propNames = component.propTypes ? Object.keys(component.propTypes) : [];

    cache.set(component, new Map<string, true>(
      propNames.map((propName): [string, true] => [propName, true]))
    );
  }

  return cache.get(component);
}

export default getPropNames;