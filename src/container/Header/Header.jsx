import './Header.scss'
import {motion} from 'framer-motion';
import { AppWrap} from '../../wrapper';


const Header = () => {
  return (
    <div id='home' className='app__header app__flex'>

      <motion.div
      whileInView={{opacity:[0,1]}}
      transition={{ duration:0.5, delayChildren: 0.5}}
      className='app__header-img' 
      >
        <div className='header__text'>
         <h1 className='title'>My name is <span className='highlight'>João</span>.</h1>
         <h2 className='subtitle'>I'm a <span className='highlight'>Web Developer</span>.</h2>
         <p className='subtitle'>In this Portfolio you will find out more about myself and my skills.</p>
        </div>


      </motion.div>
      </div>
   
  )
}


export default AppWrap(Header, `home`);