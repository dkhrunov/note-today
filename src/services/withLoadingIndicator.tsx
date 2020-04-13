import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import ThemeColors from '../shared/ThemeColors';

/**
 * HOC для условного рендеринга индикатора загрузки.
 * @param Component - компонент, обернутый в HOC
 */
const withLoadingIndicator = <P extends object>(Component: React.ComponentType<P>) => (
  class WithLoadingIndicator extends React.Component<P & IWithLoadingIndicatorProps> {
    render() {
      const { loading, ...props } = this.props;
      return loading
        ? (
          <View style={styles.container}>
            <ActivityIndicator size='large' color={ThemeColors.blue} />
          </View>
        ) : <Component {...props as P} />;
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

interface IWithLoadingIndicatorProps {
  loading: boolean;
}

export default withLoadingIndicator;
