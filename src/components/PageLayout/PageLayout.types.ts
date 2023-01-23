import { ReactNode } from 'react';

export interface MenuItemType {
  name: string,
  icon: ReactNode,
  link: string,
  ext?: boolean,
}
