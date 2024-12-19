import type { MDXComponents } from 'mdx/types';
import MdxPage from './app/components/MdxPage';
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    wrapper: ({ children }) => {
      return <MdxPage>{children}</MdxPage>;
    }
  };
}