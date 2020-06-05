import { useState } from 'react';
import { APP_NAME } from '../config';
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
      <Navbar color="faded" light expand="md" style={{cursor: 'pointer'}}>
        <NavbarBrand href="/" className="text-black h2 mb-0">
          {APP_NAME}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="text-black h5 mb-0 ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>
                    All
                  </NavLink>
                </Link>
              </NavItem>
            </React.Fragment>
            <React.Fragment>
              <NavItem>
                <Link href="/categories/cat1">
                  <NavLink>
                    Cat1
                  </NavLink>
                </Link>
              </NavItem>
            </React.Fragment>
            <React.Fragment>
              <NavItem>
                <Link href="/categories/cat2">
                  <NavLink>
                    Cat2
                  </NavLink>
                </Link>
              </NavItem>
            </React.Fragment>
            <React.Fragment>
              <NavItem>
                <Link href="/categories/cat3">
                  <NavLink>
                    Cat3
                  </NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink>
                      Signin
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                  <NavLink href="/user">
                    Dashboard
                  </NavLink>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                  <NavLink href="/admin">
                    Dashboard
                  </NavLink>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;