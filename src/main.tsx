import ReactDOM from 'react-dom/client'
import store from './store/index.ts'
import MyApp from './App.tsx'
import Context from '@/tt_core/layout/contex'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <Context store={store}>
    <MyApp></MyApp>
  </Context>
)
