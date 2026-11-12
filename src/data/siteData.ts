export interface BilingualText {
  en: string;
  ta: string;
}

export const BRAND_LOGO_URL =
  'https://horizons-cdn.hostinger.com/7d282ee7-330b-4d8e-a86d-705d8d0064ed/d060994fe8a0bb3dacaf5130a0d54397.png';

export const CONTACT_INFO = {
  phone: '9080 969396',
  phoneRaw: '919080969396',
  whatsapp: '919080969396',
  email: 'srinathrconsultant@gmail.com',
  address: 'No-6/27B, 1st Floor, F6, Kundrathur Main Road, Madhanadhapuram, Chennai-600125',
  hours: 'Mon – Sun · 9:00 AM – 8:00 PM',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Srinath+Consultant+CMDA+DTCP+Chennai+Approvals',
};

export interface VerifiedStat {
  value: string;
  label: BilingualText;
  detail: BilingualText;
}

export const VERIFIED_STATS: VerifiedStat[] = [
  {
    value: '15+',
    label: { en: 'Years of Experience', ta: 'ஆண்டுகள் அனுபவம்' },
    detail: {
      en: 'Established architectural & approval practice in Chennai',
      ta: 'சென்னையில் நிறுவப்பட்ட கட்டிடக்கலை மற்றும் அனுமதி ஆலோசனை',
    },
  },
  {
    value: '1200+',
    label: { en: 'Approvals Secured', ta: 'பெறப்பட்ட அனுமதிகள்' },
    detail: {
      en: 'CMDA, DTCP, Corporation & Panchayat sanctions delivered',
      ta: 'CMDA, DTCP, மாநகராட்சி & ஊராட்சி அனுமதிகள்',
    },
  },
  {
    value: '100%',
    label: { en: 'Compliance Rate', ta: 'இணக்க விகிதம்' },
    detail: {
      en: 'Drawings engineered to Tamil Nadu Combined Development Rules',
      ta: 'தமிழ்நாடு கட்டிட விதிகளுக்கு முழுமையாக இணங்கிய வரைபடங்கள்',
    },
  },
  {
    value: '5.0',
    label: { en: 'Google Rating', ta: 'கூகுள் மதிப்பீடு' },
    detail: {
      en: 'Verified 5.0 rating across 218 client reviews',
      ta: '218 வாடிக்கையாளர் விமர்சனங்களில் 5.0 மதிப்பீடு',
    },
  },
];

export interface ProcessStep {
  step: string;
  title: BilingualText;
  desc: BilingualText;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: { en: 'Free Consultation', ta: 'இலவச ஆலோசனை' },
    desc: {
      en: 'We understand your site, requirements and goals in a no-obligation discussion.',
      ta: 'கட்டாயமில்லாத விவாதத்தில் உங்கள் இடம், தேவைகள் மற்றும் இலக்குகளை புரிந்துகொள்கிறோம்.',
    },
  },
  {
    step: '02',
    title: { en: 'Site & Document Review', ta: 'இடம் & ஆவண மதிப்பாய்வு' },
    desc: {
      en: 'Verification of land documents, patta, FMB sketch and feasibility for approval.',
      ta: 'நில ஆவணங்கள், பட்டா, FMB வரைபடம் மற்றும் அனுமதிக்கான சாத்தியக்கூறுகளை சரிபார்த்தல்.',
    },
  },
  {
    step: '03',
    title: { en: 'Plan & Drawing Preparation', ta: 'வரைபட தயாரிப்பு' },
    desc: {
      en: 'Architectural and structural drawings prepared as per applicable building rules.',
      ta: 'பொருந்தக்கூடிய கட்டிட விதிகளின்படி கட்டிடக்கலை மற்றும் கட்டமைப்பு வரைபடங்கள் தயாரிக்கப்படுகின்றன.',
    },
  },
  {
    step: '04',
    title: { en: 'Application & Submission', ta: 'விண்ணப்பம் & சமர்ப்பிப்பு' },
    desc: {
      en: 'We file the application with CMDA / DTCP / local body and track every stage.',
      ta: 'CMDA / DTCP / உள்ளாட்சியுடன் விண்ணப்பத்தை தாக்கல் செய்து ஒவ்வொரு கட்டத்தையும் கண்காணிக்கிறோம்.',
    },
  },
  {
    step: '05',
    title: { en: 'Approval & Handover', ta: 'அனுமதி & ஒப்படைப்பு' },
    desc: {
      en: 'Sanctioned plan delivered to you, ready for construction and loan processing.',
      ta: 'அனுமதி பெற்ற வரைபடம் உங்களிடம் வழங்கப்படுகிறது, கட்டுமானம் மற்றும் கடன் செயலாக்கத்திற்கு தயார்.',
    },
  },
];

export interface ProjectItem {
  id: string;
  img: string;
  title: BilingualText;
  tag: BilingualText;
  category: string;
  location: string;
  authority: string;
}

