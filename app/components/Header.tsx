   import { Await, NavLink, useMatches } from '@remix-run/react';
   import { Suspense } from 'react';
   import type { LayoutProps } from './Layout';

   type HeaderProps = Pick<LayoutProps, "header" | "cart" | "isLoggedIn">

   type Viewport = "desktop" | "mobile"

   export function Header({ header, isLoggedIn, cart }: HeaderProps) {
      const { shop, menu } = header
      const [root] = useMatches()
      const publicStoreDomain = root?.data?.publicStoreDomain
      return (
         <header className="col-span-full grid grid-cols-16 fixed top-0 z-50 font-bold mx-auto">
            {/* <NavLink 
               prefetch="intent" 
               to="/" 
               style={activeLinkStyle} 
               end
            >
               Home
            </NavLink> */}
            {/* <HeaderMenu menu={menu} viewport="desktop" /> */}
            {/* <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} /> */}
            <div className="col-span-2 flex flex-col h-screen py-6">
               <div className="flex-1">
                  <h1 className="w-full text-center text-2xl">M.S.</h1>
               </div>
               <div className="flex flex-col justify-around flex-1">
                  <img 
                     src="https://mydeerartshop.nl/cdn/shop/products/Sunbrella_cushion_outdoor_1200x.png?v=1648209842" 
                     alt="Chair" 
                     className="aspect-square object-cover"
                  />
               </div>
               <div className="flex-1 relative">
                  <h2 className="uppercase absolute top-0 tracking-wider text-4xl transform -rotate-90 ml-auto">
                     Armchair
                  </h2>
               </div>
            </div>
            <div className="col-span-4"></div>
            <nav className="flex col-span-4 gap-10 px-10  py-6">
               {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
                  if (!item.url) return null;

                  // if the url is internal, we strip the domain
                  const url =
                     item.url.includes("myshopify.com") ||
                        item.url.includes(publicStoreDomain)
                        ? new URL(item.url).pathname
                        : item.url;
                  return (
                     <NavLink
                        className="header-menu-item"
                        end
                        key={item.id}
                        prefetch="intent"
                        style={activeLinkStyle}
                        to={url}
                     >
                        {item.title}
                     </NavLink>
                  )
               })}
            </nav> 
         </header>
      );
   }

   export function HeaderMenu({
      menu,
      viewport,
   }: {
      menu: HeaderProps["header"]["menu"]
      viewport: Viewport
   }) {
      const [root] = useMatches()
      const publicStoreDomain = root?.data?.publicStoreDomain
      const className = `header-menu-${viewport}`

      function closeAside(event: React.MouseEvent<HTMLAnchorElement>) {
         if (viewport === "mobile") {
            event.preventDefault()
            window.location.href = event.currentTarget.href
         }
      }

      return (
         <nav className={className} role="navigation">
            {viewport === "mobile" && (
               <NavLink
                  end
                  onClick={closeAside}
                  prefetch="intent"
                  style={activeLinkStyle}
                  to="/"
               >
                  Home
               </NavLink>
            )}
            {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
               if (!item.url) return null;

               // if the url is internal, we strip the domain
               const url =
                  item.url.includes("myshopify.com") ||
                     item.url.includes(publicStoreDomain)
                     ? new URL(item.url).pathname
                     : item.url;
               return (
                  <NavLink
                     className="header-menu-item"
                     end
                     key={item.id}
                     onClick={closeAside}
                     prefetch="intent"
                     style={activeLinkStyle}
                     to={url}
                  >
                     {item.title}
                  </NavLink>
               )
            })}
         </nav>
      )
   }

   function HeaderCtas({
      isLoggedIn,
      cart,
   }: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
      return (
         <nav className="header-ctas" role="navigation">
            {/* <HeaderMenuMobileToggle /> */}
            {/* <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
               {isLoggedIn ? 'Account' : 'Sign in'}
            </NavLink> */}
            <SearchToggle />
            <CartToggle cart={cart} />
         </nav>
      );
   }

   function HeaderMenuMobileToggle() {
      return (
         <a className="header-menu-mobile-toggle" href="#mobile-menu-aside">
            <h3>☰</h3>
         </a>
      );
   }

   function SearchToggle() {
      return <a href="#search-aside">Search</a>;
   }

   function CartBadge({ count }: { count: number }) {
      return <a href="#cart-aside">Cart {count}</a>;
   }

   function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
      return (
         <Suspense fallback={<CartBadge count={0} />}>
            <Await resolve={cart}>
               {(cart) => {
                  if (!cart) return <CartBadge count={0} />;
                  return <CartBadge count={cart.totalQuantity || 0} />;
               }}
            </Await>
         </Suspense>
      );
   }

   const FALLBACK_HEADER_MENU = {
      id: 'gid://shopify/Menu/199655587896',
      items: [
         {
            id: 'gid://shopify/MenuItem/461609500728',
            resourceId: null,
            tags: [],
            title: 'Collections',
            type: 'HTTP',
            url: '/collections',
            items: [],
         },
         {
            id: 'gid://shopify/MenuItem/461609533496',
            resourceId: null,
            tags: [],
            title: 'Blog',
            type: 'HTTP',
            url: '/blogs/journal',
            items: [],
         },
         {
            id: 'gid://shopify/MenuItem/461609566264',
            resourceId: null,
            tags: [],
            title: 'Policies',
            type: 'HTTP',
            url: '/policies',
            items: [],
         },
         {
            id: 'gid://shopify/MenuItem/461609599032',
            resourceId: 'gid://shopify/Page/92591030328',
            tags: [],
            title: 'About',
            type: 'PAGE',
            url: '/pages/about',
            items: [],
         },
      ],
   };

   function activeLinkStyle({
      isActive,
      isPending,
   }: {
      isActive: boolean;
      isPending: boolean;
   }) {
      return {
         fontWeight: isActive ? 'bold' : '',
         color: isPending ? 'grey' : 'black',
      };
   }
