import type { MDXComponents } from 'mdx/types';
import MdxPage from './app/components/MdxPage';

// Force static rendering
export const dynamic = 'force-static';
export const revalidate = false;
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }) => {
      return <MdxPage>{children}</MdxPage>;
    }
  };
}