import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import Seo from "@/components/elements/seo";
import Layout from "@/components/layout";
import Input from "components/atomic/input";
import Textarea from "components/atomic/textarea";
import Select from "components/atomic/select";
import DatePicker from "components/atomic/date";
import Button from "components/elements/button";
import { AiOutlineUser } from 'react-icons/ai';
import Link from "next/link";
import { loginUrl } from "utils/links";
import urls from "utils/urls";
import { useRouter } from "next/router";
import textMap from "utils/text-map";
import FacebookLogin from "react-facebook-login";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { HttpError } from "utils/errors";
// import Steps from "components/atomic/step";
// import { AiOutlineProfile, AiOutlineInstagram, AiOutlineIdcard, AiOutlineSmile } from "react-icons/ai";
// import Redirect from 'components/other/redirect'

import getCustomProps from "utils/custom-page-props";
import Checkbox from "@/components/atomic/checkbox";
import Confirm from "@/components/atomic/confirm";

export const getStaticProps = async (args) => {
  const data = await getCustomProps(["register", "influencer"])(args);
  const res = await fetch(urls.tags);
  if (res.ok) {
    const json = await res.json();
    data.props.pageContext.tags = json;
  }
  return data;
};

const nationalities = [
  { long: "Danish", short: "DK" },
  { long: "Swedish", short: "SE" },
  { long: "Norwegian", short: "NO" },
  { long: "English", short: "GB" },
  { long: "German", short: "DE" },
  { long: "Spanish", short: "ES" },
  { long: "French", short: "FR" },
  { long: "Italian", short: "IT" },
  { long: "Portuguese", short: "PT" },
];

const countries = [{"long":"Afghanistan","short":"AF"},{"long":"Albania","short":"AL"},{"long":"Algeria","short":"DZ"},{"long":"Argentina","short":"AR"},{"long":"Armenia","short":"AM"},{"long":"Australia","short":"AU"},{"long":"Austria","short":"AT"},{"long":"Azerbaijan","short":"AZ"},{"long":"Bahrain","short":"BH"},{"long":"Bangladesh","short":"BD"},{"long":"Belarus","short":"BY"},{"long":"Belgium","short":"BE"},{"long":"Belize","short":"BZ"},{"long":"Bolivarian Republic of Venezuela","short":"VE"},{"long":"Bolivia","short":"BO"},{"long":"Bosnia and Herzegovina","short":"BA"},{"long":"Brazil","short":"BR"},{"long":"Brunei Darussalam","short":"BN"},{"long":"Bulgaria","short":"BG"},{"long":"Cambodia","short":"KH"},{"long":"Canada","short":"CA"},{"long":"Chile","short":"CL"},{"long":"Colombia","short":"CO"},{"long":"Costa Rica","short":"CR"},{"long":"Croatia","short":"HR"},{"long":"Czech Republic","short":"CZ"},{"long":"Denmark","short":"DK"},{"long":"Dominican Republic","short":"DO"},{"long":"Ecuador","short":"EC"},{"long":"Egypt","short":"EG"},{"long":"El Salvador","short":"SV"},{"long":"Estonia","short":"EE"},{"long":"Ethiopia","short":"ET"},{"long":"Faroe Islands","short":"FO"},{"long":"Finland","short":"FI"},{"long":"France","short":"FR"},{"long":"Georgia","short":"GE"},{"long":"Germany","short":"DE"},{"long":"Greece","short":"GR"},{"long":"Greenland","short":"GL"},{"long":"Guatemala","short":"GT"},{"long":"Honduras","short":"HN"},{"long":"Hong Kong S.A.R.","short":"HK"},{"long":"Hungary","short":"HU"},{"long":"Iceland","short":"IS"},{"long":"India","short":"IN"},{"long":"Indonesia","short":"ID"},{"long":"Iran","short":"IR"},{"long":"Iraq","short":"IQ"},{"long":"Ireland","short":"IE"},{"long":"Islamic Republic of Pakistan","short":"PK"},{"long":"Israel","short":"IL"},{"long":"Italy","short":"IT"},{"long":"Jamaica","short":"JM"},{"long":"Japan","short":"JP"},{"long":"Jordan","short":"JO"},{"long":"Kazakhstan","short":"KZ"},{"long":"Kenya","short":"KE"},{"long":"Korea","short":"KR"},{"long":"Kuwait","short":"KW"},{"long":"Kyrgyzstan","short":"KG"},{"long":"Lao P.D.R.","short":"LA"},{"long":"Latvia","short":"LV"},{"long":"Lebanon","short":"LB"},{"long":"Libya","short":"LY"},{"long":"Liechtenstein","short":"LI"},{"long":"Lithuania","short":"LT"},{"long":"Luxembourg","short":"LU"},{"long":"Macao S.A.R.","short":"MO"},{"long":"Macedonia (FYROM)","short":"MK"},{"long":"Malaysia","short":"MY"},{"long":"Maldives","short":"MV"},{"long":"Malta","short":"MT"},{"long":"Mexico","short":"MX"},{"long":"Mongolia","short":"MN"},{"long":"Montenegro","short":"ME"},{"long":"Morocco","short":"MA"},{"long":"Nepal","short":"NP"},{"long":"Netherlands","short":"NL"},{"long":"New Zealand","short":"NZ"},{"long":"Nicaragua","short":"NI"},{"long":"Nigeria","short":"NG"},{"long":"Norway","short":"NO"},{"long":"Oman","short":"OM"},{"long":"Panama","short":"PA"},{"long":"Paraguay","short":"PY"},{"long":"People's Republic of China","short":"CN"},{"long":"Peru","short":"PE"},{"long":"Philippines","short":"PH"},{"long":"Poland","short":"PL"},{"long":"Portugal","short":"PT"},{"long":"Principality of Monaco","short":"MC"},{"long":"Puerto Rico","short":"PR"},{"long":"Qatar","short":"QA"},{"long":"Republic of the Philippines","short":"PH"},{"long":"Romania","short":"RO"},{"long":"Russia","short":"RU"},{"long":"Rwanda","short":"RW"},{"long":"Saudi Arabia","short":"SA"},{"long":"Senegal","short":"SN"},{"long":"Serbia","short":"RS"},{"long":"Singapore","short":"SG"},{"long":"Slovakia","short":"SK"},{"long":"Slovenia","short":"SI"},{"long":"South Africa","short":"ZA"},{"long":"Spain","short":"ES"},{"long":"Sri Lanka","short":"LK"},{"long":"Sweden","short":"SE"},{"long":"Switzerland","short":"CH"},{"long":"Syria","short":"SY"},{"long":"Taiwan","short":"TW"},{"long":"Tajikistan","short":"TJ"},{"long":"Thailand","short":"TH"},{"long":"Trinidad and Tobago","short":"TT"},{"long":"Tunisia","short":"TN"},{"long":"Turkey","short":"TR"},{"long":"Turkmenistan","short":"TM"},{"long":"U.A.E.","short":"AE"},{"long":"Ukraine","short":"UA"},{"long":"United Kingdom","short":"GB"},{"long":"United States","short":"US"},{"long":"Uruguay","short":"UY"},{"long":"Uzbekistan","short":"UZ"},{"long":"Vietnam","short":"VN"},{"long":"Yemen","short":"YE"},{"long":"Zimbabwe","short":"ZW"}]

