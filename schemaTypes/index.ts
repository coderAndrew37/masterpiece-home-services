import type {SchemaTypeDefinition} from 'sanity'

// Documents
import { service } from './service';
import { beforeAfter } from './beforeAfter';
import { pricingPage } from './pricingPage';
import { post } from './post';
import { author } from './author';
import { category } from './category';
import { homeGalleryItem } from './homeGalleryItem';
import {serviceArea} from './serviceArea'

// Objects
import { blockContent } from './blockContent';
import { processStep } from './processStep';
import { faq } from './faq';
import { galleryImage } from './GalleryImage';
import { pricingPlan } from './pricingPlan';
import { addon } from './addon';

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [
    // Documents
    service,
    beforeAfter,
    pricingPage,
    post,
    author,
    category,
    homeGalleryItem,
    // Objects
    blockContent,
    processStep,
    faq,
    galleryImage,
    pricingPlan,
    addon,
    serviceArea,
  ],
}

// Document type names that should only ever have a single instance.
// Used by structure.ts to pin them in the desk and hide the "create new" option.
export const singletonTypes = new Set(['pricingPage'])