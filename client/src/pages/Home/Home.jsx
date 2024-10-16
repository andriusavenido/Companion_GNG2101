import { ReactSVG } from 'react-svg'
import testSVG from '../../assets/svg/Rainbow.svg'

const Home = () => {
    return ( <>
   <ReactSVG src={testSVG}></ReactSVG>
   <p>Chatbot</p>
    </> );
}
 
export default Home;