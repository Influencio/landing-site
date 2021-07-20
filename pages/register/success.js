import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Button from 'components/elements/button-link';
import { loginUrl } from 'utils/links';

import getCustomProps from "utils/custom-page-props";;
export const getStaticProps = getCustomProps(['register', 'success'])

const Success = ({ metadata, global, pageContext }) => {
  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='flex flex-col items-center text-center'>
        <h1 className='title mt-32'>Success!</h1>
        <h3 className='text-3xl my-6'>Your new account is now ready</h3>

        <div className='text-lg my-3'>You can now login and start using your account</div>
        <Button
          button={{url: loginUrl, text: 'Login'}}
          appearance='dark'
          compact
        />
      </div>

    </Layout>
  )
}

export default Success
