import React, { ReactNode, useEffect, useState, useRef, useMemo } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link, useLocation } from "react-router-dom";
import cx from "classnames";
import { GiHamburgerMenu } from "react-icons/gi";
import RoundButton from "../RoundButton";
import HorizontalDivider from "../HorizontalDivider";
import LogoImg from "assets/images/common/logo.png";
import TwitterImg from "assets/images/common/Twitter.gif";
import DiscordImg from "assets/images/common/Discord.gif";
import InstagramImg from "assets/images/common/Instagram.gif";
import TikTokImg from "assets/images/common/TikTok.gif";
import "./Header.scss";
import { AppHeaderUser } from "./AppHeaderUser";

// ================================================

const socialLinks = [
  {
    id: "twitter",
    image: TwitterImg,
    to: "https://twitter.com/lifeofhel",
  },
  {
    id: "discord",
    image: DiscordImg,
    to: "https://discord.com/invite/life-of-hel",
  },
  {
    id: "instagram",
    image: InstagramImg,
    to: "https://www.instagram.com/lifeofhel_saga/",
  },
  {
    id: "tiktok",
    image: TikTokImg,
    to: "https://www.tiktok.com/@lifeofhel",
  },
];

const pageLinks = [
  {
    id: "about",
    text: "about",
    to: "/about",
  },
  {
    id: "earn-loh-tickets",
    text: "earn loh tickets",
    to: "/earn-loh-tickets",
  },
  {
    id: "staking",
    text: "staking",
    to: "/staking",
  },
  {
    id: "raffles",
    text: "raffles",
    to: "/raffles",
  },
  {
    id: "dashboard",
    text: "dashboard",
    to: "/dashboard",
  },
];

// ================================================

const Header = (props) => {
  const {
    disconnectAccountAndCloseSettings,
    openSettings,
    setWalletModalVisible,
    redirectPopupTimestamp,
    showRedirectModal,
    mode,
    onSetModeBtn,
  } = props;

  // ------------------------------------------------

  const location = useLocation();
  const { pathname } = location;

  const isMobile = useMediaQuery("only screen and (max-width: 640px)");

  const [isNavVisible, setIsNavVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const mobileNavRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setIsNavVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileNavRef]);

  // ------------------------------------------------

  return (
    <>
      <header
        className={cx("app-header", scrollY < 80 ? "bg-black" : "bg-danger")}
      >
        <div className={cx("d-flex", "align-center")}>
          <Link to="/">
            <div className={cx("logo-container")}>
              <img src={LogoImg} alt="logo" width="38" />
              <div className={cx("i-loh")}>
                <span>I</span> Risings
              </div>
            </div>
          </Link>
        </div>
        {isMobile ? (
          isNavVisible ? (
            <nav className={cx("Nav", "mobile")} ref={mobileNavRef}>
              <div className={cx("social-link-container")}>
                {socialLinks.map((link) => (
                  <Link
                    to={link.to}
                    target="_blank"
                    className={cx("social-link")}
                    key={link.id}
                    onClick={() => setIsNavVisible(false)}
                  >
                    <img src={link.image} alt={`${link.id}.png`} width={48} />
                  </Link>
                ))}
              </div>
              <HorizontalDivider />
              <div className={cx("page-link-container")}>
                {pageLinks.map((link) => (
                  <Link
                    to={link.to}
                    key={link.id}
                    className={cx(
                      "page-link",
                      pathname == link.to ? "active" : ""
                    )}
                    onClick={() => setIsNavVisible(false)}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </nav>
          ) : null
        ) : (
          <nav className={cx("Nav")}>
            <div className={cx("social-link-container")}>
              {socialLinks.map((link) => (
                <Link
                  to={link.to}
                  target="_blank"
                  className={cx("social-link")}
                  key={link.id}
                >
                  <img src={link.image} alt={`${link.id}.png`} width={48} />
                </Link>
              ))}
            </div>
            <div className={cx("page-link-container")}>
              {pageLinks.map((link) => (
                <Link
                  to={link.to}
                  key={link.id}
                  className={cx(
                    "page-link",
                    pathname == link.to ? "active" : ""
                  )}
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <div className={cx("d-flex", "justify-center")}>
              <AppHeaderUser
                disconnectAccountAndCloseSettings={
                  disconnectAccountAndCloseSettings
                }
                openSettings={openSettings}
                small
                setWalletModalVisible={setWalletModalVisible}
                redirectPopupTimestamp={redirectPopupTimestamp}
                showRedirectModal={showRedirectModal}
                mode={mode}
                onSetModeBtn={onSetModeBtn}
              />
            </div>
          </nav>
        )}
        <div className={cx("header-right-container")}>
          <div className={cx("d-flex", "justify-center")}>
            <AppHeaderUser
              disconnectAccountAndCloseSettings={
                disconnectAccountAndCloseSettings
              }
              openSettings={openSettings}
              small
              setWalletModalVisible={setWalletModalVisible}
              redirectPopupTimestamp={redirectPopupTimestamp}
              showRedirectModal={showRedirectModal}
              mode={mode}
              onSetModeBtn={onSetModeBtn}
            />
          </div>
          <button className={cx("burger")} onClick={toggleNav}>
            <GiHamburgerMenu color="white" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
