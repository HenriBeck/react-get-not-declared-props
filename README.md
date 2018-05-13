# react-get-not-declared-props

![npm](https://img.shields.io/npm/v/react-get-not-declared-props.svg) ![CircleCI](https://img.shields.io/circleci/project/github/HenriBeck/react-get-not-declared-props.svg) ![Dev Deps](https://img.shields.io/david/dev/HenriBeck/react-get-not-declared-props.svg)

A dependencies free utility package for getting all extra passed props to an component.

### Installation

> yarn add react-get-not-declared-props

### Documentation

```js
import getNotDeclaredProps from 'react';

const additionalProps = getNotDeclaredProps(props, component, additionalProps);
```

This function takes three arguments:
- props: The props object.
- component: The component where the propTypes are defined on.
- additionalProps: An array of strings which should be omitted aswell from the return object. This argument is optional.

### Tradeoffs

##### The props:
 - Improves the Developer Experience for not duplicating the props. One time for the propTypes and a second time for the render method when destructuring. This reduces the risk of mistakes.
 
##### The cons:
 - The prop types can't be stripped in production without unknown side effects. This means that the bundle will be slightly larger.

### Example

```js
import React from 'react';
import PropTypes from 'prop-types';
import getNotDeclaredProps from 'react-get-not-declared-props';

class Button extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        onPress: PropTypes.func,
    };

    handleClick = () => {
        this.props.onPress();
    };

    render() {
        return (
            <div
                onClick={this.handleClick}
                // This will forward any props which are not specified inside propTypes
                {...getNotDeclaredProps(this.props, Button)}
            >
                {this.props.children}
            </div>
        );
    }
}
```
