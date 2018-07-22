import React, { Component } from "react";

export default loadComponent =>
  class extends Component {
    state = {
      Cmp: null
    };

    componentWillMount() {
      if (this.hasLoadedComponent()) {
        return;
      }

      loadComponent()
        .then(module => module.default)
        .then(Cmp => {
          this.setState({ Cmp });
        })
        .catch(err => {
          console.error(`Cannot load component in <AsyncCmp />`);
          throw err;
        });
    }

    hasLoadedComponent() {
      return this.state.Cmp !== null;
    }

    render() {
      const { Cmp } = this.state;
      return Cmp && <Cmp {...this.props} />;
    }
  };
