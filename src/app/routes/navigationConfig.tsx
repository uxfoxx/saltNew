export type NavigationItem = {
    title: string;
    path?: string;
    icon?: string;
    type?: string;
}

const navigationConfig: NavigationItem[] = [
    {
        title: 'Home',
        path: '/',
        icon: 'home',
        type: 'link'
    },
    {
        title: 'About',
        path: '/about',
        icon: 'info',
        type: 'link'
    },
    // Stay with us, Dine With Us, Menu, Blog
    {
        title: 'Stay With Us',
        path: '/stay-with-us',
        icon: 'hotel',
        type: 'link'
    },
    {
        title: 'Dine With Us',
        path: '/dine-with-us',
        icon: 'restaurant',
        type: 'link'
    },
    {
        title: 'Menu',
        path: '/menu',
        icon: 'menu',
        type: 'link'
    },
    {
        title: 'Blog',
        path: '/blog',
        icon: 'blog',
        type: 'link'
    },
]

export default navigationConfig;