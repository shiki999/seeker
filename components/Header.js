import { useState } from 'react';
import { APP_NAME } from '../config';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import {signout, isAuth} from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
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
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <React.Fragment>
              <NavItem>
                <Link href="/blogs">
                  <NavLink>
                    Blogs
                  </NavLink>
                </Link>
              </NavItem>

              <NavItem>
                <Link href="/contact">
                  <NavLink>
                    Contact
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
                <NavItem>
                  <Link href="/signup">
                    <NavLink>
                      Signup
                    </NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                  <NavLink href="/user">
                    {`${isAuth().name}'s Dashboard`}
                  </NavLink>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                  <NavLink href="/admin">
                    {`${isAuth().name}'s Dashboard`}
                  </NavLink>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink style={{cursor: 'pointer'}} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </NavLink>
              </NavItem>
            )}

            <NavItem>
              <Link href="/user/crud/blog">
                <NavLink className="btn btn-primary text-light">
                  Create Blog
                </NavLink>
              </Link>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;