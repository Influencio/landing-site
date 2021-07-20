import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Button from 'components/elements/button-link';
import { loginUrl } from 'utils/links';
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';

import getCustomProps from "utils/custom-page-props";;
export const getStaticProps = getCustomProps(['register', 'success'])

const Success = ({ metadata, global, pageContext }) => {
  const shortTexts = textMap(pageContext.texts.shortTexts)
  const images = imageMap(pageContext.images)
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex flex-col items-center text-center'>
        <h1 className='title mt-32'>{shortTexts.registerSuccessTitle}</h1>
        <h3 className='text-3xl my-6'>{shortTexts.registerSuccessSubtitle}</h3>

        <img className='my-8 w-full max-w-lg' src={images.registerSuccessImage.url} alt={images.registerSuccessImage.name} />

        <div className='text-lg my-3'>{shortTexts.registerSuccessCTA}</div>
        <Button
          id='registerSuccess'
          button={{url: loginUrl, text: 'Login'}}
          appearance='dark'
          compact
        />
      </div>

    </Layout>
  )
}

export default Success
