// @flow
import * as ICONS from 'constants/icons';
import React from 'react';
import Tooltip from 'component/common/tooltip';
import classnames from 'classnames';
import { icons } from './icon-custom';

// It would be nice to standardize this somehow
// These are copied from `scss/vars`, can they both come from the same source?
const RED_COLOR = '#e2495e';
const GREEN_COLOR = '#44b098';
const BLUE_COLOR = '#49b2e2';

type Props = {
  icon: string,
  tooltip?: boolean,
  iconColor?: string,
  size?: number,
  className?: string,
};

class IconComponent extends React.PureComponent<Props> {
  getTooltip = (icon: string) => {
    switch (icon) {
      case ICONS.FEATURED:
        return __('Featured content. Earn rewards for watching.');
      case ICONS.DOWNLOAD:
        return __('This file is downloaded.');
      case ICONS.SUBSCRIBE:
        return __('You are subscribed to this channel.');
      case ICONS.SETTINGS:
        return __('Your settings.');
      default:
        return null;
    }
  };

  getIconColor = (color: string) => {
    switch (color) {
      case 'red':
        return RED_COLOR;
      case 'green':
        return GREEN_COLOR;
      case 'blue':
        return BLUE_COLOR;
      default:
        return undefined;
    }
  };

  render() {
    const { icon, tooltip, iconColor, size, className } = this.props;
    const Icon = icons[this.props.icon];

    if (!Icon) {
      console.error('no icon found for ', icon);
      return null;
    }

    let color;
    if (iconColor) {
      color = this.getIconColor(iconColor);
    }

    const iconSize = size || 14;

    let tooltipText;
    if (tooltip) {
      tooltipText = this.getTooltip(icon);
    }

    const inner = <Icon size={iconSize} className={classnames(`icon icon--${icon}`, className)} color={color} />;

    return tooltipText ? <Tooltip label={tooltipText}>{inner}</Tooltip> : inner;
  }
}

export default IconComponent;
