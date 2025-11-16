export type Language = 'pt' | 'en';

export interface Service {
    title: string;
    description: string;
}

export interface Translations {
  // Navigation
  nav_about: string;
  nav_services: string;
  nav_events: string;
  nav_contact: string;

  // Hero Section
  hero_title: string;
  hero_subtitle: string;
  hero_cta: string;

  // About Section
  about_title: string;
  about_p1: string;
  about_p2: string;

  // Services Section
  services_title: string;
  services_list: Service[];

  // Events Section
  events_title: string;
  event_madeira_title: string;
  event_madeira_desc: string;
  event_lisbon_title: string;
  event_lisbon_desc: string;
  event_form_title: string;
  event_form_name: string;
  event_form_email: string;
  event_form_phone: string;
  event_form_button: string;
  event_form_sending: string;
  event_form_success_message: string;
  event_form_error_message: string;


  // Contact Section
  contact_title: string;
  contact_intro: string;
  contact_form_title: string;
  contact_form_name: string;
  contact_form_email: string;
  contact_form_subject: string;
  contact_form_message: string;
  contact_form_button: string;
  contact_form_sending: string;
  contact_form_success_message: string;
  contact_form_error_message: string;


  // Footer
  footer_text: string;
  footer_facebook_soon: string;

  // Chatbot
  chatbot_title: string;
  chatbot_placeholder: string;
  chatbot_greeting: string;
  chatbot_disclaimer: string;
  chatbot_error: string;
}

export type AllTranslations = {
  [key in Language]: Translations;
};

export type ImagePosition = {
    x: number;
    y: number;
};