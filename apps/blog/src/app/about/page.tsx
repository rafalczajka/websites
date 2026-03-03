import type { Metadata } from 'next';

import { getAboutInfo } from '@/domain/about/services';
import { AboutContent } from '@/domain/about/ui';

import { PageContent } from '../_components';

export const metadata: Metadata = {
  title: 'About | Blog',
  description: ''
};

export default function AboutPage() {
  const aboutInfo = getAboutInfo();

  return (
    <PageContent>
      <AboutContent aboutInfo={aboutInfo} />
    </PageContent>
  );
}
