import { useAuth0 } from '@auth0/auth0-react';
import { MenuIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Button, LoginButton } from '#components';
import { Roles, rolesKey } from '#config/roles';

export const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isAdmin: boolean = user?.[rolesKey]?.includes(Roles.admin);

  const Link = ({ to, children }: { to: string; children: ReactNode }) => (
    <NavLink to={to} onClick={() => setIsCollapsed(true)}>
      {children}
    </NavLink>
  );

  return (
    <nav className="nav">
      <div className="nav__brand">
        <NavLink to="/">
          <img src="/images/brand/rubik_line_36x36.png" alt="Rubik's Cube" />
          <p>
            Blindsolve<span>DB</span>
          </p>
        </NavLink>
      </div>

      <div className="nav__expand">
        <Button
          variant="ghost"
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={<MenuIcon />}
        />
      </div>

      <div
        className={clsx(
          'nav__content ',
          isCollapsed && 'nav__content--collapsed'
        )}
      >
        <Link to="/sheets">Sheets</Link>
        <Link to="/trainer">Trainer</Link>

        <div className="nav__separator" aria-hidden></div>

        {isAdmin && <Link to="/admin">Dashboard</Link>}
        {isAuthenticated ? <Link to="/profile">Profile</Link> : <LoginButton />}
      </div>
    </nav>
  );
};
