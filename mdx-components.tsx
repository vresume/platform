import { type MDXComponents } from 'mdx/types'

import * as mdxComponents from '~/common/components/mdx'

export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    ...mdxComponents,
  }
}
