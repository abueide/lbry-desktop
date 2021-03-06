// @flow
import * as PAGES from 'constants/pages';
import * as ICONS from 'constants/icons';
import React from 'react';
import Button from 'component/button';
import Tag from 'component/tag';
import StickyBox from 'react-sticky-box/dist/esnext';

type Props = {
  subscriptions: Array<Subscription>,
  followedTags: Array<Tag>,
};

function SideBar(props: Props) {
  const { subscriptions, followedTags } = props;

  function buildLink(path, label, icon, guide) {
    return {
      navigate: path ? `$/${path}` : '/',
      label,
      icon,
      guide,
    };
  }

  return (
    <StickyBox offsetBottom={40} offsetTop={100}>
      <nav className="navigation">
        <ul className="navigation__links">
          {[
            {
              ...buildLink(null, __('Home'), ICONS.HOME),
            },
            {
              ...buildLink(PAGES.LIBRARY, __('Library'), ICONS.LIBRARY),
            },
            {
              ...buildLink(PAGES.PUBLISHED, __('Publishes'), ICONS.PUBLISH),
            },
            {
              ...buildLink(PAGES.FOLLOWING, __('Customize'), ICONS.EDIT),
            },
          ].map(linkProps => (
            <li key={linkProps.label}>
              <Button {...linkProps} className="navigation__link" activeClass="navigation__link--active" />
            </li>
          ))}
        </ul>
        <ul className="navigation__links tags--vertical">
          {followedTags.map(({ name }, key) => (
            <li className="" key={name}>
              <Tag navigate={`/$/tags?t${name}`} name={name} />
            </li>
          ))}
        </ul>
        <ul className="navigation__links--small">
          {subscriptions.map(({ uri, channelName }, index) => (
            <li key={uri} className="">
              <Button
                navigate={uri}
                label={channelName}
                className="navigation__link"
                activeClass="navigation__link--active"
              />
            </li>
          ))}
        </ul>
      </nav>
    </StickyBox>
  );
}

export default SideBar;
