import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"

import getCustomProps from "utils/custom-page-props";;
export const getStaticProps = getCustomProps(['register', 'success'])

const Success = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className='title my-32 text-center'>Success!</h1>
      <h3 className='text-2xl text-center'>Your new account is now ready</h3>

    </Layout>
  )
}

export default Success