const postUser = async (user, managedAccess) => {
  user.role = "influencer";
  user.tags = user?.tags?.map((tag) => tag.value);
  if (user.location && user.location.country) {
    user.location.country = user.location.country.value
  }
  const res = await fetch(`${urls.auth}/auth/register${managedAccess ? `?managedAccess=${managedAccess}` : ''}`, {
    method: "POST",
    credentials: 'include',
    body: JSON.stringify(user),
    headers: { "content-type": "application/json" },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new HttpError(json?.message, res.status, json);
  }

  return json;
};

const postCollab = async (collab, id, access_token) => {
  const res = await fetch(`${urls.accounts}/collaboration/influencer/${id}`, {
    method: "POST",
    credentials: 'include',
    body: JSON.stringify(collab),
    headers: { "content-type": "application/json", authorization: access_token ? `Bearer ${access_token}` : null },
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message);
  }

  return json;
};

const Influencer = ({ metadata, global, pageContext }) => {
  const shortTexts = textMap(pageContext.texts.shortTexts);
  // const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter()

  // const steps = [
  //   {
  //     content: (
  //       <InfoForm shortTexts={shortTexts} tags={pageContext?.tags} onSuccess={() => setCurrentStep(1)} />
  //     ),
  //     title: 'Info',
  //     icon: <AiOutlineIdcard />
  //   },
  //   {
  //     content: <CollabForm />,
  //     title: 'Collaboration',
  //     icon: <AiOutlineProfile />
  //   },
  //   {
  //     content: <AddIg />,
  //     title: 'Media',
  //     icon: <AiOutlineInstagram />
  //   },
  //   {
  //     title: 'Done',
  //     icon: <AiOutlineSmile />,
  //     content: <Redirect title="Hold on, we're redirecting you!" stuckText='Stuck? Click here' />
  //   },
  // ]

  return (
    <Layout global={global} pageContext={pageContext}>
      {/* Add meta tags for SEO*/}
      <Seo metadata={metadata} />

      <div className='container max-w-6xl'>
        <h1 className="title mt-16 text-center">{shortTexts.title}</h1>
        <h2 className="text-2xl my-8 text-center">{shortTexts.subTitle}</h2>

        {/* <Steps steps={steps} currentStep={currentStep} /> */}
        <InfoForm shortTexts={shortTexts} tags={pageContext?.tags} onSuccess={() => router.push('/register/success')} />
      </div>
    </Layout>
  );
};

const InfoForm = ({ shortTexts, tags, onSuccess }) => {

  const router = useRouter();

  const mutation = useMutation((user) => postUser(user, managedAccess), {
    onSuccess: data => {
      onSuccess && onSuccess()

      // // Set cookie
      // const date = new Date();
      // date.setTime(date.getTime() + (60 * 60 * 1000)); // 1 hour
      // const expires = "expires=" + date.toUTCString();
      // document.cookie = "account=" + data.account + "; " + expires + "; path=/";
      // document.cookie = "influencio_temp_access_token=" + data.token + "; " + expires + "; path=/";
    }
  });
  const { isLoading, isError, error, isSuccess } = mutation;

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();
  
  const onSubmit = (data) => mutation.mutate(data);

  useEffect(() => {
    if (getCookie('account')) {
      onSuccess && onSuccess()
    }
  }, [])

  const { managedAccess } = router.query

  let managedAccessPayload
  if (managedAccess) {
    managedAccessPayload = jwtDecode(managedAccess)
  }

  const isInvalidManagedRequest = (new Date(managedAccessPayload?.exp * 1000) < new Date())
  
  return (
    <div className="flex w-full flex-col items-center mb-10 container max-w-xl">

      <Confirm 
        type='danger'
        open={isInvalidManagedRequest}
        title='Invalid request'
        text={
          <div>
            Your request for joining under management of <strong>{managedAccessPayload?.company.name}</strong> is invalid. Please reach out to {managedAccessPayload?.company.name} to request a new link.
          </div>
        }
        onOk={() => {
          router.push('/register/influencer')
        }}
        cancelText='Close'
      />

      {
        managedAccess && managedAccessPayload ? (
          <div className="border border-gray-100 shadow-md px-8 py-6 xl:absolute w-full xl:w-auto mb-8 right-12 top-[150px] bg-white rounded-xl">
            <h3 className="font-bold text-xl">Managed Access</h3>
            <div className="mb-4">Your account will be managed by</div>

            {
              managedAccessPayload.company.logo ? (
                <img src={managedAccessPayload.company.logo} alt={`${managedAccessPayload.company.name} logo`} className="h-20 w-20 rounded-full mx-auto" />
              ) : null
            }

            <h4 className="font-bold text-lg text-center my-2">{managedAccessPayload.company?.name}</h4>
            <div>
              {
                managedAccessPayload.agentsData?.map(agent => (
                  <div className="flex space-x-3 items-center">
                    {
                      agent.avatar ? (
                        <img alt={`profile picture of ${agent.name?.fullName}`} src={agent.avatar} className='rounded-full h-8 w-8' />
                      ) : (
                        <AiOutlineUser className="h-8 w-8 p-1 bg-gray-200 rounded-full" />
                      )
                    }

                    <div>{agent.name?.fullName}</div>
                  </div>
                ))
              }
            </div>
          </div>
        ) : null
      }

      <FacebookSignUp managedAccess={managedAccess} />

      <h3 className='font-bold text-3xl text-center my-16'>Or</h3>

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

        <div className="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
          <Controller
            name="shipping.zip"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="zip"
                label="ZIP code"
                error={errors?.shipping?.zip}
                className="w-full"
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
                className="w-full"
                {...field}
              />
            )}
          />
        </div>

        <Controller
          name="location.country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              id="country"
              label="Country"
              width="full"
              defaultValue={{key: 'Denmark', value: { long: 'Denmark', short: 'DK'}, name: 'Denmark'}}
              error={errors?.location?.country}
              data={countries.map((country) => ({
                key: country.long,
                value: country,
                name: country.long,
              }))}
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
                value={value}
              />
            );
          }}
        />

        <Controller
          name="tags"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please select at least one category",
            },
          }}
          render={({ field }) => (
            <Select
              id="tags"
              selectMultiple={1}
              maxSelectable={5}
              label="Select your niche categories (Choose up to 5)"
              width="full"
              error={errors?.tags}
              data={tags.map(({ tag }) => ({
                key: tag,
                value: tag,
                name: tag,
              }))}
              {...field}
            />
          )}
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
          name='terms'
          control={control}
          rules={{
            validate: (value) => value || "You must accept the terms and conditions",
          }}
          render={({ field }) => (
            <Checkbox
              id="terms"
              label={
                <>
                  I have read, understood and agreed to the{" "}
                  <Link href="/terms-of-service"><a className='text-blue-500'>terms of service</a></Link>
                  {" "} and the {" "}
                  <Link href="/privacy-policy"><a className='text-blue-500'>privacy policy</a></Link>.
                </>
              }
              error={errors?.terms}
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
      <Link href={loginUrl}>
        <div className="mt-6">{shortTexts.loginLink}</div>
      </Link>
    </div>
  );
};

