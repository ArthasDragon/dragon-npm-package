import * as React from 'react';
import { RouteWithSubRoutes } from '@util/index';
import { Layout } from 'antd';
import './home.less';

interface Props {
  routes: object[];
}

interface State {
  telPhone: string;
}

class Home extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      telPhone: '',
    };
  }

  public render() {
    const { routes } = this.props;
    return (
      <Layout>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Layout>
    );
  }
}

export default Home;
