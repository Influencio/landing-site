import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Input from 'components/atomic/input';
import Button from 'components/elements/button';
import Link from 'next/link';
import { loginUrl } from 'utils/links';
import urls from 'utils/urls';
import { useRouter } from 'next/router'

import getCustomProps from "utils/custom-page-props";

export const getStaticProps = getCustomProps(['register', 'influencer'])

const postUser = async user => {
    user.role = 'influencer'

    const res = await fetch(`${urls.auth}/auth/register`, {
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
  const router = useRouter()

  const mutation = useMutation((user) => postUser(user));
  const { isLoading, isError, error, isSuccess } = mutation;
  
  useEffect(() => {
    if (isSuccess) {
      router.push('/register/success')
    }
  }, [isSuccess])

  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const onSubmit = data => mutation.mutate(data);

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

          {
            isError ? 
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
              <div>Something went wrong when creating your account: <span className='font-bold'>{error.message}</span></div> 
            </div>: null
          }


          <Button 
            appearance='dark' 
            compact 
            type='submit' 
            disabled={isLoading || isSuccess}
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

export default Influencer
