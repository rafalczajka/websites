import 'server-only';

import aboutInfoData from '../about.json';
import type { AboutInfo } from '../models';

export function getAboutInfo(): AboutInfo {
  return aboutInfoData as AboutInfo;
}
