import Navbar from "./elements/navbar"
import Footer from "./elements/footer"
import NotificationBanner from "./elements/notification-banner"
import { useState } from "react"

const Layout = ({ children, global, pageContext, disableNavbar=false, disableFooter=false, className }) => {
  const { navbar, footer, notificationBanner } = global

  const [bannerIsShown, setBannerIsShown] = useState(true)
  return (
    <div className="h-full flex flex-col justify-between min-h-screen">
      {/* Aligned to the top */}
      <div className="flex-1" style={{ backgroundColor: pageContext.backgroundColor || 'white' }}>
        {notificationBanner && bannerIsShown && (
          <NotificationBanner
            data={notificationBanner}
            closeSelf={() => setBannerIsShown(false)}
          />
        )}
        {
          disableNavbar ? null : <Navbar navbar={navbar} pageContext={pageContext} />
        }
        <div className={`${className || ''}`}>{children}</div>
      </div>

      {
        disableFooter ? null : <Footer footer={footer} />
      }
    </div>
  )
}

export default Layout
