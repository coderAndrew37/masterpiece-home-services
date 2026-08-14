import { groq } from "next-sanity";

// Shared projection so list/detail/related all return the same card shape
const postCardProjection = groq`{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  readingTime,
  noIndex,
  "author": author->{ name, "slug": slug.current, image },
  "categories": categories[]->{ title, "slug": slug.current }
}`;

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) ${postCardProjection}
`;

// Used on the homepage — most recent 3 posts only.
export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc)[0...3] ${postCardProjection}
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    body,
    faqs,
    publishedAt,
    updatedAt,
    readingTime,
    tags,
    noIndex,
    seoTitle,
    seoDescription,
    seoImage,
    "author": author->{ name, "slug": slug.current, image, role, bio },
    "categories": categories[]->{ title, "slug": slug.current },
    "relatedServiceSlugs": relatedServices[]->slug.current,
    "relatedServiceAreaSlugs": relatedServiceAreas[]->slug.current
  }
`;

// Related posts: share at least one category, excluding the current post,
// most recent first, capped at 3.
export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && count((categories[]->slug.current)[@ in $categorySlugs]) > 0]
  | order(publishedAt desc)[0...3]
  ${postCardProjection}
`;

// Homepage "Our Work Gallery" section — fetches all individual 
// gallery items ordered by newest first.
export const homeGalleryQuery = groq`
  *[_type == "homeGalleryItem"] | order(_createdAt desc) {
    _id,
    title,
    category,
    "image": image.asset->url,
    alt
  }
`;

export const allServicesQuery = /* groq */ `
*[_type == "service"] | order(order asc) {
  _id, 
  title, 
  "slug": slug.current, 
  "cardImage": cardImage.asset->url,
  "cardImageAlt": cardImage.alt,
  shortDescription,
  features, 
  icon, 
  badge, 
  startingPrice, 
  featuredOnHome, 
  homeSubtitle
}`;

export const serviceBySlugQuery = /* groq */ `
*[_type == "service" && slug.current == $slug][0] {
  _id, title, "slug": slug.current, subtitle, seoTitle, seoDescription,
  heroImage, "cardImage": cardImage.asset->url, icon, badge, startingPrice, description,
  whatsIncluded, benefits, processSteps, faqs
}`;

export const serviceSlugsQuery = /* groq */ `*[_type == "service"].slug.current`;

export const pricingPageQuery = /* groq */ `
*[_type == "pricingPage"][0]{
  heroTagline, heroTitle, heroDescription,
  residentialPricing, commercialPricing, addons, faqs
}`;

export const serviceAreasQuery = /* groq */ `
*[_type == "serviceArea" && published == true] | order(order asc) {
  _id, name, "slug": slug.current, intro, heroImage
}`;

export const serviceAreaBySlugQuery = /* groq */ `
*[_type == "serviceArea" && slug.current == $slug && published == true][0] {
  _id, name, "slug": slug.current, region, intro, localHook, heroImage,
  seoTitle, seoDescription,
  relatedServices[]{
    blurb,
    "service": service->{ title, "slug": slug.current, icon }
  }
}`;

export const serviceAreaSlugsQuery = /* groq */ `
*[_type == "serviceArea" && published == true].slug.current
`;

// Sidebar "Latest News" list — excludes the post currently being viewed.
export const sidebarPostsQuery = groq`
  *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...5] ${postCardProjection}
`;

export const homePricingQuery = /* groq */ `
*[_type == "pricingPage"][0]{
  "plans": residentialPricing[featuredOnHome != false]{
    title, description, price, features, popular
  }
}`;

export const relatedServicesBySlugsQuery = groq`
  *[_type == "service" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    startingPrice,
    icon
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial" && published == true] | order(publishedAt desc) {
    _id, name, rating, comment, location, publishedAt, source
  }
`;