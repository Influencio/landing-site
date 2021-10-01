import { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import Image from "./image"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"

import { getButtonAppearance } from "utils/button"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"

import { MdMenu } from "react-icons/md"

const Navbar = ({ navbar, pageContext }) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)

  return (
    <>
      {/* The actual navbar */}
      <nav className="border-gray-200 border-b-2 py-6 sm:py-4 bg-white flex justify-center">
        <div className="container flex flex-row items-center justify-between">
          {/* Content aligned to the left */}
          <div className="flex flex-row items-center">
            <Link href="/">
              <a>
                <Image
                  media={navbar.logo}
                  className="h-10 w-auto object-contain"
                />
              </a>
            </Link>
          </div>
          <div className="flex">
          {/* List of links on desktop */}
          <ul className="hidden list-none md:flex flex-row gap-4 mr-8 ml-10 items-center">
              {navbar.links.map((navLink) => (
                <li key={navLink.id}>
                  <CustomLink link={navLink} locale={router.locale}>
                    <div className="hover:text-gray-900 px-2 py-1 leading-3">
                      {navLink.text}
                    </div>
                  </CustomLink>
                </li>
              ))}
            </ul>
            {/* Locale Switch Mobile */}
            {pageContext.localizations && (
              <div className="md:hidden">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
            {/* Hamburger menu on mobile */}
            <button
              onClick={() => setMobileMenuIsShown(true)}
              className="p-1 block md:hidden"
            >
              <MdMenu className="h-8 w-auto" />
            </button>
            {/* CTA button on desktop */}
            {navbar.buttons && navbar.buttons.length ? (
              <div className="md:flex hidden space-x-2">
                {
                  navbar.buttons.map(btn => (
                    <ButtonLink
                      key={btn.id}
                      button={btn}
                      appearance={getButtonAppearance(btn.type, "light")}
                      compact
                    />
                  ))
                }
              </div>
            ) : null} 
            {/* Locale Switch Desktop */}
            {pageContext.localizations && (
              <div className="hidden md:block">
                <LocaleSwitch pageContext={pageContext} />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )
}

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.shape({
      image: mediaPropTypes,
      url: PropTypes.string,
    }),
    links: PropTypes.arrayOf(linkPropTypes),
    buttons: PropTypes.arrayOf(buttonLinkPropTypes),
  }),
  initialLocale: PropTypes.string,
}

export default Navbar
