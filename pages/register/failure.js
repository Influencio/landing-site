import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Button from 'components/elements/button-link';
import { loginUrl } from 'utils/links';
import textMap from 'utils/text-map';
import imageMap from 'utils/image-map';
import { useRouter } from "next/router";

import getCustomProps from "utils/custom-page-props";;
export const getStaticProps = getCustomProps(['register', 'failure'])

const Failure = ({ metadata, global, pageContext }) => {
  const shortTexts = textMap(pageContext.texts.shortTexts)
  const images = imageMap(pageContext.images)

  const router = useRouter();
  const { error } = router.query

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex flex-col items-center text-center'>
        <h1 className='title mt-32'>{shortTexts.registerFailureTitle}</h1>
        <h3 className='text-3xl my-6'>{shortTexts.registerFailureSubtitle}</h3>

        <img className='my-8 w-full max-w-lg' src={images.registerFailureImage.url} alt={images.registerFailureImage.name} />

        <div className='text-lg my-3'>{shortTexts.registerFailureCTA}</div>
        {
          error ? <div>{error}</div> : null
        }
        <Button
          button={{url: loginUrl, text: 'Login', id: 'registerFailure'}}
          appearance='dark'
          compact
        />
      </div>

    </Layout>
  )
}

export default Failure
