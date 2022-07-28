import React from "react";
import { getCustomPageData, getPageData, getGlobalData } from "utils/api";
import urls from 'utils/urls'

import Company from "@/components/forms/register-company";

export const getStaticProps = async (context) => {
  const { locale, locales, defaultLocale, preview = null } = context;

  const globalLocale = await getGlobalData(locale);

  // Fetch pages. Include drafts if preview mode is on
  const pageData = await getCustomPageData(
    { slug: ["register", "agency"] },
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
      metadata: {
        ...metadata,
        companyType: 'agency'
      },
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
      type: 'agency'
    },
  };
};

const RegisterAgency = props => <Company {...props} />

export default RegisterAgency;
