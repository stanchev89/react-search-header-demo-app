export enum MAIN_LINKS {
  USERS = 'Users',
  POSTS = 'Posts',
  COMMENTS = 'Comments',
  TODOS = 'Todos',
}

//getPath is designed to be a function in order to build the path dynamically when needed.
export type SubLinkProp = {
  name: string,
  getPath: (args?: any) => string
}

export type LinkProp = {
  getPath: (args?: any) => string,
  icon?: string,
}