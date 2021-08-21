import React, { useEffect, useState } from "react";
import Steps from "components/atomic/step";
import { BiSelectMultiple, BiDollarCircle, BiSearchAlt } from "react-icons/bi";
import { AiOutlineUser, AiOutlineSmile } from "react-icons/ai";
import Seo from "@/components/elements/seo";
import Layout from "@/components/layout";
import { getCustomPageData, getPageData, getGlobalData } from "utils/api";
import PricingContent from "@/components/elements/pricing-content";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import Input from "components/atomic/input";
import Select from "components/atomic/select";
import Button from "components/elements/button";
import urls from 'utils/urls'
import { useQuery } from "react-query";

import tw, { css } from 'twin.macro'

export const getStaticProps = async (context) => {
  const { locale, locales, defaultLocale, preview = null } = context;

  const globalLocale = await getGlobalData(locale);

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getCustomPageData(
    { slug: ["register", "company"] },
    locale,
    preview
  );

  // Get pricing data from pricing page
  const priceData = await getPageData({ slug: ["pricing"] }, locale, preview);

  // Get tax id types
  const taxIdTypesRaw = await (await fetch(`${urls.landing}/static/tax-id-countries.json`, {headers: {"content-type": "application/json"}})).json()
  const taxIdTypes = taxIdTypesRaw.map(t => ({ key: t.code + '.' + t.country, value: t.code, name: t.country + (t.version ? ` (${t.version})` : '') }))

  if (pageData == null) {
    // Giving the page no props will trigger a 404 page
    return { props: {} };
  }

  // We have the required page data, pass it to the page component
  const {
    metadata,
    localizations,
    backgroundColor = null,
    shortTexts,
    longTexts,
    images,
  } = pageData;

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
          longTexts,
        },
        images,
        plans: priceData.contentSections.find(
          (section) => section.__component === "sections.pricing"
        ).plans,
        taxIdTypes
      },
    },
  };
};

const Company = ({ metadata, global, pageContext }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const curStep = localStorage.getItem('currentStep')
    const plan = localStorage.getItem('selectedPlan')
    if (curStep) {
      setCurrentStep(parseInt(curStep))
      setSelectedPlan(JSON.parse(plan))
    }
  }, [])

  useEffect(() => {
    const { title, price, annually, action, skipPayment } = router.query;
    if (action === "select-plan" && (currentStep === 0 || currentStep === 1)) {
      handleSelectPlan(title, price, annually, skipPayment);
    }
  }, [router.query]);

  const handleChange = (step) => {
    setCurrentStep(step);
  };

  const handleSelectPlan = (title, price, annually, skipPayment) => {
    if (currentStep > 1) return;

    const obj = { title, price, annually, skipPayment };
    setSelectedPlan(obj);
    setCurrentStep(1);
  };

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep)
    localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan))
  }, [currentStep])

  const steps = [
    {
      content: (
        <div>
          <h3 className="text-3xl font-bold text-center">
            Choose the plan that works best for you
          </h3>
          <PricingContent plans={pageContext.plans} />
        </div>
      ),
      title: "Select Plan",
      icon: <BiSelectMultiple />,
    },
    {
      content: (
        <RegisterCompany
          selectedPlan={selectedPlan}
          changePlan={() => setCurrentStep(0)}
          onSuccess={() => {
            setCurrentStep(selectedPlan.skipPayment ? 3 : 2)
          }}
        />
      ),
      title: "Register",
      icon: <AiOutlineUser />,
    },
    {
      content: (
        <Pay
          taxIdTypes={pageContext.taxIdTypes}
          onSuccess={() => {
            setTimeout(() => router.push("/register/success"), 300)
            setCurrentStep(currentStep+1)
          }}
        />
      ),
      title: "Pay",
      icon: <BiDollarCircle />,
    },
    {
      title: "Done",
      icon: <AiOutlineSmile />,
      content: <Redirect />
    },
  ];

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <h1 className="title mt-16 text-center">INFLUENCIO</h1>
      <h2 className="text-2xl my-8 text-center">
        Make the most of your marketing budget
      </h2>

      <div className="flex flex-col items-center">
        <div className="max-w-screen-xl w-full">
          <Steps steps={steps} currentStep={currentStep} />
        </div>

        <button onClick={() => handleChange(currentStep - 1)}>back</button>
        <button onClick={() => handleChange(currentStep + 1)}>forward</button>
      </div>
    </Layout>
  );
};

