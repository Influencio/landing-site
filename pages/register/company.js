import React, { useEffect, useState } from 'react'
import Steps from 'components/atomic/step';
import {BiSelectMultiple, BiDollarCircle, BiSearchAlt} from 'react-icons/bi'
import {AiOutlineUser, AiOutlineSmile} from 'react-icons/ai'
import Seo from "@/components/elements/seo"
import Layout from "@/components/layout"
import { getCustomPageData, getPageData, getGlobalData } from "utils/api"
import PricingContent from '@/components/elements/pricing-content';
import { useRouter } from 'next/router'
import { useForm, Controller } from "react-hook-form";
import Input from 'components/atomic/input';
import Button from 'components/elements/button';

export const getStaticProps = async context => {
  const { locale, locales, defaultLocale, preview = null } = context

  const globalLocale = await getGlobalData(locale)

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getCustomPageData(
    { slug: ['register', 'company'] },
    locale,
    preview
  )

  const priceData = await getPageData(
    { slug: ['pricing'] },
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
        images,
        plans: priceData.contentSections.find(section => section.__component === 'sections.pricing').plans
      },
    },
  }
}

const Company = ({ metadata, global, pageContext }) => {

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const router = useRouter()
  
  useEffect(() => {
    const { title, price, annually, action } = router.query
    if (action === 'select-plan' && (currentStep === 0 || currentStep === 1)) {
      handleSelectPlan(title, price, annually)
    }
  }, [router.query])

  const handleChange = step => {
    setCurrentStep(step)
  }

  const handleSelectPlan = (title, price, annually) => {
    const obj = { title, price, annually }
    setSelectedPlan(obj);
    setCurrentStep(1)
  }

  const steps = [
    {
      content: (
        <div>
          <h3 className="text-3xl font-bold text-center">Choose the plan that works best for you</h3>
          <PricingContent plans={pageContext.plans} />
        </div>
      ),
      title: "Select Plan",
      icon: <BiSelectMultiple />,
    },
    {
      content: <RegisterCompany selectedPlan={selectedPlan} changePlan={() => setCurrentStep(0)} />,
      title: "Register",
      icon: <AiOutlineUser />,
    },
    {
      content: <div>Something</div>,
      title: "testtesttest",
      icon: <BiDollarCircle />,
    },
    {
      content: <div>Something</div>,
      title: "testtesttest",
      icon: <AiOutlineSmile />,
    },
  ];

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className='title mt-16 text-center'>INFLUENCIO</h1>
      <h2 className='text-2xl my-8 text-center'>Make the most of your marketing budget</h2>

      <div className='flex flex-col items-center'>
        <div className='max-w-screen-xl w-full'>
          <Steps steps={steps} currentStep={currentStep} />
        </div>

        <button onClick={() => handleChange(currentStep-1)}>back</button>
        <button onClick={() => handleChange(currentStep+1)}>forward</button>
      </div>
    </Layout>
  )
}

const RegisterCompany = ({ selectedPlan, changePlan }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="text-center flex flex-col items-center">
      <h3 className="text-3xl font-bold">
        Selected plan: {selectedPlan.title}
      </h3>
      <p>{selectedPlan?.price}</p>
      <p
        className="my-2 text-lg cursor-pointer text-blue-800"
        onClick={changePlan}
      >
        Change plan
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm space-y-4 text-left my-4"
      >
        <h4 className="text-xl font-bold">Company data</h4>
        <Controller
          name="company.name"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="companyName"
              label="Name"
              placeholder="Company Name"
              error={errors?.company?.name}
              suffix={<BiSearchAlt />}
              {...field}
            />
          )}
        />

        <Controller
          name="company.country"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="companyCountry"
              label="Country"
              placeholder="eg. Denmark"
              error={errors?.company?.country}
              {...field}
            />
          )}
        />

        <Controller
          name="company.description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="companyDescription"
              label="Description"
              placeholder="eg. We make cool products for cool people"
              error={errors?.company?.description}
              {...field}
            />
          )}
        />

        <h4 className="text-xl font-bold">Your data</h4>
        <Controller
          name="user.name.givenName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="givenName"
              label="First name"
              placeholder="Given name"
              error={errors?.user?.name?.givenName}
              {...field}
            />
          )}
        />

        <Controller
          name="user.name.familyName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="familyName"
              label="Last name"
              placeholder="Family name"
              error={errors?.user?.name?.familyName}
              {...field}
            />
          )}
        />

        <Controller
          name="user.email"
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
              error={errors?.user?.email}
              {...field}
            />
          )}
        />

        <Controller
          name="user.password"
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
              error={errors?.user?.password}
              {...field}
            />
          )}
        />

        <Controller
          name="user.confirm"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          }}
          render={({ field }) => (
            <Input
              autoComplete="new-password"
              id="confirm"
              label="Confirm Password"
              placeholder="••••••••••"
              type="password"
              error={errors?.user?.confirm}
              {...field}
            />
          )}
        />

        {false ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative"
            role="alert"
          >
            <div>
              Something went wrong when creating your account:{" "}
              <span className="font-bold">{error.message}</span>
            </div>
          </div>
        ) : null}

        <Button
          appearance="dark"
          compact
          type="submit"
          // disabled={isLoading}
          // loading={isLoading}
        >
          Register
        </Button>
      </form>
    </div>
  );
};

const ValidCompanyName = ({ isNameValid }) => {
  if (isNameValid === null) return null;

  return !isNameValid ? (
    <div className="bg-red-200 border-2 border-red-300 text-gray-700 p-2 mt-2 rounded">
      A company with this name has already been registered
    </div>
  ) : (
    <div className="bg-green-200 border-2 border-green-300 text-green-700 p-2 mt-2 rounded">
      The name is available!
    </div>
  );
};

export default Company
