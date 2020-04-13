import React from 'react';

/**
 * HOC для условного рендеринга сообщения при пустом значении.
 * @param Component - компонент, обернутый в HOC
 */
// tslint:disable-next-line: max-line-length
const withEmpty = <P extends object, T extends object>(Component: React.ComponentType<P>, EmptyMessage: React.ComponentType<T>) => (
  class WithEmpty extends React.Component<P & WithEmptyProps> {
    render() {
      const { empty, ...props } = this.props;
      return empty
        ? <EmptyMessage {...props as T} />
        : <Component {...props as P} />;
    }
  }
);

type WithEmptyProps = {
  empty: boolean;
}

export default withEmpty;
