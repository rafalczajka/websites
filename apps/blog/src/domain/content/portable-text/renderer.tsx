import {
  type InferComponents,
  PortableText,
  type PortableTextComponentProps
} from '@portabletext/react';
import {
  type HeadingIdMap,
  type PortableTextBlock,
  type PortableTextValue
} from '@websites/sanity-blog/content';

import { InlineCode } from '@/ui/inline-code';

import {
  BulletList,
  CodeBlock,
  Heading,
  Image,
  Link,
  ListItem,
  MathBlock,
  NumberList,
  Text
} from './blocks';

const buildHeadingProps = (
  { children, value }: Pick<PortableTextComponentProps<PortableTextBlock>, 'children' | 'value'>,
  headingIds?: HeadingIdMap
) => ({
  children,
  headingIds,
  value: value as PortableTextBlock
});

const buildPortableTextComponents = (headingIds?: HeadingIdMap) =>
  ({
    block: {
      h1: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h2: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h3: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h4: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h5: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      h6: (props) => <Heading {...buildHeadingProps(props, headingIds)} />,
      normal: (props) => <Text {...props} />
    },
    list: {
      bullet: (props) => <BulletList {...props} />,
      number: (props) => <NumberList {...props} />
    },
    listItem: {
      bullet: (props) => <ListItem {...props} />,
      number: (props) => <ListItem {...props} />
    },
    marks: {
      code: ({ children }) => <InlineCode>{children}</InlineCode>,
      link: Link
    },
    types: {
      image: Image,
      mathBlock: MathBlock,
      codeBlock: CodeBlock
    }
  }) satisfies InferComponents<PortableTextValue>;

export const PortableTextRenderer = ({
  value,
  headingIds
}: {
  value: PortableTextValue;
  headingIds?: HeadingIdMap;
}) => <PortableText value={value} components={buildPortableTextComponents(headingIds)} />;
