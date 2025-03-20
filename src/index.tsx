import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './modules/store'

import 'decentraland-ui/lib/styles.css'
import AppRoutes from './routes'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
