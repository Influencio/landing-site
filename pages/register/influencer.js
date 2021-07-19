import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { getCustomPageData, getGlobalData } from "utils/api"
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Input from 'components/atomic/input';
import Button from 'components/elements/button';
import Link from 'next/link';
import { loginUrl } from 'utils/links';

const postUser = async user => {
    user.role = 'influencer'

    const res = await fetch("https://auth.staging.influencio.dk/auth/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {"content-type": "application/json"}
    })

    const json = await res.json();
    
    if (!res.ok) {
      throw new Error(json?.message)
    }

    return json;
  }

const Influencer = ({ metadata, global, pageContext }) => {
  const mutation = useMutation((user) => postUser(user));
  console.log("🚀 ~ file: influencer.js ~ line 21 ~ Influencer ~ mutation", mutation)
  const { isLoading, isError, error, isSuccess } = mutation;

  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const onSubmit = data => mutation.mutate(data);;

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className='title mt-16 text-center'>INFLUENCIO</h1>
      <h2 className='text-2xl my-8 text-center'>Accelerate your Influencer career</h2>

      <div className='flex w-full flex-col items-center mb-10'>

        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-screen-sm space-y-4'>
          <Controller
            name="name.givenName"
            control={control}
            defaultValue=''
            rules={{ required: true }}
            render={({ field }) => <Input id='givenName' label='First name' placeholder='Given name' error={errors?.name?.givenName} {...field} />}
          />

          <Controller
            name="name.familyName"
            control={control}
            defaultValue=''
            rules={{ required: true }}
            render={({ field }) => <Input id='familyName' label='Last name' placeholder='Family name' error={errors?.name?.familyName} {...field} />}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=''
            rules={{ required: true }}
            render={({ field }) => <Input autoComplete='email' id='email' label='E-mail' placeholder='email@example.com' type='email' error={errors?.email} {...field} />}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=''
            rules={{ required: true }}
            render={({ field }) => <Input autoComplete='new-password' id='password' label='Password' placeholder='••••••••••' type='password' error={errors?.password} {...field} />}
          />

          <Controller
            name="confirm"
            control={control}
            defaultValue=''
            rules={{ required: true, validate: (value) => value === watch('password') || 'Passwords do not match' }}
            render={({ field }) => <Input autoComplete='new-password' id='confirm' label='Confirm Password' placeholder='••••••••••' type='password' error={errors?.confirm} {...field} />}
          />
          
          <Button 
            appearance='dark' 
            compact 
            type='submit' 
            disabled={isLoading}
            loading={isLoading}
          >
            Register
          </Button>

        </form>
        <Link href={loginUrl}>Already have an account? Login here</Link>
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
