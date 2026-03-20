export type Link = {
  label: string;
  href: string;
};

export type Banner = {
  title: string;
  image: string;
  link: Link;
};

export type FeatureItem = {
  icon: string;
  title: string;
  content: string;
};

export type Features = {
  sub_title: string;
  title: string;
  description: string;
  list: FeatureItem[];
};

export type Intro = {
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  video_id: string;
};

export type SpecialityBlock = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

export type Speciality = {
  primary: SpecialityBlock;
  secondary: SpecialityBlock;
};

export type TestimonialItem = {
  author: string;
  avatar: string;
  profession: string;
  content: string;
};

export type Testimonial = {
  title: string;
  subtitle: string;
  description: string;
  list: TestimonialItem[];
};

export type HomePageFrontmatter = {
  banner: Banner;
  brands: string[];
  features: Features;
  intro: Intro;
  speciality: Speciality;
  testimonial: Testimonial;
};

export type HomePageData = {
  frontmatter: HomePageFrontmatter;
};