export type GetPath = (args?: any) => string

export interface ISidebar {
  [key: string]: {
    icon: string,
    path: GetPath,
    
  }
}

export interface ISidebarLinkProps {
  name: string,
  path: string,
  isActive: boolean,
  isLocked?: boolean,
  expanded?: boolean,
}

export interface ISidebarMainLinkProps<T> extends ISidebarLinkProps{
  icon: string,
  isWithActiveChild: boolean
}