const Redirect = () => {
  const redirectCooldown = 1000;
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => router.push("/register/success"), redirectCooldown);
  });
  return (
    <div className="flex items-center justify-center w-full">
      <div tw="space-y-2 text-center w-full max-w-sm">
        <h4 className="text-xl font-bold">Redirecting you</h4>
        <div className="h-3 mt-2 relative w-12 rounded-full overflow-hidden">
          <div className="w-full h-full bg-gray-200 absolute"></div>
          <div
            className="h-full bg-blue-500 absolute"
            css={css`
              @keyframes expandWidth {
                0% {
                  width: 0;
                }
                50% {
                  width: 10%;
                }
                75% {
                  width: 85%;
                }
                100% {
                  width: 100%;
                }
              }
              animation: ${redirectCooldown}ms forwards 0s 1 expandWidth;
            `}
          />
        </div>
        <div onClick={() => router.push("/register/success")}>
          Stuck? Click here
        </div>
      </div>
    </div>
  );
};

const RegisterCompany = ({ selectedPlan, changePlan, onSuccess }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const fetchSearch = async () => (
    await (await fetch(`${urls.accounts}/company/registered?name=${searchTerm}`)).json()
  )

  const { data, isSuccess, refetch, isFetching } = useQuery('isRegistered', fetchSearch, {
    efetchOnWindowFocus: false,
    enabled: false
  })

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm])

  return (
    <div className="text-center flex flex-col items-center">
      <h3 className="text-3xl font-bold">
        Selected plan: {selectedPlan?.title}
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
              type='search'
              isLoading={isFetching}
              onSearch={value => setSearchTerm(value)}
              {...field}
            />
          )}
        />

        {
          isSuccess && data ? <ValidCompanyName isNameValid={!data.isRegistered} /> : null
        }

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
              value === getValues("user.password") || "Passwords do not match",
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
                error={errors?.user?.confirm}
                ref={ref}
                onBlur={onBlur}
                onChange={(value) => {
                  onChange(value);
                  trigger("user.confirm");
                }}
                validateIcon={1}
                value={value}
              />
            );
          }}
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
          disabled={!data || data.isRegistered}
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

const Pay = ({ taxIdTypes, onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    onSuccess(data)
  }

  return (
    <div className="text-center flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm space-y-4 text-left my-4"
      >
        <div className='flex w-full md:space-x-8 flex-col space-y-4 md:space-y-0 md:flex-row'>
          <Controller
            name="address.city"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="city"
                label="City"
                error={errors?.address?.city}
                {...field}
              />
            )}
          />

          <Controller
            name="address.country"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="country"
                label="Country"
                error={errors?.address?.country}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="address.line1"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="line1"
              label="Address Line 1"
              error={errors?.address?.line1}
              {...field}
            />
          )}
        />

        <Controller
          name="address.line2"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              id="line2"
              label="Address Line 2"
              error={errors?.address?.line2}
              {...field}
            />
          )}
        />

        <div className='flex w-full md:space-x-8 flex-col space-y-4 md:space-y-0 md:flex-row'>
          <Controller
            name="address.postal_code"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="postal_code"
                label="Postal Code"
                error={errors?.address?.postal_code}
                {...field}
              />
            )}
          />

          <Controller
            name="address.state"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="state"
                label="State"
                error={errors?.address?.state}
                {...field}
              />
            )}
          />
        </div>

        <div className='flex w-full md:space-x-8 flex-col space-y-4 md:space-y-0 md:flex-row'>
          <Controller
            name="tax_id_type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                id="tax_id_type"
                label="Tax ID type"
                error={errors?.tax_id_type}
                data={taxIdTypes}
                width='full'
                defaultValue={taxIdTypes.find(t => t.name === 'Denmark')}
                {...field}
              />
            )}
          />

          <Controller
            name="tax_id"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="tax_id"
                label="Tax ID"
                error={errors?.tax_id}
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="code"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              id="discountCode"
              label="Discount Code"
              placeholder="WELCOME20"
              type='search'
              enterButton='Apply'
              onSubmit={search => console.log('submit', search)}
              {...field}
            />
          )}
        />

        {/* TODO: Add stripe payment integration */}

        <Button type='submit' appearance='dark' compact>
          Pay
        </Button>
      </form>
    </div>
  )
}

export default Company;
