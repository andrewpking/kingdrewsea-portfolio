import Image from 'next/image';
import { MdEmail, MdOutlineNewspaper } from 'react-icons/md';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="row-start-4 flex gap-6 flex-wrap items-center justify-center p-4">
      <nav className='tiny:row-start-4 tiny:flex gap-6 tiny:flex-wrap' aria-label="Footer Navigation">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com/in/kingdrewsea"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn Profile"
        >
          <Image
            src="/images/LinkedIn.png"
            alt="LinkedIn logo in blue"
            width={16}
            height={16}
            aria-hidden="true"
          />
          LinkedIn
        </a>
        
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/andrewpking"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit GitHub Profile"
        >
          <Image
            src="/images/github.svg"
            alt="Github logo"
            width={16}
            height={16}
            aria-hidden="true"
            className="dark:invert transition-[filter] duration-300"
          />
          GitHub
        </a>
        
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:drewpking@pm.me"
          aria-label="Send email"
        >
          <MdEmail
              aria-hidden="true"
              size={16}
          />
          
          Email
        </a>
        <Link 
          href={'./Resume.pdf'}  
          target="_blank"  
          rel="noopener noreferrer" 
          locale={"false"} 
          download
        >
          <button className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          <MdOutlineNewspaper
            aria-hidden="true"
            size={16}
            />
             Downlod Resume 
             </button>
        </Link>
      </nav>
    </footer>
  );
}