import { useState } from 'react';
import { DOMAIN, APP_NAME } from '../config';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import {signout, isAuth} from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import '.././node_modules/nprogress/nprogress.css';
import Search from '../components/blog/Search';

Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
        <header className="site-navbar py-3" role="banner">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-4 site-logo">
                <Link href="/">
                  <a className="text-black h2 mb-0"><img src={`${DOMAIN}/static/images/seeker-logo.png`} style={{height: 67.4}} alt={APP_NAME}/></a>
                </Link>
              </div>
              <div className="col-8 text-right">
                <nav className="site-navigation" role="navigation">
                  <ul className="site-menu js-clone-nav mr-auto d-none d-lg-block mb-0">
                    <li><Link href="/blogs"><a>All Articles</a></Link></li>
                    <li><Link href="/categories/cat1"><a>Category1</a></Link></li>
                    <li><Link href="/categories/cat2"><a>Category2</a></Link></li>
                    <li><Link href="/categories/cat3"><a>Category3</a></Link></li>
                    {!isAuth() && (<li><Link href="/signin"><a>Signin</a></Link></li>)}
                    {isAuth() && isAuth().role === 0 && (<li><Link href="/user"><a>Dashboard</a></Link></li>)}
                    {isAuth() && isAuth().role === 1 && (<li><Link href="/admin"><a>Dashboard</a></Link></li>)}
                    {isAuth() && (<li><a onClick={() => signout(() => Router.replace(`/signin`))}>Signout</a></li>)}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </header>
    </React.Fragment>
  );
};

export default Header;