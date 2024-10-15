import { ReactSVG } from 'react-svg'
import testSVG from '../../assets/svg/Rainbow.svg'

const Home = () => {
    return ( <>
   <ReactSVG src={testSVG}></ReactSVG>
   <p>hello world</p>
    </> );
}
 
export default Home;