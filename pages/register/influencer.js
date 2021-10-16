import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Input from 'components/atomic/input';
import Select from 'components/atomic/select';
import DatePicker from 'components/atomic/date';
import Button from 'components/elements/button';
import Link from 'next/link';
import { loginUrl } from 'utils/links';
import urls from 'utils/urls';
import { useRouter } from 'next/router'
import textMap from 'utils/text-map';
import FacebookLogin from 'react-facebook-login';
import { toast } from 'react-toastify';

import getCustomProps from "utils/custom-page-props";

export const getStaticProps = async args => {
  const data = await getCustomProps(['register', 'influencer'])(args)
  const res = await fetch(urls.tags)
  if (res.ok) {
    const json = await res.json();
    data.props.pageContext.tags = json;
  }
  return data;
}

const nationalities = [{"long":"Danish","short":"DK"}, {"long":"Swedish","short":"SE"}, {"long":"Norwegian","short":"NO"}, {"long":"English","short":"GB"}, {"long":"German","short":"DE"}, {"long":"Spanish","short":"ES"}, {"long":"French","short":"FR"}, {"long":"Italian","short":"IT"}, {"long":"Portuguese","short":"PT"}]

const postUser = async user => {
  user.role = 'influencer'
  user.tags = user?.tags?.map(tag => tag.value);
  user.nationality = user?.nationality?.value
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
  const shortTexts = textMap(pageContext.texts.shortTexts)

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className="title mt-16 text-center">{shortTexts.title}</h1>
      <h2 className="text-2xl my-8 text-center">{shortTexts.subTitle}</h2>

      <InfoForm shortTexts={shortTexts} tags={pageContext?.tags} />
    </Layout>
  );
}

const InfoForm = ({ shortTexts, tags }) => {

  const mutation = useMutation((user) => postUser(user));
  const { isLoading, isError, error, isSuccess } = mutation;
  
  // useEffect(() => {
  //   if (isSuccess) {
  //     // router.push('/register/success')
  //   }
  // }, [isSuccess])

  const { control, handleSubmit, formState: { errors }, watch, trigger } = useForm();
  const onSubmit = data => mutation.mutate(data);

  return (
<div className="flex w-full flex-col items-center mb-10 container">
        <div>
          <FacebookSignUp />
        </div>

        <div className='my-8 font-bold text-2xl'>or</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-screen-sm space-y-4"
        >
          <Controller
            name="name.givenName"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="givenName"
                label="First name"
                placeholder="Given name"
                error={errors?.name?.givenName}
                {...field}
              />
            )}
          />

          <Controller
            name="name.familyName"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="familyName"
                label="Last name"
                placeholder="Family name"
                error={errors?.name?.familyName}
                {...field}
              />
            )}
          />

        <Controller
          name="dob"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              id="dob"
              label="Date of birth (this is not public)"
              error={errors?.dob}
              {...field}
            />
          )}
        />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                autoComplete="email"
                id="email"
                label="E-mail"
                placeholder="email@example.com"
                type="email"
                error={errors?.email}
                {...field}
              />
            )}
          />

          <Controller
            name="shipping.address"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="address"
                label="Address"
                error={errors?.shipping?.address}
                {...field}
              />
            )}
          />

          <div className='flex flex-col md:flex-row md:space-x-3'>
            <Controller
              name="shipping.zip"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  id="zip"
                  label="ZIP code"
                  error={errors?.shipping?.zip}
                  className='w-full'
                  {...field}
                />
              )}
            />

            <Controller
              name="location.city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  id="city"
                  label="City"
                  error={errors?.location?.city}
                  className='w-full'
                  {...field}
                />
              )}
            />
          </div>

          <Controller
            name="nationality"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                id="nationality"
                label="Nationality"
                width='full'
                error={errors?.nationality}
                data={nationalities.map(nationality => ({ key: nationality.long, value: nationality, name: nationality.long}))}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                autoComplete="new-password"
                id="password"
                label="Password"
                placeholder="••••••••••"
                type="password"
                error={errors?.password}
                {...field}
              />
            )}
          />

          <Controller
            name="confirm"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            }}
            render={({ field }) => {
              const { onChange, onBlur, ref, value } = field;
            return (
              <Input
                autoComplete="new-password"
                id="confirm"
                label="Confirm Password"
                placeholder="••••••••••"
                type="password"
                error={errors?.confirm}
                validateIcon={1}
                ref={ref}
                onBlur={onBlur}
                onChange={(value) => {
                  onChange(value);
                  trigger("confirm");
                }}
                validateIcon={1}
                value={value}
              />
            )}}
          />

          {isError ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative"
              role="alert"
            >
              <div>
                {shortTexts.errorMessage}{" "}
                <span className="font-bold">{error.message}</span>
              </div>
            </div>
          ) : null}

          <Controller
            name="tags"
            control={control}
            rules={{ required: { value: true, message: 'Please select atleast one category' }}}
            render={({ field }) => (
              <Select
                id="tags"
                selectMultiple={1}
                maxSelectable={5}
                label="Select your niche categories (Choose up to 5)"
                width='full'
                error={errors?.tags}
                data={tags.map(({tag}) => ({ key: tag, value: tag, name: tag}))}
                {...field}
              />
            )}
          />

          <Button
            appearance="dark"
            compact
            type="submit"
            disabled={isLoading || isSuccess}
            loading={isLoading}
          >
            {shortTexts.submitButton}
          </Button>
        </form>
        <Link href={loginUrl}><div className='mt-6'>{shortTexts.loginLink}</div></Link>
      </div>
  )
}

const FacebookSignUp = () => {
  const router = useRouter()

  const handleFacebookResponse = async data => {
    if (!data?.accessToken) {
      toast.warning('Facebook authentication failed')
      throw new Error('disable')
    }

    const res = await fetch(`${urls.accounts}/user/third-party/instagram`, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        access_token: data.accessToken
      })
    })

    const json = await res.json();
    
    if (!res.ok) {
      throw new Error(json?.message)
    }

    return json;
  }

  const mutation = useMutation((data) => handleFacebookResponse(data), {
    onError: data => {
      if (data.message === 'disable') return;
      toast.error(data?.message || 'Unable to create account using Facebook')
    },
    onSuccess: data => {
      router.push(`/register/success?action=reset-password&email=${data.email}`);
    }
  });
  const { isLoading, isSuccess } = mutation;

  const callback = data => {
    const prom = mutation.mutateAsync(data)
    toast.promise(prom, {
      pending: 'Creating your account',
      error: `Couldn't create your account`,
      success: 'Your account has been created!'
    })
  }

  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
      scope='instagram_basic,pages_show_list,email,instagram_manage_insights,pages_read_engagement'
      fields="name,email,picture"
      callback={callback}
      cssClass='px-12 py-4 rounded bg-[#4473C9] text-white font-bold'
      isDisabled={isLoading || isSuccess}
      redirectUri={urls.accounts + '/user/third-party/callback/instagram'}
    />
  )
}

export default Influencer
