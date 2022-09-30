import { Component, ErrorInfo, ReactNode } from 'react';

import { Alert } from '#components';

type Props = { children: ReactNode; message: string };
type State = { hasError: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static defaultProps = { message: 'Something went wrong' };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Alert danger style={{ margin: 'var(--size-4' }}>
            {this.props.message}
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
