// @flow
import { MAIN_WRAPPER_CLASS } from 'component/app/view';
import type { Node } from 'react';
import React, { useEffect } from 'react';
import classnames from 'classnames';
import ClaimPreview from 'component/claimPreview';
import Spinner from 'component/spinner';
import { FormField } from 'component/common/form';
import usePersistedState from 'util/use-persisted-state';

const SORT_NEW = 'new';
const SORT_OLD = 'old';

type Props = {
  uris: Array<string>,
  header: Node | boolean,
  headerAltControls: Node,
  injectedItem?: Node,
  loading: boolean,
  type: string,
  empty?: string,
  defaultSort?: boolean,
  onScrollBottom?: any => void,
  page?: number,
  pageSize?: number,
  // If using the default header, this is a unique ID needed to persist the state of the filter setting
  persistedStorageKey?: string,
};

export default function ClaimList(props: Props) {
  const {
    uris,
    headerAltControls,
    injectedItem,
    loading,
    persistedStorageKey,
    empty,
    defaultSort,
    type,
    header,
    onScrollBottom,
    pageSize,
  } = props;
  const [currentSort, setCurrentSort] = usePersistedState(persistedStorageKey, SORT_NEW);
  const urisLength = (uris && uris.length) || 0;
  const sortedUris = (urisLength > 0 && (currentSort === SORT_NEW ? uris : uris.slice().reverse())) || [];

  function handleSortChange() {
    setCurrentSort(currentSort === SORT_NEW ? SORT_OLD : SORT_NEW);
  }

  useEffect(() => {
    function handleScroll(e) {
      if (pageSize && onScrollBottom) {
        const x = document.querySelector(`.${MAIN_WRAPPER_CLASS}`);

        if (x && window.scrollY + window.innerHeight >= x.offsetHeight) {
          if (!loading && urisLength >= pageSize) {
            onScrollBottom();
          }
        }
      }
    }

    if (onScrollBottom) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [loading, onScrollBottom, urisLength, pageSize]);

  return (
    <section
      className={classnames('claim-list', {
        'claim-list--small': type === 'small',
      })}
    >
      {header !== false && (
        <div className={classnames('claim-list__header', { 'claim-list__header--small': type === 'small' })}>
          {header}
          {loading && <Spinner light type="small" />}
          <div className="claim-list__alt-controls">
            {headerAltControls}
            {defaultSort && (
              <FormField
                className="claim-list__dropdown"
                type="select"
                name="file_sort"
                value={currentSort}
                onChange={handleSortChange}
              >
                <option value={SORT_NEW}>{__('Newest First')}</option>
                <option value={SORT_OLD}>{__('Oldest First')}</option>
              </FormField>
            )}
          </div>
        </div>
      )}
      {urisLength > 0 && (
        <ul>
          {sortedUris.map((uri, index) => (
            <React.Fragment key={uri}>
              <ClaimPreview uri={uri} type={type} />
              {index === 4 && injectedItem && <li className="claim-preview--injected">{injectedItem}</li>}
            </React.Fragment>
          ))}
        </ul>
      )}
      {urisLength === 0 && !loading && <h2 className="main--empty empty">{empty || __('No results')}</h2>}
    </section>
  );
}
