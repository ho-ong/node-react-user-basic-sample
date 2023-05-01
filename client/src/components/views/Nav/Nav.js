import React, { useState } from "react";
import { Drawer } from "antd";
import "./Nav.css";

// Menu
import NavMenu from "./NavMenu";

function Nav() {
  // side menu show & close
  const [visible, setVisible] = useState(false);

  const showSideMenu = () => {
    setVisible(true);
  };

  const closeSideMenu = () => {
    setVisible(false);
  };

  // nav
  return (
    <nav>
      {/* Logo */}
      <div className="nav__logo">
        <a href="/">LOGO</a>
      </div>

      {/* Menu */}
      <div className="nav__menu">
        <NavMenu />
      </div>

      {/* Menu - Mobile */}
      <button className="menu__btn" onClick={showSideMenu}>
        Menu
      </button>
      <Drawer
        title="Menu"
        placement="right"
        className="menu__side"
        closable={false}
        onClose={closeSideMenu}
        open={visible}
      >
        <NavMenu />
      </Drawer>
    </nav>
  );
}

export default Nav;
