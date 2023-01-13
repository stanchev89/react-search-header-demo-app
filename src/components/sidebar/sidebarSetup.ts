import { LinkProp, MAIN_LINKS } from './types';

export const sidebarSetup: { [key in MAIN_LINKS]: LinkProp } = {
  [MAIN_LINKS.USERS]: {
    icon: 'person',
    getPath: () => '/user',
  },
  [MAIN_LINKS.POSTS]: {
    icon: 'article',
    getPath: () => '/post',
  },
  [MAIN_LINKS.COMMENTS]: {
    icon: 'comment',
    getPath: () => '/comment',
  },
  [MAIN_LINKS.TODOS]: {
    icon: 'list',
    getPath: () => '/todo',
  },
};