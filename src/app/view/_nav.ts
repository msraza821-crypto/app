import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/theme/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  {
    name: 'Users',
    url: '/theme/users',
    icon: 'icon-user',
   
},
  {
      name: 'Brands',
      url: '/theme/brands',
      icon: 'icon-puzzle',
     
},
{
    name: 'Categories',
    url: '/theme/categories',
    icon: 'icon-list',
  
},
// {
//   name: 'Banners',
//   url: '/theme/banners',
//   icon: 'icon-cursor',

{
  name: 'Promotions',
  url: '/theme/banners',
  icon: 'icon-cursor',

},


{
  name: 'Banners',
  url: '/theme/simplebanners',
  icon: 'icon-cursor',

},
// {
//   name: 'Products',
//   url: '/theme/products',
//   icon: 'icon-bell',
  
// },
{
  name: 'CMS',
  url: '/theme/cms',
  icon: 'icon-pencil',
  
}
  
];