const CollabForm = ({ onSuccess }) => {
  const account = getCookie('account');
  const access_token = getCookie('influencio_temp_access_token')

  const mutation = useMutation((collab) => postCollab(collab, account, access_token), {
    onSuccess: data => {
      onSuccess && onSuccess()
    }
  });
  const { isLoading, isSuccess } = mutation;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className='flex w-full flex-col items-center mb-10 container max-w-xl'>
    <h3 className='font-bold text-xl text-center my-16'>Create your first collaboration!</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-screen-sm space-y-4"
      >
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="title"
              label="Title"
              error={errors?.title}
              {...field}
            />
          )}
        />

        <Controller
          name="companyName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="companyName"
              label="Company name"
              error={errors?.companyName}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <Textarea
              id="description"
              placeholder="Describe what the collaboration was about"
              label="Description"
              error={errors?.companyName}
              {...field}
            />
          )}
        />

        <Controller
          name="country"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              id="country"
              label="Country"
              width="full"
              defaultValue={{key: "Denmark", value: { long: "Denmark", short: "DK" }, name: "Denmark" }}
              error={errors?.country}
              data={countries.map((country) => ({
                key: country.long,
                value: country,
                name: country.long,
              }))}
              {...field}
            />
          )}
        />


        <Controller
          name="startDate"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <DatePicker
              id="startDate"
              label="Start date"
              error={errors?.startDate}
              description='Leave blank if it was a one time collaboration'
              {...field}
            />
          )}
        />

        <Controller
          name="date"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <DatePicker
              id="date"
              label="End date"
              error={errors?.startDate}
              description="Leave blank if it's still ongoing"
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
          Next
        </Button>
      </form>
      </div>
  )
}

