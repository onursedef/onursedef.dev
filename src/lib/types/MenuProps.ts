export interface MenuProps {
    menus: Menu[]
}

export interface Menu {
    title: string;
    items: MenuItem[]
}

export interface MenuItem {
    type: 'link' | 'method' | 'page' | 'resume';
    title: string;
    url: string;
    icon: string | null;
}