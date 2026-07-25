import type {StructureResolver} from 'sanity/structure'
import {singletonTypes} from './index'

/**
 * Custom desk structure:
 * - Pins "Pricing Page" as a single fixed item (no list, no "create new")
 * - Lists everything else normally, minus the singleton type
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pricing Page')
        .id('pricingPage')
        .child(S.document().schemaType('pricingPage').documentId('pricingPage')),

      S.divider(),

      // Everything else, auto-generated, excluding the singleton type
      ...S.documentTypeListItems().filter(
        (listItem) => !singletonTypes.has(listItem.getId() as string),
      ),
    ])