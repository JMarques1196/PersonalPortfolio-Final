import './Work.scss';
import { useState, useEffect } from 'react';
import {AiFillEye, AiFillGithub} from 'react-icons/ai'; // react icons
import { motion } from 'framer-motion';
import { AppWrap, MotionWrap } from '../../wrapper';
import {urlFor, client} from '../../client'; // These are both sanity expressions

const Work = () => {

  const[activeFilter, setActiveFilter] = useState('All');
  const[animateCard, setAnimateCard] = useState({y:0, opacity:1});
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
      setFilterWork(data); // we give data object to both states
    });
  }, []);

// Filter function

const handleWorkFilter = (item) => {
  setActiveFilter(item);
  setAnimateCard([{ y: 100, opacity: 0 }]);

  setTimeout(() => {
    setAnimateCard([{ y: 0, opacity: 1 }]);

    if (item === 'All') {
      setFilterWork(works);
    } else {
      setFilterWork(works.filter((work) => work.tags.includes(item)));
    }
  }, 500);
  }
// Backticks are template literals, can be used to place variables or js expressions inside strings
  return (
    <>
     <h2 className='head-text'>My Creative <span>Portfolio</span></h2>
     <div className='app__work-filter'>
        {// We will map each item into the filter function
        ['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
     </div>
     <motion.div
      animate={animateCard} // Will grab the animation properites from State
      transition={{duration: 0.5, delayChildren: 0.5}}
      className='app__work-portfolio'
     > 
      {filterWork.map((work, index) => (
        <div className='app__work-item app__flex' key={index}>
          <div className='app__work-img app__flex'>
            <img src={urlFor(work.imgUrl)} alt={work.name}/>

            <motion.div
              whileHover={{opacity:[0,1]}}
              transition={{duration:0.25, ease: 'easeInOut', staggerChildren: 0.5}}
              className='app__work-hover app__flex'
            >
              <a href={work.projectLink} target='blank' rel='noref'>
                <motion.div
                  whileInView={{scale: [0,1]}}
                  whileHover={{scale:[1,0.9]}}
                  transition={{duration:0.25}}
                  className='app__flex'
                >
                  <AiFillEye /> 
                </motion.div>
              </a>
              <a href={work.codeLink} target='blank' rel='noref'>
                <motion.div
                  whileInView={{scale: [0,1]}}
                  whileHover={{scale:[1,0.9]}}
                  transition={{duration:0.25}}
                  className='app__flex'
                >
                  <AiFillGithub /> 
                </motion.div>
              </a>
            </motion.div>
          </div>
          <div className='app__work-content app__flex'>
            <h4 className='bold-text'>{work.title}</h4>
            <p className='p-text' style={{marginTop :10}}>{work.description}</p>

            <div className='app__work-tag app__flex'>
              <p className='p-text'>{work.tags[0]}</p>
            </div>

          </div>
        </div>
      ))}
     </motion.div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
