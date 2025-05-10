export interface NavItem {
  icon: React.ElementType;
  onClick?: () => void;
}

export interface CategoryItem {
  label: string;
  onClick: () => void;
}

export interface NavIconsProps {
  items: NavItem[];
}
