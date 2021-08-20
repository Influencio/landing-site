import React from 'react'
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import Input from "components/atomic/input";
import Select from "components/atomic/select";
import Datetime from 'components/atomic/datetime';
import Button from "components/elements/button";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import urls from 'utils/urls';
import textMap from 'utils/text-map';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)

import getCustomProps from "utils/custom-page-props";
export const getStaticProps = getCustomProps(['enterprise'])

const Enterprise = ({ metadata, global, pageContext }) => {
  const bgColor = '#2B3856'

  const shortTexts = textMap(pageContext.texts.shortTexts)
  const longTexts = textMap(pageContext.texts.longTexts)

  return (
    <Layout global={global} pageContext={pageContext} className="h-full">
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div
        className={`h-16 w-screen text-white text-xl text-right flex justify-end items-center pr-8`}
        style={{ backgroundColor: bgColor }}
      >
        {shortTexts.banner}
      </div>

      <div className="h-full grid grid-cols-2">
        <div
          className="h-full col-span-2 md:col-span-1 p-8 md:p-16"
          style={{ backgroundColor: bgColor }}
        >
          <h1 className="text-6xl text-white">{shortTexts.title}</h1>
          <p className="text-lg text-white mt-6">{longTexts.subtitle}</p>
        </div>
        <div className="h-full col-span-2 md:col-span-1 p-12 md:p-24">
          <div className="max-w-4xl">
            <h2 className="text-3xl mb-4">{shortTexts.formTitle}</h2>
            <ContactUsForm
              buttonText={shortTexts.submitButton}
              disclaimer={longTexts.disclaimer}
              submitSuccessText={shortTexts.submitSuccess}
              submitFailText={shortTexts.submitFail}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

const ContactUsForm = ({ buttonText, disclaimer, submitSuccessText, submitFailText }) => {
  const timezone = dayjs.tz.guess()

  const mutation = useMutation(async data => {
    const res = await fetch(`${urls.accounts}/company/open/contact-us`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"content-type": "application/json"}
    })
    const json = await res.json();
    
    if (!res.ok) {
      throw new Error(json?.message)
    }

    return json;
  });
  const { isLoading, isError, isSuccess } = mutation;

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    data.time = dayjs(data.time).format('dddd DD MMMM YYYY @ HH:mm') + ` (${timezone})`
    data.industry = data.industry.value
    data.size = data.size.value
    mutation.mutate(data);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 my-4"
      >
        <div className='flex w-full md:space-x-8 flex-col space-y-4 md:space-y-0 md:flex-row'>
          <Controller
            name="first"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="first"
                label="First name"
                placeholder="Given name"
                error={errors?.first}
                {...field}
              />
            )}
          />

          <Controller
            name="last"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="last"
                label="Last name"
                placeholder="Family name"
                error={errors?.last}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="email"
              label="Work email address"
              placeholder="name@company.com"
              error={errors?.email}
              {...field}
            />
          )}
        />

        <Controller
          name="phone.number"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="phoneNumber"
              label="Phone number"
              error={errors?.phone?.number}
              {...field}
            />
          )}
        />

        <Controller
          name="company"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="company"
              label="Company name"
              error={errors?.company}
              {...field}
            />
          )}
        />

        <Controller
          name="size"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              id="size"
              label="Company size"
              error={errors?.size}
              data={['1-49', '50-149', '150-249', '250-999', '1000+'].map(s => ({ key: s, value: s, name: s}))}
              {...field}
            />
          )}
        />

        <Controller
          name="industry"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              id="industry"
              label="Industry"
              error={errors?.industry}
              data={['Fashion', 'Beauty & cosmetics', 'Health & Fitness', 'Travel & lifestyle', 'Technology', 'FMCG'].map(s => ({ key: s, value: s, name: s}))}
              {...field}
            />
          )}
        />

        <Controller
          name="time"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Datetime
              id="time"
              label="Date & time"
              error={errors?.time}
              description={'Timezone: ' + timezone}
              {...field}
            />
          )}
        />

        {
          isSuccess ? <div className='bg-green-200 border-2 border-green-300 text-green-700 p-2 mt-2 rounded'>{submitSuccessText}</div> : null
        }

        {
          isError ? <div className='bg-red-200 border-2 border-red-300 text-gray-700 p-2 mt-2 rounded'>{submitFailText}</div> : null
        }

        <Button type='submit' appearance='dark' compact loading={isLoading} disabled={isSuccess || isLoading}>
          {buttonText}
        </Button>
      </form>
      <p className='text-gray-600'>{disclaimer}</p>
    </div>
  )
}

export default Enterprise
