import './App.css'
import { ReactSVG } from 'react-svg'
import testSVG from './assets/svg/Chat.svg'

function App() {

  return (
    <>
    <ReactSVG src={testSVG}></ReactSVG>
      <p>hello world</p>
    </>
  )
}

export default App
