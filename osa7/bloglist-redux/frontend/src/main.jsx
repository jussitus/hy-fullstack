import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './store'
import { ThemeProvider, createTheme } from '@mui/material/styles'
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#455a64',
    },
    secondary: {
      main: '#bf360c',
    },
  },
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
)
