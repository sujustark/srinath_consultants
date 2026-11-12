import { BilingualText } from './siteData';

export interface ServiceDetail {
  id: string;
  slug: string;
  code: string;
  title: BilingualText;
  shortDesc: BilingualText;
  heroTitle: BilingualText;
  tagline: BilingualText;
  img: string;
  intro: BilingualText;
  points: BilingualText[];
  docs: BilingualText[];
  authority: string;
}

export const SERVICES_LIST: ServiceDetail[] = [
  {
    id: 'cmda',
    slug: 'cmda-approval-chennai',
    code: '01',
    authority: 'CMDA',
    title: { en: 'CMDA Approval', ta: 'CMDA அனுமதி' },
    shortDesc: {
      en: 'End-to-end CMDA building approvals for residential and commercial projects across the Chennai metropolitan area.',
      ta: 'சென்னை பெருநகர பகுதி முழுவதும் குடியிருப்பு மற்றும் வணிக திட்டங்களுக்கான முழுமையான CMDA கட்டிட அனுமதிகள்.',
    },
    heroTitle: { en: 'CMDA Approval in Chennai', ta: 'சென்னையில் CMDA அனுமதி' },
    tagline: {
      en: 'Fast, compliant CMDA building and layout approvals within the Chennai Metropolitan Area.',
      ta: 'சென்னை பெருநகர பகுதிக்குள் விரைவான, விதிகளுக்கு இணங்கிய CMDA கட்டிட மற்றும் லேஅவுட் அனுமதிகள்.',
    },
    img: 'https://images.hostinger.com/899bc59f-63df-4233-8f66-bc320c2c31a1.png',
    intro: {
      en: 'The Chennai Metropolitan Development Authority (CMDA) regulates development within the metropolitan area. Whether you are building a home, apartment or commercial property, a sanctioned CMDA plan is mandatory. With 15 years of experience, we manage the entire process end to end.',
      ta: 'சென்னை பெருநகர மேம்பாட்டு ஆணையம் (CMDA) பெருநகர பகுதிக்குள் மேம்பாட்டை ஒழுங்குபடுத்துகிறது. நீங்கள் வீடு, குடியிருப்பு அல்லது வணிக சொத்து கட்டினாலும், அனுமதி பெற்ற CMDA வரைபடம் கட்டாயம். 15 ஆண்டுகள் அனுபவத்துடன், முழு செயல்முறையையும் நாங்கள் நிர்வகிக்கிறோம்.',
    },
    points: [
      {
        en: 'Residential, commercial and multi-storey building approvals',
        ta: 'குடியிருப்பு, வணிக மற்றும் பல மாடி கட்டிட அனுமதிகள்',
      },
      {
        en: 'Layout and sub-division approvals within CMDA limits',
        ta: 'CMDA எல்லைக்குள் லேஅவுட் மற்றும் உட்பிரிவு அனுமதிகள்',
      },
      {
        en: 'Complete drawing preparation and scrutiny handling',
        ta: 'முழுமையான வரைபட தயாரிப்பு மற்றும் ஆய்வு கையாளுதல்',
      },
      {
        en: 'Liaison and follow-up until the sanctioned plan is issued',
        ta: 'அனுமதி பெற்ற வரைபடம் வழங்கப்படும் வரை தொடர்பு மற்றும் பின்தொடர்தல்',
      },
    ],
    docs: [
      { en: 'Patta / Chitta', ta: 'பட்டா / சிட்டா' },
      { en: 'Sale deed', ta: 'விற்பனை பத்திரம்' },
      { en: 'FMB sketch', ta: 'FMB வரைபடம்' },
      { en: 'EC (Encumbrance Certificate)', ta: 'EC (சுமையின்மை சான்றிதழ்)' },
      { en: 'Site & building drawings', ta: 'இட & கட்டிட வரைபடங்கள்' },
    ],
  },
  {
    id: 'dtcp',
    slug: 'dtcp-approval-chennai',
    code: '02',
    authority: 'DTCP',
    title: { en: 'DTCP Approval', ta: 'DTCP அனுமதி' },
    shortDesc: {
      en: 'DTCP layout and building plan approvals for plots outside the CMDA limit with complete documentation support.',
      ta: 'CMDA எல்லைக்கு வெளியே உள்ள மனைகளுக்கான DTCP லேஅவுட் மற்றும் கட்டிட வரைபட அனுமதிகள், முழுமையான ஆவண ஆதரவுடன்.',
    },
    heroTitle: { en: 'DTCP Approval in Chennai', ta: 'சென்னையில் DTCP அனுமதி' },
    tagline: {
      en: 'DTCP layout and building plan approvals for properties outside the CMDA limit.',
      ta: 'CMDA எல்லைக்கு வெளியே உள்ள சொத்துக்களுக்கான DTCP லேஅவுட் மற்றும் கட்டிட வரைபட அனுமதிகள்.',
    },
    img: 'https://images.hostinger.com/ce925247-600c-4727-b2f3-e7ec6618582f.png',
    intro: {
      en: 'The Directorate of Town and Country Planning (DTCP) approves layouts and buildings across Tamil Nadu outside the CMDA area. A DTCP-approved layout adds legal clarity and resale value. We handle everything from feasibility to final sanction.',
      ta: 'நகர்ப்புற மற்றும் ஊரக திட்டமிடல் இயக்குநரகம் (DTCP) CMDA பகுதிக்கு வெளியே தமிழ்நாடு முழுவதும் லேஅவுட்கள் மற்றும் கட்டிடங்களுக்கு அனுமதி வழங்குகிறது. DTCP அனுமதி பெற்ற லேஅவுட் சட்டப்பூர்வ தெளிவு மற்றும் மறுவிற்பனை மதிப்பை சேர்க்கிறது.',
    },
    points: [
      {
        en: 'DTCP layout approvals and plot regularisation',
        ta: 'DTCP லேஅவுட் அனுமதிகள் மற்றும் மனை ஒழுங்குபடுத்துதல்',
      },
      {
        en: 'Building plan approvals for non-CMDA areas',
        ta: 'CMDA அல்லாத பகுதிகளுக்கான கட்டிட வரைபட அனுமதிகள்',
      },
      {
        en: 'Coordination with local panchayat and municipal bodies',
        ta: 'உள்ளூர் ஊராட்சி மற்றும் நகராட்சி அமைப்புகளுடன் ஒருங்கிணைப்பு',
      },
      {
        en: 'Transparent status updates at every stage',
        ta: 'ஒவ்வொரு கட்டத்திலும் வெளிப்படையான நிலை புதுப்பிப்புகள்',
      },
    ],
    docs: [
      { en: 'Patta / Chitta', ta: 'பட்டா / சிட்டா' },
      { en: 'Parent document & sale deed', ta: 'மூல ஆவணம் & விற்பனை பத்திரம்' },
      { en: 'FMB sketch', ta: 'FMB வரைபடம்' },
      { en: 'EC', ta: 'EC' },
      { en: 'Layout / building drawings', ta: 'லேஅவுட் / கட்டிட வரைபடங்கள்' },
    ],
  },
  {
    id: 'building-plan',
    slug: 'building-plan-approval-chennai',
    code: '03',
    authority: 'Corporation / Local Body',
    title: { en: 'Building Plan Approval', ta: 'கட்டிட வரைபட அனுமதி' },
    shortDesc: {
      en: 'Sanctioned building plans prepared and processed with the corporation, panchayat and local bodies.',
      ta: 'மாநகராட்சி, ஊராட்சி மற்றும் உள்ளாட்சி அமைப்புகளுடன் தயாரிக்கப்பட்டு அனுமதி பெறப்பட்ட கட்டிட வரைபடங்கள்.',
    },
    heroTitle: {
      en: 'Building Plan Approval in Chennai',
      ta: 'சென்னையில் கட்டிட வரைபட அனுமதி',
    },
    tagline: {
      en: 'Sanctioned building plans prepared and processed with the right authority.',
      ta: 'சரியான அதிகாரத்துடன் தயாரிக்கப்பட்டு அனுமதி பெற்ற கட்டிட வரைபடங்கள்.',
    },
    img: 'https://images.hostinger.com/cc8b37eb-fa70-420c-9aa0-721b64bb12b2.png',
    intro: {
      en: 'A sanctioned building plan is essential for legal construction and home loan approval. We prepare architecturally sound, code-compliant drawings and process them with CMDA, DTCP, the corporation or panchayat as applicable to your location.',
      ta: 'சட்டப்பூர்வ கட்டுமானம் மற்றும் வீட்டுக் கடன் அனுமதிக்கு அனுமதி பெற்ற கட்டிட வரைபடம் அவசியம். கட்டிடக்கலை ரீதியாக சிறந்த, விதிகளுக்கு இணங்கிய வரைபடங்களைத் தயாரித்து, உங்கள் இருப்பிடத்திற்கு ஏற்ப CMDA, DTCP, மாநகராட்சி அல்லது ஊராட்சியுடன் செயலாக்குகிறோம்.',
    },
    points: [
      {
        en: 'Architectural and structural drawing preparation',
        ta: 'கட்டிடக்கலை மற்றும் கட்டமைப்பு வரைபட தயாரிப்பு',
      },
      {
        en: 'Approval with corporation, panchayat, CMDA or DTCP',
        ta: 'மாநகராட்சி, ஊராட்சி, CMDA அல்லது DTCP உடன் அனுமதி',
      },
      {
        en: 'Setback, FSI and coverage compliance handled',
        ta: 'செட்பேக், FSI மற்றும் கவரேஜ் இணக்கம் கையாளப்படுகிறது',
      },
      {
        en: 'Support for loan-ready sanctioned documents',
        ta: 'கடன் தயார் அனுமதி ஆவணங்களுக்கான ஆதரவு',
      },
    ],
    docs: [
      { en: 'Patta / Chitta', ta: 'பட்டா / சிட்டா' },
      { en: 'Sale deed', ta: 'விற்பனை பத்திரம்' },
      { en: 'FMB sketch', ta: 'FMB வரைபடம்' },
      { en: 'EC', ta: 'EC' },
      { en: 'Existing site plan', ta: 'தற்போதைய இட வரைபடம்' },
    ],
  },
  {
    id: 'architectural',
    slug: 'architectural-planning-chennai',
    code: '04',
    authority: 'Design & Engineering',
    title: { en: 'Architectural Planning', ta: 'கட்டிடக்கலை வடிவமைப்பு' },
    shortDesc: {
      en: 'Functional, code-compliant architectural design tailored to your site, budget and lifestyle.',
      ta: 'உங்கள் இடம், பட்ஜெட் மற்றும் வாழ்க்கை முறைக்கு ஏற்ப செயல்படும், விதிகளுக்கு இணங்கிய கட்டிடக்கலை வடிவமைப்பு.',
    },
    heroTitle: {
      en: 'Architectural Planning & Working Drawings',
      ta: 'கட்டிடக்கலை வடிவமைப்பு',
    },
    tagline: {
      en: 'Functional, code-compliant architectural design tailored to your site, budget and lifestyle.',
      ta: 'உங்கள் இடம், பட்ஜெட் மற்றும் வாழ்க்கை முறைக்கு ஏற்ப செயல்படும், விதிகளுக்கு இணங்கிய கட்டிடக்கலை வடிவமைப்பு.',
    },
    img: 'https://images.hostinger.com/e4bceec0-2001-48a9-85c1-ad5b1aa4bf9a.png',
    intro: {
      en: 'Great buildings begin with thoughtful spatial planning that respects both your lifestyle and Tamil Nadu building regulations. Our team prepares floor plans, elevations, structural drawings, and approval-ready CAD submissions.',
      ta: 'உங்கள் வாழ்க்கை முறைக்கும் தமிழ்நாடு கட்டிட விதிகளுக்கும் இணங்கிய சிந்தனைமிக்க இட வடிவமைப்புடன் சிறந்த கட்டிடங்கள் தொடங்குகின்றன.',
    },
    points: [
      {
        en: 'Custom residential, villa, apartment & commercial floor plans',
        ta: 'குடியிருப்பு, வில்லா, அடுக்குமாடி மற்றும் வணிக தள வரைபடங்கள்',
      },
      {
        en: 'Setback, ventilation, parking & FSI optimization',
        ta: 'செட்பேக், காற்றோட்டம், பார்க்கிங் மற்றும் FSI மேம்பாடு',
      },
      {
        en: 'Structural & working drawings ready for site execution',
        ta: 'கட்டுமான பணிக்கான கட்டமைப்பு மற்றும் செயல்பாட்டு வரைபடங்கள்',
      },
      {
        en: 'Seamless integration with CMDA / DTCP / Corporation submission',
        ta: 'CMDA / DTCP / மாநகராட்சி சமர்ப்பிப்புடன் எளிதான ஒருங்கிணைப்பு',
      },
    ],
    docs: [
      { en: 'Site dimensions & boundary sketch', ta: 'மனை அளவுகள் & எல்லை வரைபடம்' },
      { en: 'Road width & orientation details', ta: 'சாலை அகலம் & திசை விவரங்கள்' },
      { en: 'Patta / FMB sketch', ta: 'பட்டா / FMB வரைபடம்' },
      { en: 'Client space & floor requirements', ta: 'வாடிக்கையாளர் தேவைகள்' },
    ],
  },
  {
    id: 'vastu',
    slug: 'vastu-consultation-chennai',
    code: '05',
    authority: 'Vastu & Spatial Harmony',
    title: { en: 'Vastu Consultation', ta: 'வாஸ்து ஆலோசனை' },
    shortDesc: {
      en: 'Vastu-aligned planning integrated seamlessly with modern architecture and approval norms.',
      ta: 'நவீன கட்டிடக்கலை மற்றும் அனுமதி விதிகளுடன் ஒருங்கிணைந்த வாஸ்து சார்ந்த வடிவமைப்பு.',
    },
    heroTitle: { en: 'Vastu Consultation in Chennai', ta: 'சென்னையில் வாஸ்து ஆலோசனை' },
    tagline: {
      en: 'Vastu-aligned planning integrated seamlessly with modern architecture and approval norms.',
      ta: 'நவீன கட்டிடக்கலை மற்றும் அனுமதி விதிகளுடன் ஒருங்கிணைந்த வாஸ்து சார்ந்த வடிவமைப்பு.',
    },
    img: 'https://images.hostinger.com/813025b6-f556-4c4b-b6a7-fcc709b8d162.png',
    intro: {
      en: 'We integrate time-tested Vastu principles with practical modern architecture and municipal building rules — ensuring your home or commercial space feels balanced without compromising natural light, ventilation, or statutory setbacks.',
      ta: 'நடைமுறை நவீன கட்டிடக்கலை மற்றும் கட்டிட விதிகளுடன் வாஸ்து கொள்கைகளை ஒருங்கிணைத்து சமநிலையான இடங்களை வடிவமைக்கிறோம்.',
    },
    points: [
      {
        en: 'Plot orientation & entrance placement analysis',
        ta: 'மனை திசை மற்றும் நுழைவாயில் அமைப்பு ஆய்வு',
      },
      {
        en: 'Room zoning for kitchens, bedrooms, staircases & water bodies',
        ta: 'சமையலறை, படுக்கையறை, படிக்கட்டு மற்றும் நீர்நிலை அமைப்பு',
      },
      {
        en: 'Harmonized with CMDA / Corporation setback and FSI rules',
        ta: 'CMDA / மாநகராட்சி விதிகளுடன் முழுமையான இணக்கம்',
      },
      {
        en: 'Practical remedies for existing residential & commercial spaces',
        ta: 'தற்போதைய கட்டிடங்களுக்கான நடைமுறை வாஸ்து தீர்வுகள்',
      },
    ],
    docs: [
      { en: 'Site layout with North direction', ta: 'வடக்கு திசையுடன் கூடிய மனை வரைபடம்' },
      { en: 'Existing or proposed floor plan', ta: 'தற்போதைய அல்லது திட்டமிட்ட தள வரைபடம்' },
      { en: 'Surrounding road & plot details', ta: 'சுற்றியுள்ள சாலை & மனை விவரங்கள்' },
    ],
  },
  {
    id: 'patta',
    slug: 'patta-transfer-chennai',
    code: '06',
    authority: 'Revenue Department',
    title: { en: 'Patta Transfer Support', ta: 'பட்டா மாற்ற உதவி' },
    shortDesc: {
      en: 'Hassle-free patta transfer, name change and land record correction with the revenue department.',
      ta: 'வருவாய் துறையுடன் தொல்லையில்லாத பட்டா மாற்றம், பெயர் மாற்றம் மற்றும் நில பதிவு திருத்தம்.',
    },
    heroTitle: { en: 'Patta Transfer in Chennai', ta: 'சென்னையில் பட்டா மாற்றம்' },
    tagline: {
      en: 'Hassle-free patta transfer, name change and land-record correction.',
      ta: 'தொல்லையில்லாத பட்டா மாற்றம், பெயர் மாற்றம் மற்றும் நில பதிவு திருத்தம்.',
    },
    img: 'https://images.hostinger.com/813025b6-f556-4c4b-b6a7-fcc709b8d162.png',
    intro: {
      en: 'Patta is a critical land-ownership record. After purchase, inheritance or sub-division, the patta must be transferred to the current owner. We handle patta transfer, name changes, and record corrections with the revenue department smoothly.',
      ta: 'பட்டா ஒரு முக்கியமான நில உரிமை பதிவு. வாங்குதல், வாரிசு அல்லது உட்பிரிவுக்குப் பிறகு, பட்டா தற்போதைய உரிமையாளருக்கு மாற்றப்பட வேண்டும். வருவாய் துறையுடன் பட்டா மாற்றம், பெயர் மாற்றம் மற்றும் பதிவு திருத்தங்களை சுலபமாக கையாளுகிறோம்.',
    },
    points: [
      {
        en: 'Patta name transfer after sale or inheritance',
        ta: 'விற்பனை அல்லது வாரிசுக்குப் பிறகு பட்டா பெயர் மாற்றம்',
      },
      {
        en: 'Sub-division and joint patta separation',
        ta: 'உட்பிரிவு மற்றும் கூட்டு பட்டா பிரித்தல்',
      },
      {
        en: 'Land record and Chitta corrections',
        ta: 'நில பதிவு மற்றும் சிட்டா திருத்தங்கள்',
      },
      {
        en: 'Coordination with the Tahsildar and revenue office',
        ta: 'தாசில்தார் மற்றும் வருவாய் அலுவலகத்துடன் ஒருங்கிணைப்பு',
      },
    ],
    docs: [
      { en: 'Sale deed / gift deed', ta: 'விற்பனை பத்திரம் / நன்கொடை பத்திரம்' },
      { en: 'Existing patta / Chitta', ta: 'தற்போதைய பட்டா / சிட்டா' },
      { en: 'EC', ta: 'EC' },
      { en: 'Death certificate (for inheritance)', ta: 'இறப்பு சான்றிதழ் (வாரிசுக்கு)' },
      { en: 'ID proof', ta: 'அடையாள சான்று' },
    ],
  },
  {
    id: 'construction',
    slug: 'construction-consultancy-chennai',
    code: '07',
    authority: 'Execution & Advisory',
    title: { en: 'Construction Consultancy', ta: 'கட்டுமான ஆலோசனை' },
    shortDesc: {
      en: 'On-ground guidance from foundation to completion, ensuring quality and approval compliance.',
      ta: 'அடித்தளம் முதல் நிறைவு வரை நேரடி வழிகாட்டுதல், தரம் மற்றும் அனுமதி இணக்கத்தை உறுதி செய்கிறது.',
    },
    heroTitle: {
      en: 'Construction Consultancy in Chennai',
      ta: 'சென்னையில் கட்டுமான ஆலோசனை',
    },
    tagline: {
      en: 'On-ground guidance from foundation to completion, ensuring quality and approval compliance.',
      ta: 'அடித்தளம் முதல் நிறைவு வரை நேரடி வழிகாட்டுதல், தரம் மற்றும் அனுமதி இணக்கத்தை உறுதி செய்கிறது.',
    },
    img: 'https://images.hostinger.com/e4bceec0-2001-48a9-85c1-ad5b1aa4bf9a.png',
    intro: {
      en: 'From site marking and foundation checks to stage-wise structural verification and completion certificate readiness, we guide homeowners and developers so construction stays faithful to sanctioned drawings and quality benchmarks.',
      ta: 'அடித்தளம் முதல் நிறைவு சான்றிதழ் வரை அனுமதி பெற்ற வரைபடங்களின்படி தரமான கட்டுமானத்தை உறுதி செய்ய வழிகாட்டுகிறோம்.',
    },
    points: [
      {
        en: 'Sanctioned-plan compliance checks during execution',
        ta: 'கட்டுமானத்தின் போது அனுமதி பெற்ற வரைபட இணக்க சரிபார்ப்பு',
      },
      {
        en: 'Stage-wise civil & structural inspection guidance',
        ta: 'படிப்படியான சிவில் & கட்டமைப்பு ஆய்வு வழிகாட்டுதல்',
      },
      {
        en: 'Cost estimation, BOQ review & contractor coordination',
        ta: 'செலவு மதிப்பீடு & ஒப்பந்ததாரர் ஒருங்கிணைப்பு',
      },
      {
        en: 'Completion certificate & utility connection documentation',
        ta: 'நிறைவு சான்றிதழ் & பயன்பாட்டு இணைப்பு ஆவண ஆதரவு',
      },
    ],
    docs: [
      { en: 'Sanctioned building plan', ta: 'அனுமதி பெற்ற கட்டிட வரைபடம்' },
      { en: 'Structural drawings', ta: 'கட்டமைப்பு வரைபடங்கள்' },
      { en: 'Site soil / survey details', ta: 'மண் மற்றும் நில அளவை விவரங்கள்' },
    ],
  },
];

