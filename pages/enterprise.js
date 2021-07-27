import React from 'react'
import Input from "components/atomic/input";
import Select from "components/atomic/select";
import Datetime from 'components/atomic/datetime';
import Button from "components/elements/button";
import { useForm, Controller } from "react-hook-form";

const Enterprise = () => {
  const bgColor = '#2B3856'

  return (
    <div className='min-h-screen'>
      <div className={`h-16 w-screen text-white text-xl text-right flex justify-end items-center pr-8`} style={{ backgroundColor: bgColor }}>influencio enterprise</div>

      <div className='h-full grid grid-cols-2'>
        <div className='h-full col-span-2 md:col-span-1 p-8 md:p-16' style={{ backgroundColor: bgColor }}>
          <h1 className='text-6xl text-white'>We’re here for you at every touch point.</h1>
          <p className='text-lg text-white mt-6'>Schedule a call to learn how Influencio Enterprise can help your business build, grow, and manage enduring partnerships with influencers.</p>
        </div>
        <div className='h-full col-span-2 md:col-span-1 p-12 md:p-24'>
          <div className='max-w-4xl'>
            <h2 className='text-3xl mb-4'>Let’s talk influencer strategy</h2>
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  )
}

const ContactUsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm space-y-4 my-4"
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
              {...field}
            />
          )}
        />

        <Button type='submit' appearance='dark' compact>
          Schedule
        </Button>
      </form>
    </div>
  )
}

export default Enterprise