export const VERIFIED_PROJECTS: ProjectItem[] = [
  {
    id: 'residential-villa-thoraipakkam',
    img: 'https://images.hostinger.com/e4bceec0-2001-48a9-85c1-ad5b1aa4bf9a.png',
    title: { en: 'Residential Villa', ta: 'குடியிருப்பு வில்லா' },
    tag: { en: 'CMDA Approved · Thoraipakkam', ta: 'CMDA அனுமதி · தொரைப்பாக்கம்' },
    category: 'Residential',
    location: 'Thoraipakkam',
    authority: 'CMDA Approved',
  },
  {
    id: 'commercial-complex-sriperumbudur',
    img: 'https://images.hostinger.com/ce925247-600c-4727-b2f3-e7ec6618582f.png',
    title: { en: 'Commercial Complex', ta: 'வணிக வளாகம்' },
    tag: { en: 'DTCP Approved · Sriperumbudur', ta: 'DTCP அனுமதி · ஸ்ரீபெரும்புதூர்' },
    category: 'Commercial',
    location: 'Sriperumbudur',
    authority: 'DTCP Approved',
  },
  {
    id: 'apartment-block-perambur',
    img: 'https://images.hostinger.com/813025b6-f556-4c4b-b6a7-fcc709b8d162.png',
    title: { en: 'Apartment Block', ta: 'குடியிருப்பு தொகுதி' },
    tag: { en: 'Plan Sanctioned · Perambur', ta: 'வரைபடம் அனுமதி · பெரம்பூர்' },
    category: 'Residential',
    location: 'Perambur',
    authority: 'Plan Sanctioned',
  },
  {
    id: 'high-rise-tower-omr',
    img: 'https://images.hostinger.com/899bc59f-63df-4233-8f66-bc320c2c31a1.png',
    title: { en: 'High-Rise Tower', ta: 'உயரமான கோபுரம்' },
    tag: { en: 'CMDA Approved · OMR', ta: 'CMDA அனுமதி · OMR' },
    category: 'High-Rise',
    location: 'OMR',
    authority: 'CMDA Approved',
  },
  {
    id: 'layout-development-tambaram',
    img: 'https://images.hostinger.com/cc8b37eb-fa70-420c-9aa0-721b64bb12b2.png',
    title: { en: 'Layout Development', ta: 'லேஅவுட் மேம்பாடு' },
    tag: { en: 'DTCP Layout · Tambaram', ta: 'DTCP லேஅவுட் · தாம்பரம்' },
    category: 'Layout',
    location: 'Tambaram',
    authority: 'DTCP Layout',
  },
];

export interface TestimonialItem {
  name: string;
  img: string;
  service: string;
  text: BilingualText;
}

export const VERIFIED_TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Priya Ramesh',
    img: 'https://images.hostinger.com/1a4c98fa-7115-4f60-adfa-fe8b821e3cce.png',
    service: 'CMDA Building Approval',
    text: {
      en: 'Srinath Consultant handled our CMDA approval end to end. Transparent, quick and stress-free. Highly recommend for anyone building in Chennai.',
      ta: 'ஸ்ரீநாத் கன்சல்டன்ட் எங்கள் CMDA அனுமதியை முழுமையாக கையாண்டார்கள். வெளிப்படையான, விரைவான மற்றும் மன அழுத்தமில்லாத சேவை. சென்னையில் கட்டுபவர்களுக்கு பரிந்துரைக்கிறேன்.',
    },
  },
  {
    name: 'Karthik Subramanian',
    img: 'https://images.hostinger.com/7fac8102-82ac-41d7-8245-bac00ccb3630.png',
    service: 'DTCP Layout Approval',
    text: {
      en: 'Our DTCP layout approval was stuck for months. Their team resolved everything cleanly. Genuine experts with great follow-up.',
      ta: 'எங்கள் DTCP லேஅவுட் அனுமதி மாதங்களாக நிலுவையில் இருந்தது. அவர்களின் குழு அனைத்தையும் சிறப்பாக தீர்த்தது. சிறந்த பின்தொடர்தலுடன் உண்மையான நிபுணர்கள்.',
    },
  },
  {
    name: 'Arun Prakash',
    img: 'https://images.hostinger.com/c1838221-824d-42db-8e81-f1638e7cbdb3.png',
    service: 'Patta Transfer Support',
    text: {
      en: 'Patta transfer that felt impossible was done smoothly. Professional, responsive and worth every rupee. Thank you team!',
      ta: 'சாத்தியமற்றது என நினைத்த பட்டா மாற்றம் சுலபமாக முடிந்தது. தொழில்முறை, விரைவான பதில் மற்றும் ஒவ்வொரு ரூபாய்க்கும் மதிப்புள்ளது. நன்றி குழுவே!',
    },
  },
];

export interface FaqItem {
  q: BilingualText;
  a: BilingualText;
}

