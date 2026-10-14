export function useAffiliateLinks() {
  const { affiliateTermsUrl, affiliatePrivacyUrl, affiliateEmail } = useRuntimeConfig().public

  return {
    terms: affiliateTermsUrl,
    privacy: affiliatePrivacyUrl,
    mailto: `mailto:${affiliateEmail}`
  }
}
