import Image from 'next/image';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-4">
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
          alt="Github logo in black"
          width={16}
          height={16}
          aria-hidden="true"
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
    </footer>
  );
}