export const VERIFIED_FAQS: FaqItem[] = [
  {
    q: {
      en: 'What is the difference between CMDA and DTCP approval?',
      ta: 'CMDA மற்றும் DTCP அனுமதிக்கு இடையே உள்ள வேறுபாடு என்ன?',
    },
    a: {
      en: 'CMDA approval applies to properties within the Chennai Metropolitan Area, while DTCP approval covers areas outside the CMDA limit across Tamil Nadu. We handle both based on your plot location.',
      ta: 'CMDA அனுமதி சென்னை பெருநகர பகுதிக்குள் உள்ள சொத்துக்களுக்கு பொருந்தும், DTCP அனுமதி தமிழ்நாடு முழுவதும் CMDA எல்லைக்கு வெளியே உள்ள பகுதிகளை உள்ளடக்கியது. உங்கள் மனை இருப்பிடத்தின் அடிப்படையில் இரண்டையும் நாங்கள் கையாளுகிறோம்.',
    },
  },
  {
    q: {
      en: 'How long does building plan approval take in Chennai?',
      ta: 'சென்னையில் கட்டிட வரைபட அனுமதி எவ்வளவு காலம் ஆகும்?',
    },
    a: {
      en: 'Depending on the project type and completeness of documents, approvals typically take between 30 and 90 days. We keep you updated at every stage to avoid delays.',
      ta: 'திட்ட வகை மற்றும் ஆவணங்களின் முழுமையைப் பொறுத்து, அனுமதிகள் பொதுவாக 30 முதல் 90 நாட்கள் ஆகும். தாமதங்களைத் தவிர்க்க ஒவ்வொரு கட்டத்திலும் உங்களுக்குத் தெரிவிக்கிறோம்.',
    },
  },
  {
    q: {
      en: 'What documents are required for approval?',
      ta: 'அனுமதிக்கு என்ன ஆவணங்கள் தேவை?',
    },
    a: {
      en: 'Generally patta, FMB sketch, sale deed, EC, and site drawings. During your free consultation we provide a precise checklist for your specific case.',
      ta: 'பொதுவாக பட்டா, FMB வரைபடம், விற்பனை பத்திரம், EC மற்றும் இட வரைபடங்கள். உங்கள் இலவச ஆலோசனையின் போது உங்கள் குறிப்பிட்ட வழக்குக்கான துல்லியமான பட்டியலை வழங்குகிறோம்.',
    },
  },
  {
    q: {
      en: 'Do you help with patta transfer and name changes?',
      ta: 'பட்டா மாற்றம் மற்றும் பெயர் மாற்றத்திற்கு உதவுகிறீர்களா?',
    },
    a: {
      en: 'Yes. We offer complete patta transfer, subdivision and land-record correction support with the revenue department.',
      ta: 'ஆம். வருவாய் துறையுடன் முழுமையான பட்டா மாற்றம், உட்பிரிவு மற்றும் நில பதிவு திருத்த உதவியை வழங்குகிறோம்.',
    },
  },
  {
    q: {
      en: 'Which areas in Chennai do you serve?',
      ta: 'சென்னையில் எந்தப் பகுதிகளில் சேவை செய்கிறீர்கள்?',
    },
    a: {
      en: 'We serve all of Chennai and surrounding regions including Anna Nagar, OMR, Tambaram, Sriperumbudur, Perambur, Thoraipakkam and beyond.',
      ta: 'அண்ணா நகர், OMR, தாம்பரம், ஸ்ரீபெரும்புதூர், பெரம்பூர், தொரைப்பாக்கம் உள்ளிட்ட சென்னை மற்றும் சுற்றியுள்ள அனைத்து பகுதிகளிலும் சேவை செய்கிறோம்.',
    },
  },
];

export const SERVICE_AREAS: BilingualText[] = [
  { en: 'All over Tamil Nadu', ta: 'தமிழ்நாடு முழுவதும்' },
  { en: 'Chennai Metropolitan Area', ta: 'சென்னை பெருநகர பகுதி' },
  { en: 'Anna Nagar', ta: 'அண்ணா நகர்' },
  { en: 'OMR / Thoraipakkam', ta: 'OMR / தொரைப்பாக்கம்' },
  { en: 'Tambaram', ta: 'தாம்பரம்' },
  { en: 'Sriperumbudur', ta: 'ஸ்ரீபெரும்புதூர்' },
  { en: 'Perambur', ta: 'பெரம்பூர்' },
  { en: 'Velachery', ta: 'வேளச்சேரி' },
  { en: 'Porur', ta: 'போரூர்' },
  { en: 'Madipakkam', ta: 'மடிப்பாக்கம்' },
  { en: 'Avadi', ta: 'ஆவடி' },
  { en: 'Chromepet', ta: 'குரோம்பேட்டை' },
  { en: 'Mylapore', ta: 'மயிலாப்பூர்' },
  { en: 'Guindy', ta: 'கிண்டி' },
];

