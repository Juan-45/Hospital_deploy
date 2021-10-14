import { ThemeProvider } from '@material-ui/core/styles';
import { Component } from 'react';

import Agenda from './pages/Agenda';
import theme from './theme';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Agenda />
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
