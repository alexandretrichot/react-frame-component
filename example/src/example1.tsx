import React from 'react';
import { render } from 'react-dom';
import Frame from 'ts-react-frame-component';

const styles = {
  border: '1px solid',
  width: '100%',
  height: '100%',
};

const Header: React.FC = ({ children }) => <h1>{children}</h1>;

const Content: React.FC = ({ children }) => <section>{children}</section>;

const App: React.FC = () => (
  <div>
    <Header>Frame example of wrapping application</Header>
    <Content>
      <h2>This whole app is wrapped inside an iFrame</h2>
    </Content>
  </div>
);

render(<Frame style={styles}><App /></Frame>, document.querySelector('#example1'));