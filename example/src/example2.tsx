import React from 'react';
import { render } from 'react-dom';

import Frame from 'ts-react-frame-component';

const styles = {
  border: '1px solid',
  width: '100%',
  height: '100%',
};

const App: React.FC = () => (
  <Frame style={styles} head={
    <style>{'*{color:red}'}</style>
  }>
    <h1>Frame example of wrapping component</h1>
    <p>This is also showing encapuslated styles. All text is red inside this component.</p>
  </Frame>
);

render(<App />, document.querySelector('#example2'));