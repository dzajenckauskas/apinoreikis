import type { Schema, Attribute } from '@strapi/strapi';

export interface FaqFaq extends Schema.Component {
  collectionName: 'components_faq_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    question: Attribute.String & Attribute.Required;
    answer: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5video.CKEditor5Video',
        {
          preset: 'toolbar';
        }
      >;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    seoTitle: Attribute.String & Attribute.Required;
    seoDescription: Attribute.Text;
    seoKeywords: Attribute.Text;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'faq.faq': FaqFaq;
      'seo.seo': SeoSeo;
    }
  }
}
