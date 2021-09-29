import Image from "./image";
import PropTypes from "prop-types";
import { linkPropTypes, mediaPropTypes } from "utils/types";
import CustomLink from "./custom-link";
import { AiOutlineInstagram } from 'react-icons/ai'

const Footer = ({ footer }) => {
  return (
    <footer className="pt-24 bg-white flex flex-col items-center w-full">
      <div className="max-w-screen-lg flex flex-col lg:flex-row lg:justify-between mb-32 w-full">
        <div className='space-y-4 text-gray-600 w-48'>
          {footer.logo && (
            <Image media={footer.logo} className="h-12 w-auto object-contain" />
          )}
          <p>Your Professional Influencer Community</p>
          
          <div>
            <p>Influencio ApS</p>
            <p>Copenhagen</p>
            <p>VAT no: 42044687</p>
          </div>

          <a href='mailto:admin@influencio.dk'>admin@influencio.dk</a>
        </div>
        <nav className="flex flex-wrap flex-row lg:gap-20 items-start lg:justify-end mb-10">
          {footer.columns.map((footerColumn) => (
            <div
              key={footerColumn.id}
              className="mt-10 lg:mt-0 w-6/12 lg:w-auto"
            >
              <p className="uppercase tracking-wide font-semibold">
                {footerColumn.title}
              </p>
              <ul className="mt-2">
                {footerColumn.links.map((link) => (
                  <li key={link.id} className="text-gray-700 py-1 px-1 -mx-1 hover:text-gray-900">
                    <CustomLink link={link}>
                      {link.text}
                    </CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="bg-gray-200 px-2 text-gray-700 flex items-end w-full">
        <div className="container my-6 text-sm">{footer.smallText}</div>
        
        <div>
          <a href='https://www.instagram.com/influenc.io/' className='text-5xl text-black'>
            <AiOutlineInstagram className='bg-white p-1' />
          </a>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  footer: PropTypes.shape({
    logo: mediaPropTypes.isRequired,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(linkPropTypes),
      })
    ),
    smallText: PropTypes.string.isRequired,
  }),
};

export default Footer;
