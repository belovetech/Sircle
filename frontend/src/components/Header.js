import React, {useState } from 'react';


//import components
import Nav from './Nav';
import NavMobile from './NavMobile';

// import icons
import { FaBars } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';

const Header = () => {
    const [navMobile, setNavMobile] = useState(false);

  return (
    <header className='mb-12 lg:mb-0 z-20 relative px-4 lg:px-0'
    data-aos='fade-down' data-aos-delay='1200' data-aos-duration='1000'
    >
        <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-[120px]'>
                {/* logo */}
                <a href="#">
                    <h4 className='text-2xl'>Sircle</h4>
                </a>

                {/*nav initially hidden - only show on large screen */}
                <div className='hidden lg:flex'>
                <Nav />
                </div>
            </div>
                {/*Mobile nav - Initially is showing / hidden on large screens */}
                <div 
                className={`${navMobile ? 'max-h-52' : 'max-h-0'} 
                lg:hidden absolute top-24 bg-primary w-full left-0 right-0 font-bold rounded transition-all overflow-hidden`}>
                <NavMobile />
                </div>

                {/* Button */}
                <button className='btn btn-quaternary flex items-center gap-x-[20px] group'>
                    Join Chat <BsArrowRight className='text-2xl text-primary group-hover:text-white transition' />
                </button>

                {/* Nav Trigger Button - Only shows on mobile views */}

                <div onClick={() => setNavMobile(!navMobile)} 
                className='lg:hidden text-2xl text-primary cursor-pointer'>
                    <FaBars />
                </div>


            </div>
        </div>
    </header>
  )
}

export default Header