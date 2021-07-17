import { useForm, Controller } from "react-hook-form";
import { getCustomPageData, getGlobalData } from "utils/api"
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Input from 'components/atomic/input';

const Influencer = ({ metadata, global, pageContext }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className='title my-32 text-center'>INFLUENCIO</h1>

      <div className='flex w-full h-full lg:flex-row flex-col'>

        <form onSubmit={handleSubmit(onSubmit)} className='max-w-screen-md'>
          <Controller
            name="name.givenName"
            control={control}
            render={({ field }) => <Input placeholder='Given name' {...field} />}
          />

          <input type='submit'/>
        </form>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getCustomPageData(
    { slug: ['register', 'influencer'] },
    locale,
    preview
  )

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} }
  }

  // We have the required page data, pass it to the page component
  const { metadata, localizations, backgroundColor=null, shortTexts, longTexts, images } = pageData

  return {
    props: {
      preview,
      metadata,
      global: globalLocale,
      pageContext: {
        slug: pageData.slug,
        locale: pageData.locale,
        locales,
        defaultLocale,
        localizations,
        backgroundColor,
        texts: {
          shortTexts,
          longTexts
        },
        images
      },
    },
  }
}

export default Influencer