const AddIg = () => {

  return (
    <div className='flex justify-center items-center flex-col container max-w-xl mb-16'>
      <h3 className='font-bold text-xl text-center my-16'>Now you’re only seconds away from being a member of Influencio, you just need to connect your Instagram.</h3>

      <FacebookSignUp />
    </div>
  )
}

const FacebookSignUp = ({ managedAccess }) => {
  const router = useRouter();

  const handleFacebookResponse = async (data) => {
    if (!data?.accessToken) {
      toast.warning("Facebook authentication failed");
      throw new Error("disable");
    }

    const res = await fetch(`${urls.accounts}/user/third-party/instagram`, {
      method: "POST",
      credentials: 'include',
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        access_token: data.accessToken,
        managedAccess: managedAccess
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json?.message);
    }

    return json;
  };

  const mutation = useMutation((data) => handleFacebookResponse(data), {
    onError: (data) => {
      if (data.message === "disable") return;
      toast.error(data?.message || "Unable to create account with Facebook");
    },
    onSuccess: data => {
      router.push(data.passwordResetUrl || `/register/success`);
    }
  });
  const { isLoading, isSuccess } = mutation;

  const callback = (data) => {
    const prom = mutation.mutateAsync(data);
    toast.promise(prom, {
      pending: "Creating your account",
      error: `Couldn't create your account`,
      success: "Your account has been created!",
    });
  };

  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
      scope='instagram_basic,pages_show_list,email,instagram_manage_insights,pages_read_engagement'
      fields="name,email,picture"
      callback={callback}
      cssClass='px-12 py-4 rounded bg-[#4473C9] text-white font-bold'
      isDisabled={isLoading || isSuccess}
      redirectUri={(urls.accountsOld || urls.accounts) + `/user/third-party/callback/instagram${managedAccess ? `?managedAccess=${managedAccess}` : ''}`}
      textButton='Continue with Facebook'
    />
  );
};

function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded .split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

export default Influencer;
