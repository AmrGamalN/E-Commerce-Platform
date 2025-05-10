export type contactDetails = {
  icon: React.ElementType;
  href: string;
  text: string | undefined;
  ariaLabel: string;
  target?: string;
};

export type SocialLink = {
  Icon: React.ElementType;
  link: string;
};

export type PaymentOption = {
  image: string;
  alt: string;
};
export type FooterSectionProps = {
  title: string;
  links: FooterLink[];
};
export type PaymentOptionsProps = {
  options: PaymentOption[];
};
export type FooterLink = {
  href: string;
  label: string;
};
export type FooterSection = {
  headerText1: string;
  headerText2: string;
  company: FooterLink[];
  marketPlace: FooterLink[];
};
