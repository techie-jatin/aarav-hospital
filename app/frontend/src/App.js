import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Activity,
  Shield,
  Heart,
  Star,
  ChevronRight,
  ArrowLeft,
  Check,
  Award,
  Users,
  Baby,
  Bone,
  Brain,
  Scissors,
  Smile,
  Mail,
  Globe,
  Eye,
  AlertCircle,
  Menu,
  X
} from "lucide-react";

// Translations dictionary for English and Hindi
const TRANSLATIONS = {
  en: {
    hospitalName: "Aarav Maternity & Multispeciality Hospital",
    hospitalSubtitle: "Expert Healthcare for Mothers, Children & Families",
    address: "J3, Rapti Nagar Phase 4, Near ITI Charghawa, Gorakhpur - 273003",
    tagline: "Your Health, Our Sacred Trust",
    subtagline: "24×7 Emergency Care • ICU • NICU • Orthopaedics • Neurosurgery • Urology • General Surgery • Critical Care • Pain Medicine • Infertility Care",
    emergencyCall: "24/7 Emergency Call",
    opdHours: "OPD: 10 AM – 4 PM",
    emergencyAvailable: "Emergency Available 24×7",
    bookWhatsApp: "Book via WhatsApp",
    getDirections: "Get Directions",
    quickActions: "Quick Services",
    aboutHospital: "About Aarav Hospital",
    trustedHealthcare: "Trusted Healthcare in Gorakhpur",
    aboutDescription: "Aarav Maternity & Multispeciality Hospital provides comprehensive healthcare services with modern infrastructure, experienced specialists, and round-the-clock emergency support. We are committed to delivering quality medical care with compassion and excellence for our community.",
    meetSpecialists: "Meet Our Medical Specialists",
    specialistsSubtitle: "Consult the best local specialists of Gorakhpur in modern medicine, maternal wellness, neurosurgery, orthopaedics, and critical care.",
    facilitiesTitle: "Our Premium Hospital Facilities",
    facilitiesSubtitle: "State-of-the-art diagnostic, critical care, and surgical departments delivering advanced medical support 24/7.",
    whyChooseUs: "Why Families Choose Aarav Hospital",
    visitUs: "Visit Aarav Hospital Gorakhpur",
    directionsTitle: "Find Us on Google Maps",
    emergencyBannerText: "EMERGENCY AVAILABLE 24×7",
    emergencySubtitle: "Accident, trauma, pediatric crisis or maternal emergencies — our specialists are ready to help.",
    callNow: "Call Now",
    allRightsReserved: "All Rights Reserved. Aarav Maternity and Multispecialty Hospital.",
    contactInfo: "Contact Information",
    departmentsTitle: "Our Core Specialties & Departments",
    reviewsTitle: "What Patients Say",
    faqTitle: "Frequently Asked Questions",
    filterSpecialty: "All Specialities",
    learnMore: "Learn More & OPD Schedule",
    viewProfile: "View Bio & Schedule",
    tapToCall: "Tap to Call Emergency",
    tapToWhatsApp: "Tap to Book on WhatsApp",
    doctorSearch: "Search Doctors by Name or Specialty...",
    backToHome: "Back to Home",
    bestInGorakhpur: "Leading Healthcare Center",
    yearsExp: "Years of Trust",
    patientsServed: "Happy Patients Served",
    icuBeds: "ICU & NICU Beds",
    expertDoctors: "Expert Specialists",
    seoMaternityTitle: "Best Maternity Doctor in Gorakhpur",
    seoOrthopaedicTitle: "Best Orthopaedic Doctor in Gorakhpur",
    seoNeurosurgeryTitle: "Best Neurosurgeon in Gorakhpur",
    seoPediatricianTitle: "Best Pediatrician in Gorakhpur",
    seoInfertilityTitle: "Best Infertility Specialist in Gorakhpur",
    seoTagline: "Trusted by thousands of local residents in Rapti Nagar, Charghawa, and Gorakhpur district.",
    whatsappBookText: "Hello, I want to book an appointment with Aarav Hospital. Please guide me.",
    addressTitle: "Hospital Address"
  },
  hi: {
    hospitalName: "आरव मैटरनिटी एवं मल्टीस्पेशलिटी अस्पताल",
    hospitalSubtitle: "माताओं, बच्चों और परिवारों के लिए विशेषज्ञ स्वास्थ्य सेवा",
    address: "J3, राप्ती नगर फेज 4, आईटीआई चरगांवा के पास, गोरखपुर - 273003",
    tagline: "आपका स्वास्थ्य, हमारा परम विश्वास",
    subtagline: "24×7 आपातकालीन सेवा • आईसीयू • एनआईसीयू • ऑर्थोपेडिक्स • न्यूरोसर्जरी • यूरोलॉजी • सामान्य सर्जरी • क्रिटिकल केयर • दर्द चिकित्सा • बांझपन उपचार",
    emergencyCall: "24/7 आपातकालीन कॉल",
    opdHours: "ओपीडी: सुबह 10 बजे – शाम 4 बजे",
    emergencyAvailable: "आपातकालीन सेवा 24×7 उपलब्ध",
    bookWhatsApp: "व्हाट्सएप पर बुक करें",
    getDirections: "गूगल मैप रास्ता खोजें",
    quickActions: "त्वरित सेवाएं",
    aboutHospital: "आरव अस्पताल के बारे में",
    trustedHealthcare: "गोरखपुर में सबसे विश्वसनीय स्वास्थ्य सेवा",
    aboutDescription: "आरव मैटरनिटी एंड मल्टीस्पेशलिटी अस्पताल आधुनिक चिकित्सा बुनियादी ढांचे, अत्यधिक अनुभवी डॉक्टरों और चौबीसों घंटे आपातकालीन सहायता के साथ उत्कृष्ट स्वास्थ्य सेवाएं प्रदान करता है। हम गोरखपुर समुदाय के लिए करुणा के साथ गुणवत्तापूर्ण इलाज सुनिश्चित करते हैं।",
    meetSpecialists: "हमारे विशेषज्ञ डॉक्टर",
    specialistsSubtitle: "मस्तिष्क, हड्डी, मातृत्व स्वास्थ्य, बाल रोग और गंभीर देखभाल के लिए गोरखपुर के सर्वश्रेष्ठ डॉक्टरों से परामर्श लें।",
    facilitiesTitle: "अस्पताल की आधुनिक सुविधाएं",
    facilitiesSubtitle: "24/7 आपातकालीन सहायता के लिए आधुनिक वेंटिलेटर, आईसीयू, एनआईसीयू, ऑपरेशन थियेटर और जांच विभाग।",
    whyChooseUs: "आरव अस्पताल को क्यों चुनें?",
    visitUs: "आरव अस्पताल गोरखपुर पधारें",
    directionsTitle: "गूगल मैप्स पर हमारी स्थिति",
    emergencyBannerText: "आपातकालीन सेवा 24×7 चालू",
    emergencySubtitle: "दुर्घटना, प्रसव पीड़ा, बच्चों की गंभीर स्थिति या न्यूरो इमरजेंसी — हमारे विशेषज्ञ तुरंत सेवा में तत्पर हैं।",
    callNow: "अभी कॉल करें",
    allRightsReserved: "सर्वाधिकार सुरक्षित। आरव मैटरनिटी एंड मल्टीस्पेशलिटी अस्पताल।",
    contactInfo: "संपर्क जानकारी",
    departmentsTitle: "हमारे प्रमुख चिकित्सा विभाग",
    reviewsTitle: "मरीजों के अनुभव (समीक्षाएं)",
    faqTitle: "अक्सर पूछे जाने वाले सवाल (FAQ)",
    filterSpecialty: "सभी विभाग",
    learnMore: "विस्तृत जानकारी और ओपीडी समय",
    viewProfile: "बायो और ओपीडी समय देखें",
    tapToCall: "आपातकालीन कॉल करें",
    tapToWhatsApp: "व्हाट्सएप अपॉइंटमेंट बुक करें",
    doctorSearch: "डॉक्टर या विभाग का नाम खोजें...",
    backToHome: "होम पेज पर वापस जाएं",
    bestInGorakhpur: "अग्रणी चिकित्सा केंद्र",
    yearsExp: "वर्षों का विश्वास",
    patientsServed: "स्वस्थ हुए मरीज",
    icuBeds: "आईसीयू और एनआईसीयू बेड",
    expertDoctors: "विशेषज्ञ डॉक्टर",
    seoMaternityTitle: "गोरखपुर का सर्वश्रेष्ठ प्रसूति (मैटरनिटी) अस्पताल",
    seoOrthopaedicTitle: "गोरखपुर का सबसे अच्छा हड्डी रोग विशेषज्ञ",
    seoNeurosurgeryTitle: "गोरखपुर के सर्वश्रेष्ठ न्यूरोसर्जन",
    seoPediatricianTitle: "गोरखपुर के सबसे अच्छे बाल रोग विशेषज्ञ",
    seoInfertilityTitle: "गोरखपुर के सर्वश्रेष्ठ बांझपन उपचार डॉक्टर",
    seoTagline: "राप्ती नगर, चरगांवा और पूरे गोरखपुर जिले के हजारों परिवारों द्वारा विश्वसनीय स्वास्थ्य केंद्र।",
    whatsappBookText: "नमस्ते आरव अस्पताल, मुझे इलाज/अपॉइंटमेंट के बारे में जानकारी चाहिए।",
    addressTitle: "अस्पताल का पता"
  }
};

// Doctors data
const DOCTORS = [
  {
    id: "dr-rupesh-goel",
    name: "Dr. Rupesh Goel",
    specialtyKey: "critical_pain_medicine",
    title_en: "MD Physician, Pain and Critical Care Specialist",
    title_hi: "एमडी फिजिशियन, दर्द और गंभीर देखभाल विशेषज्ञ",
    qualification_en: "MD Physician, Pain & Critical Care Specialist",
    qualification_hi: "एमडी फिजिशियन, दर्द और गंभीर देखभाल विशेषज्ञ",
    opd_en: "Flexible (Emergency 24x7)",
    opd_hi: "लचीला समय (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. Rupesh Goel is a veteran physician in Gorakhpur, specialized in life-support care, ventilators, complex pain management, and internal medicine. Under his guidance, the intensive care units (ICU) operate to national standards.",
    bio_hi: "डॉ. रूपेश गोयल गोरखपुर के एक अनुभवी चिकित्सक हैं, जो जीवन-रक्षक देखभाल, वेंटलेटर, जटिल दर्द प्रबंधन और आंतरिक चिकित्सा में विशेषज्ञ हैं। उनके मार्गदर्शन में, गहन चिकित्सा इकाई (आईसीयू) राष्ट्रीय मानकों के अनुसार काम करती है।"
  },
  {
    id: "dr-vinita-goel",
    name: "Dr. Vinita Goel",
    specialtyKey: "maternity_infertility",
    title_en: "DGO, Infertility Specialist",
    title_hi: "डीजीओ, बांझपन एवं प्रसूति रोग विशेषज्ञ",
    qualification_en: "DGO, Infertility Specialist",
    qualification_hi: "डीजीओ, बांझपन विशेषज्ञ",
    opd_en: "10 AM - 2 PM & 5 PM - 7 PM (Emergency 24x7)",
    opd_hi: "सुबह 10-2 बजे और शाम 5-7 बजे (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1594824813573-246434e33963?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. Vinita Goel is legendary in Gorakhpur for her compassionate gynaecological treatment, painless normal deliveries, high-risk pregnancies, and highly successful infertility solutions (IUI/IVF counseling).",
    bio_hi: "डॉ. विनीता गोयल गोरखपुर में अपनी करुणामयी स्त्री रोग चिकित्सा, दर्द रहित सामान्य प्रसव, उच्च जोखिम वाले गर्भधारण और अत्यधिक सफल बांझपन समाधानों (आईयूआई/आईवीएफ परामर्श) के लिए बहुत प्रसिद्ध हैं।"
  },
  {
    id: "dr-shrey-singh",
    name: "Dr. Shrey Singh",
    specialtyKey: "orthopaedics",
    title_en: "DNB Orthopaedic",
    title_hi: "डीएनबी ऑर्थोपेडिक (हड्डी, जोड़ एवं नस रोग विशेषज्ञ)",
    qualification_en: "DNB (Orthopaedic)",
    qualification_hi: "डीएनबी ऑर्थोपेडिक",
    opd_en: "Flexible (Emergency 24x7)",
    opd_hi: "लचीला समय (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1612531385446-f7e6d131e1d0?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. Shrey Singh is a skilled bone specialist dealing with severe trauma fractures, joint replacements, arthritis relief, and pediatric orthopedic surgeries using state-of-the-art minimally invasive techniques.",
    bio_hi: "डॉ. श्रेय सिंह एक कुशल हड्डी रोग विशेषज्ञ हैं, जो अत्याधुनिक न्यूनतम इनवेसिव तकनीकों का उपयोग करके गंभीर आघात फ्रैक्चर, जोड़ प्रत्यारोपण, गठिया से राहत और बाल रोग आर्थोपेडिक सर्जरी का इलाज करते हैं।"
  },
  {
    id: "dr-manas-prakash",
    name: "Dr. Manas Prakash",
    specialtyKey: "neurosurgery",
    title_en: "MCH Neurosurgeon",
    title_hi: "एमसीएच न्यूरोसर्जन (मस्तिष्क, रीढ़ एवं नस विशेषज्ञ)",
    qualification_en: "MCH (Neurosurgery)",
    qualification_hi: "एमसीएच (न्यूरोसर्जरी)",
    opd_en: "Flexible (Emergency 24x7)",
    opd_hi: "लचीला समय (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. Manas Prakash has extensive neurosurgical expertise in managing complex brain tumors, vertebral column reconstruction, neural trauma, spinal blockages, and stroke care with extreme safety.",
    bio_hi: "डॉ. मानस प्रकाश के पास मस्तिष्क ट्यूमर, रीढ़ की हड्डी के पुनर्निर्माण, न्यूरल आघात, रीढ़ की हड्डी के अवरोध और स्ट्रोक की देखभाल के इलाज में व्यापक न्यूरोसर्जिकल विशेषज्ञता है।"
  },
  {
    id: "dr-pk-verma",
    name: "Dr. P.K. Verma",
    specialtyKey: "neurosurgery",
    title_en: "MCH Neurosurgeon",
    title_hi: "एमसीएच न्यूरोसर्जन",
    qualification_en: "MCH (Neurosurgery)",
    qualification_hi: "एमसीएच (न्यूरोसर्जरी)",
    opd_en: "Flexible (Emergency 24x7)",
    opd_hi: "लचीला समय (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. P.K. Verma is a highly decorated surgeon specialized in stereotactic spine surgeries, neural tumor excision, and pediatric brain operations, serving patients from across eastern UP.",
    bio_hi: "डॉ. पी.के. वर्मा एक अत्यधिक सम्मानित सर्जन हैं जो पूर्वी उत्तर प्रदेश के मरीजों की सेवा करते हुए स्टीरियोटैक्टिक स्पाइन सर्जरी, न्यूरल ट्यूमर निकालने और बाल मस्तिष्क ऑपरेशनों में विशेषज्ञता रखते हैं।"
  },
  {
    id: "dr-dk-tripathi",
    name: "Dr. D.K. Tripathi",
    specialtyKey: "general_surgery",
    title_en: "MS Surgeon",
    title_hi: "एमएस सर्जन (सामान्य एवं लेप्रोस्कोपिक सर्जन)",
    qualification_en: "MS (General Surgery)",
    qualification_hi: "एमएस (सामान्य सर्जरी)",
    opd_en: "Flexible (Emergency 24x7)",
    opd_hi: "लचीला समय (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. D.K. Tripathi provides stellar surgical care in hernia repairs, laparoscopic gallbladder removals, appendectomy, piles management, and abdominal tract procedures.",
    bio_hi: "डॉ. डी.के. त्रिपाठी हर्निया रिपेयर, लेप्रोस्कोपिक पित्ताशय निकालने, अपेंडिसेक्टॉमी, बवासीर प्रबंधन और पेट से जुड़े रोगों की सर्जरी में उत्कृष्ट सर्जिकल देखभाल प्रदान करते हैं।"
  },
  {
    id: "dr-vikas-kumar",
    name: "Dr. Vikas Kumar",
    specialtyKey: "urology",
    title_en: "MCH Urologist",
    title_hi: "एमसीएच यूरोलॉजिस्ट (मूत्र रोग विशेषज्ञ)",
    qualification_en: "MCH (Urology)",
    qualification_hi: "एमसीएच (यूरोलॉजी)",
    opd_en: "Flexible (Emergency 24x7)",
    opd_hi: "लचीला समय (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. Vikas Kumar provides expert urological treatments including laser kidney stone extraction, prostate disease management, urological cancer support, and male infertility diagnostics.",
    bio_hi: "डॉ. विकास कुमार गुर्दे की पथरी के लेजर निष्कर्षण, प्रोस्टेट रोग प्रबंधन, यूरोलॉजिकल कैंसर उपचार और पुरुष बांझपन के नैदानिक परीक्षणों सहित विशेषज्ञ यूरोलॉजिकल उपचार प्रदान करते हैं।"
  },
  {
    id: "dr-shivendra",
    name: "Dr. Shivendra",
    specialtyKey: "pediatrics",
    title_en: "MD Pediatrician",
    title_hi: "एमडी पीडियाट्रिशियन (बाल रोग विशेषज्ञ)",
    qualification_en: "MD (Pediatrics)",
    qualification_hi: "एमडी (बाल रोग चिकित्सा)",
    opd_en: "Flexible (Emergency 24x7)",
    opd_hi: "लचीला समय (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. Shivendra is an exceptionally warm pediatrician specialized in infant critical care, NICU incubator setups, pediatric respiratory emergencies, and child developmental milestones guidance.",
    bio_hi: "डॉ. शिवेंद्र एक बेहद संवेदनशील बाल रोग विशेषज्ञ हैं जो नवजात शिशुओं की गहन देखभाल, एनआईसीयू इनक्यूबेटर सेटअप, बाल श्वसन आपात स्थिति और बाल विकास मील के पत्थर के मार्गदर्शन में विशेषज्ञता रखते हैं।"
  },
  {
    id: "dr-ajay-singh",
    name: "Dr. Ajay Singh",
    specialtyKey: "medicine",
    title_en: "MD Medicine",
    title_hi: "एमडी मेडिसिन",
    qualification_en: "MD (Medicine)",
    qualification_hi: "एमडी (मेडिसिन)",
    opd_en: "Flexible (Emergency 24x7)",
    opd_hi: "लचीला समय (आपातकालीन 24x7)",
    image: "https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&w=300&h=375&q=70&fm=webp",
    bio_en: "Dr. Ajay Singh is a dedicated physician specializing in internal medicine, providing expert care for complex medical conditions at Aarav Hospital.",
    bio_hi: "डॉ. अजय सिंह एक समर्पित चिकित्सक हैं जो आंतरिक चिकित्सा में विशेषज्ञता रखते हैं।"
  }
];

// Departments / Specialties list
const DEPARTMENTS = [
  {
    id: "general-medicine",
    name_en: "General Medicine",
    name_hi: "सामान्य चिकित्सा (फिजिशियन)",
    icon: Activity,
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    desc_en: "Chronic fever management, blood pressure, diabetes, thyroid and lifestyle illnesses managed under Dr. Ajay Singh.",
    desc_hi: "डॉ. अजय सिंह के अधीन पुराना बुखार प्रबंधन, रक्तचाप, मधुमेह, थायराइड और जीवनशैली से संबंधित बीमारियां।"
  },
  {
    id: "maternity-care",
    name_en: "Maternity Care",
    name_hi: "मातृत्व एवं प्रसव देखभाल",
    icon: Baby,
    color: "bg-rose-50 text-rose-700 border-rose-100",
    desc_en: "Painless deliveries, advanced pregnancy diagnostics, post-pregnancy care, and safe deliveries under Dr. Vinita Goel.",
    desc_hi: "डॉ. विनीता गोयल के अधीन दर्द रहित प्रसव, उन्नत गर्भावस्था निदान, प्रसवोत्तर देखभाल और सुरक्षित प्रसव।"
  },
  {
    id: "infertility-treatment",
    name_en: "Infertility Treatment",
    name_hi: "बांझपन उपचार केंद्र",
    icon: Heart,
    color: "bg-pink-50 text-pink-700 border-pink-100",
    desc_en: "Comprehensive fertility diagnostics, ovulation monitoring, customized IUI cycles, and counselor support overseen by Dr. Vinita Goel.",
    desc_hi: "डॉ. विनीता गोयल द्वारा संचालित व्यापक प्रजनन क्षमता निदान, ओव्यूलेशन निगरानी, अनुकूलित आईयूआई चक्र और परामर्श।"
  },
  {
    id: "orthopaedics",
    name_en: "Orthopaedics",
    name_hi: "हड्डी एवं जोड़ रोग विभाग",
    icon: Bone,
    color: "bg-blue-50 text-blue-700 border-blue-100",
    desc_en: "Advanced fracture alignment, plastering, knee and hip replacements, and joint arthroscopy under Dr. Shrey Singh.",
    desc_hi: "डॉ. श्रेय सिंह के अधीन उन्नत फ्रैक्चर संरेखण, प्लास्टरिंग, घुटने और कूल्हे का प्रतिस्थापन, और जोड़ आर्थोस्कोपी।"
  },
  {
    id: "neurosurgery",
    name_en: "Neurosurgery",
    name_hi: "मस्तिष्क एवं रीढ़ की सर्जरी",
    icon: Brain,
    color: "bg-purple-50 text-purple-700 border-purple-100",
    desc_en: "Complex neurosurgery for brain hemorrhage, spinal disc pain, vertebral injuries, and head trauma by Dr. Manas Prakash & Dr. PK Verma.",
    desc_hi: "डॉ. मानस प्रकाश और डॉ. पीके वर्मा द्वारा मस्तिष्क रक्तस्राव, रीढ़ की हड्डी के डिस्क दर्द और सिर के आघात के लिए जटिल न्यूरोसर्जरी।"
  },
  {
    id: "pediatrics",
    name_en: "Pediatrics",
    name_hi: "बाल रोग एवं शिशु विभाग",
    icon: Smile,
    color: "bg-amber-50 text-amber-700 border-amber-100",
    desc_en: "Newborn health checkups, baby immunization cards, pediatric asthma, pediatric ICU (NICU) care handled by Dr. Shivendra.",
    desc_hi: "डॉ. शिवेंद्र द्वारा नवजात स्वास्थ्य जांच, शिशु टीकाकरण कार्ड, बाल अस्थमा, बाल रोग आईसीयू (एनआईसीयू) देखभाल।"
  },
  {
    id: "urology",
    name_en: "Urology",
    name_hi: "मूत्र एवं गुर्दा रोग विभाग",
    icon: Shield,
    color: "bg-indigo-50 text-indigo-700 border-indigo-100",
    desc_en: "Laser kidney stone removal, urinary tract infections, prostate treatment, and specialized urological care by Dr. Vikas Kumar.",
    desc_hi: "डॉ. विकास कुमार द्वारा लेजर से गुर्दे की पथरी निकालना, यूरिनरी ट्रैक्ट इन्फेक्शन, प्रोस्टेट उपचार और मूत्र रोग देखभाल।"
  },
  {
    id: "general-surgery",
    name_en: "General Surgery",
    name_hi: "सामान्य एवं दूरबीन सर्जरी",
    icon: Scissors,
    color: "bg-teal-50 text-teal-700 border-teal-100",
    desc_en: "Laparoscopic gallbladder, hernia mesh surgeries, appendix, and specialized surgical operations led by Dr. D.K. Tripathi.",
    desc_hi: "डॉ. डी.के. त्रिपाठी के नेतृत्व में लेप्रोस्कोपिक गॉल ब्लैडर, हर्निया मेश सर्जरी, अपेंडिक्स और विशेष सर्जिकल ऑपरेशन।"
  },
  {
    id: "critical-care",
    name_en: "Critical Care & Pain Medicine (ICU)",
    name_hi: "गंभीर जीवन-रक्षक आईसीयू",
    icon: Activity,
    color: "bg-red-50 text-red-700 border-red-100",
    desc_en: "24/7 advanced multi-channel ICU with state-of-the-art ventilators and monitoring under Dr. Rupesh Goel.",
    desc_hi: "डॉ. रूपेश गोयल के अधीन अत्याधुनिक वेंटिलेटर और निगरानी के साथ 24/7 उन्नत मल्टी-चैनल आईसीयू।"
  },
    {
    id: "pain-medicine",
    name_en: "Pain Medicine",
    name_hi: "दर्द चिकित्सा विभाग",
    icon: Activity,
    color: "bg-orange-50 text-orange-700 border-orange-100",
    desc_en: "Specialized pain management for chronic and acute conditions including nerve blocks, joint injections, and comprehensive pain relief programs under Dr. Rupesh Goel.",
    desc_hi: "डॉ. रूपेश गोयल के अधीन नर्व ब्लॉक, जोड़ इंजेक्शन और व्यापक दर्द राहत कार्यक्रमों सहित पुराने और तीव्र दर्द के लिए विशेष दर्द प्रबंधन।"
  }
];

// Facilities Gallery List
const FACILITIES = [
  {
    id: "icu",
    name_en: "Intensive Care Unit (ICU)",
    name_hi: "गहन चिकित्सा इकाई (ICU)",
    image: "https://images.unsplash.com/photo-1628372095387-017d1099fc19?auto=format&fit=crop&w=600&h=400&q=80",
    desc_en: "An advanced multi-bed ICU loaded with ventilators, continuous oxygen supply, and cardiac monitoring systems.",
    desc_hi: "अत्याधुनिक वेंटिलेटर, ऑक्सीजन आपूर्ति और कार्डियक निगरानी प्रणालियों से लैस एक उन्नत मल्टी-बेड आईसीयू।"
  },
  {
    id: "nicu",
    name_en: "Neonatal Intensive Care Unit (NICU)",
    name_hi: "नवजात गहन चिकित्सा इकाई (NICU)",
    image: "https://images.pexels.com/photos/5364345/pexels-photo-5364345.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    desc_en: "Specialized incubators, neonatal warmers, and phototherapy systems operated under the care of specialist pediatricians.",
    desc_hi: "विशेष बाल रोग विशेषज्ञों की देखरेख में संचालित विशेष इनक्यूबेटर, नवजात वार्मर और फोटोथेरेपी सिस्टम।"
  },
  {
    id: "opd-chamber",
    name_en: "Modern OPD Chamber",
    name_hi: "आधुनिक ओपीडी चेंबर (OPD)",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&h=400&q=80",
    desc_en: "Spacious OPD rooms designed for stress-free patient consultation with specialists.",
    desc_hi: "विशेषज्ञों के साथ तनावमुक्त परामर्श के लिए विशेष रूप से डिज़ाइन किए गए विशाल ओपीडी चेंबर।"
  },
  {
    id: "general-ward",
    name_en: "Hygienic General Ward",
    name_hi: "स्वच्छ जनरल वार्ड",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&h=400&q=80",
    desc_en: "Highly sanitized general wards with constant nursing staff, comfortable bedding, and quick oxygen supply lanes.",
    desc_hi: "लगातार नर्सिंग स्टाफ, आरामदायक बिस्तरों और त्वरित ऑक्सीजन आपूर्ति वाली अत्यधिक स्वच्छ जनरल वार्ड व्यवस्था।"
  },
  {
    id: "private-rooms",
    name_en: "AC Private Rooms",
    name_hi: "एसी प्राइवेट रूम",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&h=400&q=80",
    desc_en: "Peaceful air-conditioned private cabins with attachments, separate helper bed, and high privacy.",
    desc_hi: "संलग्नों, सहायक बिस्तर और उच्च गोपनीयता के साथ शांतिपूर्ण वातानुकूलित निजी केबिन।"
  },
  {
    id: "ventilator",
    name_en: "Ventilator Support",
    name_hi: "वेंटिलेटर सपोर्ट",
    image: "https://images.unsplash.com/photo-1628372095387-017d1099fc19?auto=format&fit=crop&w=600&h=400&q=80",
    desc_en: "Life-saving artificial respiration machines managed round the clock by critical care specialists.",
    desc_hi: "क्रिटिकल केयर विशेषज्ञों द्वारा चौबीसों घंटे प्रबंधित जीवन रक्षक कृत्रिम श्वसन मशीनें।"
  },
  {
    id: "xray",
    name_en: "Digital X-Ray Unit",
    name_hi: "डिजिटल एक्स-रे यूनिट",
    image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&h=400&q=80",
    desc_en: "High resolution, instant digital X-ray scans with minimum radiation levels.",
    desc_hi: "न्यूनतम विकिरण स्तरों के साथ उच्च रिज़ॉल्यूशन, त्वरित डिजिटल एक्स-रे स्कैनिंग सुविधा।"
  },
  {
    id: "ambulance",
    name_en: "Ambulance Service",
    name_hi: "एम्बुलेंस सेवा",
    image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=600&h=400&q=80",
    desc_en: "Round-the-clock ambulance service for emergency patient transport with trained paramedic staff and oxygen support.",
    desc_hi: "प्रशिक्षित पैरामेडिक स्टाफ और ऑक्सीजन सपोर्ट के साथ आपातकालीन रोगी परिवहन के लिए चौबीसों घंटे एम्बुलेंस सेवा।"
  },
  {
    id: "ot",
    name_en: "Sterile Operation Theatre (OT)",
    name_hi: "जीवाणुरहित ऑपरेशन थियेटर (OT)",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&h=400&q=80",
    desc_en: "Ultra-clean laminar air flow surgical rooms equipped with state-of-the-art surgical lighting and anesthesia stations.",
    desc_hi: "अत्याधुनिक सर्जिकल लाइटिंग और एनेस्थीसिया स्टेशनों से लैस अल्ट्रा-क्लीन लैमिनार एयर फ्लो सर्जिकल रूम।"
  }
];

// Why Choose Us
const WHY_CHOOSE_US = [
  {
    title_en: "Experienced Specialists",
    title_hi: "अनुभवी विशेषज्ञ डॉक्टर",
    desc_en: "Highly qualified doctors (MD, DGO, MCH, MS, DNB) representing top-tier Indian medical institutes directly serving Gorakhpur.",
    desc_hi: "शीर्ष भारतीय चिकित्सा संस्थानों से उच्च योग्यता प्राप्त (एमडी, डीजीओ, एमसीएच, एमएस, डीएनबी) डॉक्टरों की एक विश्वसनीय टीम।"
  },
  {
    title_en: "Modern & Sterile Equipment",
    title_hi: "आधुनिक और सुरक्षित उपकरण",
    desc_en: "Laminar flow OTs, computerized ventilators, digital X-rays, and round-the-clock ambulance service to ensure flawless care and safety.",
    desc_hi: "दोषरहित निदान और पूर्ण सुरक्षा सुनिश्चित करने के लिए लैमिनार फ्लो ओटी, कम्प्यूटरीकृत वेंटिलेटर, डिजिटल एक्स-रे और 24/7 एम्बुलेंस सेवा।"
  },
  {
    title_en: "Affordable Treatment",
    title_hi: "किफायती चिकित्सा शुल्क",
    desc_en: "No hidden charges. Premium healthcare standard designed to fit comfortably into local families' economic budgets.",
    desc_hi: "कोई छुपा हुआ शुल्क नहीं। स्थानीय परिवारों के बजट के अनुसार प्रीमियम चिकित्सा सेवाएं।"
  },
  {
    title_en: "Maternity & Infertility Pioneers",
    title_hi: "मातृत्व एवं बांझपन उपचार में अग्रणी",
    desc_en: "Over a thousand successful happy normal deliveries and highly acclaimed IUI infertility success rates under Dr. Vinita Goel.",
    desc_hi: "डॉ. विनीता गोयल के मार्गदर्शन में एक हजार से अधिक सफल सामान्य प्रसव और उच्च प्रशंसित बांझपन उपचार सफलता दर।"
  },
  {
    title_en: "24×7 Active Emergency",
    title_hi: "24×7 तत्काल आपातकालीन सेवाएं",
    desc_en: "Instant trauma responses, emergency physicians, and fully functional oxygen beds available 24 hours a day, 365 days a year.",
    desc_hi: "दुर्घटना, प्रसव या बच्चों की गंभीर स्थितियों के लिए 24 घंटे त्वरित आपातकालीन रेस्पोंस और ऑक्सीजन बेड।"
  },
  {
    title_en: "Dedicated NICU & ICU with Ventilator",
    title_hi: "समर्पित NICU और वेंटिलेटर के साथ ICU",
    desc_en: "Immediate specialized care for critically ill patients and neonatal support setups for delicate pre-term infants.",
    desc_hi: "गंभीर रोगियों के लिए तत्काल विशेष देखभाल और नवजात शिशुओं के लिए अत्याधुनिक एनआईसीयू इनक्यूबेटर सहायता।"
  }
];

// FAQs for SEO Schema
const FAQS = [
  {
    question_en: "What are the OPD timings of Aarav Hospital Gorakhpur?",
    question_hi: "आरव अस्पताल गोरखपुर में ओपीडी (OPD) का समय क्या है?",
    answer_en: "Our standard outpatient consultation (OPD) hours are flexible. However, emergency services are fully active 24x7.",
    answer_hi: "हमारे नियमित ओपीडी परामर्श का समय सोमवार से शनिवार सुबह 10:00 बजे से दोपहर 4:00 बजे तक है। हालांकि, आपातकालीन सेवाएं 24x7 सक्रिय रहती हैं।"
  },
  {
    question_en: "Is there a pediatric ICU (NICU) for premature babies?",
    question_hi: "क्या कमजोर नवजात शिशुओं के लिए अस्पताल में एनआईसीयू (NICU) की सुविधा है?",
    answer_en: "Yes, Aarav Hospital has a fully-equipped Neonatal Intensive Care Unit (NICU) with incubator warmth systems, neonatal phototherapy, and dedicated child specialist support under Dr. Shivendra.",
    answer_hi: "हां, आरव अस्पताल में इनक्यूबेटर वार्मथ सिस्टम, फोटोथेरेपी और डॉ. शिवेंद्र की देखरेख में नवजात शिशुओं के लिए पूरी तरह सुसज्जित एनआईसीयू (NICU) की सुविधा है।"
  },
  {
    question_en: "How do I book an appointment with Dr. Vinita Goel or Dr. Rupesh Goel?",
    question_hi: "डॉ. विनीता गोयल या डॉ. रूपेश गोयल से अपॉइंटमेंट कैसे लें?",
    answer_en: "You can book an appointment directly by tapping the 'Book via WhatsApp' button which instantly connects you to our desk with pre-filled details, or by calling our official phone lines 9565750707 or 738085880.",
    answer_hi: "आप हमारे 'व्हाट्सएप बुक करें' बटन पर क्लिक करके सीधे व्हाट्सएप संदेश भेज सकते हैं, या सीधे हमारे हेल्पलाइन नंबरों 9565750707 या 738085880 पर कॉल कर सकते हैं।"
  },
  {
    question_en: "Where is Aarav Hospital located in Gorakhpur?",
    question_hi: "आरव अस्पताल गोरखपुर में कहां पर स्थित है?",
    answer_en: "We are situated at J3, Rapti Nagar Phase 4, near ITI Charghawa, Gorakhpur - 273003. You can click 'Get Directions' on our website to load the Google Maps path instantly.",
    answer_hi: "हम J3, राप्ती नगर फेज 4, आईटीआई चरगांवा के निकट, गोरखपुर - 273003 पर स्थित हैं। आप तुरंत नक्शा देखने के लिए हमारी वेबसाइट पर 'Get Directions' बटन दबा सकते हैं।"
  }
];

// Patient Reviews
const REVIEWS = [
  {
    name_en: "Ramesh Tripathi, Gorakhpur",
    name_hi: "रमेश त्रिपाठी, गोरखपुर",
    text_en: "Dr. Vinita Goel delivered my daughter safely. The hospital staff is highly polite, and the pricing was extremely transparent and affordable. Highly recommend Aarav Hospital!",
    text_hi: "डॉ. विनीता गोयल ने मेरी बेटी का सुरक्षित प्रसव कराया। अस्पताल के कर्मचारी अत्यधिक विनम्र हैं, और उपचार शुल्क पारदर्शी था। आरव अस्पताल की अत्यधिक सिफारिश करता हूं!",
    stars: 5
  },
  {
    name_en: "Sanjay Kumar Prasad, Rapti Nagar",
    name_hi: "संजय कुमार प्रसाद, राप्ती नगर",
    text_en: "My father was admitted under Dr. Rupesh Goel in critical state. Excellent ventilator care, prompt action, and saved his life. Extremely grateful to the critical care team.",
    text_hi: "मेरे पिता को गंभीर स्थिति में डॉ. रूपेश गोयल की देखरेख में भर्ती कराया गया था। उत्कृष्ट वेंटिलेटर देखभाल और त्वरित कार्रवाई ने उनकी जान बचाई। क्रिटिकल केयर टीम के लिए बेहद आभारी हूं।",
    stars: 5
  },
  {
    name_en: "Archana Singh, Gorakhpur",
    name_hi: "अर्चना सिंह, गोरखपुर",
    text_en: "Consulted Dr. Shrey Singh for chronic knee joint pain. Extremely helpful diagnostic scan and exercises suggested. Best orthopaedic support in Gorakhpur.",
    text_hi: "घुटने के पुराने दर्द के लिए डॉ. श्रेय सिंह से सलाह ली। उत्कृष्ट नैदानिक स्कैन और सुझाई गई कसरत बेहद मददगार रही। गोरखपुर में सर्वश्रेष्ठ ऑर्थोपेडिक सहायता।",
    stars: 5
  }
];

// Helper to inject Schema Markup for Local SEO, Hospital, and FAQ page
const injectSEOAndSchema = (pageType, title, description, path) => {
  // Remove existing dynamic schema tags
  const existingSchemas = document.querySelectorAll('script[data-dynamic-schema="true"]');
  existingSchemas.forEach(el => el.remove());

  // Meta updating
  document.title = `${title} | Aarav Hospital Gorakhpur`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description);

  // Define Schema Object
  const schemaList = [];

  // 1. Hospital Business Schema
  schemaList.push({
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "Aarav Maternity & Multispeciality Hospital",
    "alternateName": "Aarav Hospital Gorakhpur",
    "image": "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    "url": window.location.origin,
    "telephone": "+919565750707",
    "email": "aaravhospital76@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "J3, Rapti Nagar Phase 4, near ITI Charghawa",
      "addressLocality": "Gorakhpur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "273003",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 26.777933,
      "longitude": 83.385566
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "medicalSpecialty": ["Maternity", "Neurosurgery", "Orthopaedics", "Pediatrics", "Urology", "GeneralSurgery", "CriticalCare"]
  });

  // 2. FAQ Schema (if home)
  if (pageType === "home") {
    schemaList.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.question_en,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer_en
        }
      }))
    });
  }

  // Inject schema scripts into head
  schemaList.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic-schema', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
};

// --- Header Component ---
const Header = ({ lang, setLang }) => {
  const t = TRANSLATIONS[lang];
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    setMenuOpen(false);
    if (window.location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("home");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (window.location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm" data-testid="site-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" data-testid="header-logo-link" onClick={handleHomeClick}>
            <div className="w-9 h-9 rounded-xl bg-[#064E3B] flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm font-extrabold text-[#022C22] font-heading leading-tight">Aarav Hospital</p>
              <p className="text-[10px] text-slate-500 font-semibold leading-tight">Gorakhpur</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-700">
            <Link to="/" onClick={handleHomeClick} className="hover:text-[#064E3B] transition-colors" data-testid="nav-home">Home</Link>
            <button onClick={() => handleNavClick("facilities")} className="hover:text-[#064E3B] transition-colors" data-testid="nav-services">Services</button>
            <button onClick={() => handleNavClick("departments")} className="hover:text-[#064E3B] transition-colors" data-testid="nav-specialties">Specialties</button>
            <button onClick={() => handleNavClick("specialists")} className="hover:text-[#064E3B] transition-colors" data-testid="nav-experts">Medical Experts</button>
            <button onClick={() => handleNavClick("location")} className="hover:text-[#064E3B] transition-colors" data-testid="nav-location">Location</button>
            <button onClick={() => handleNavClick("services-quick")} className="hover:text-[#064E3B] transition-colors" data-testid="nav-appointment">Book Appointment</button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex rounded-xl border border-slate-200 overflow-hidden text-xs font-bold" data-testid="lang-switcher">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 transition-colors ${lang === "en" ? "bg-[#064E3B] text-white" : "text-slate-600 hover:bg-slate-50"}`}
                data-testid="lang-en-btn"
              >
                EN
              </button>
              <button
                onClick={() => setLang("hi")}
                className={`px-3 py-1.5 transition-colors ${lang === "hi" ? "bg-[#064E3B] text-white" : "text-slate-600 hover:bg-slate-50"}`}
                data-testid="lang-hi-btn"
              >
                हि
              </button>
            </div>

            {/* Emergency CTA (hidden on mobile, visible on sm+) */}
            <a
              href="tel:9565750707"
              className="hidden sm:flex items-center gap-2 h-10 px-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-extrabold rounded-xl shadow transition-all duration-200 text-sm"
              data-testid="header-emergency-btn"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span>Emergency</span>
            </a>

            {/* Hamburger Button (only visible below md screen width) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[#022C22] hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle menu"
              data-testid="mobile-menu-toggle"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3 shadow-inner animate-fade-in" data-testid="mobile-nav-panel">
          <nav className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="px-4 py-3 text-base font-bold text-slate-700 hover:text-[#064E3B] hover:bg-slate-50 rounded-xl transition-all"
            >
              {lang === "en" ? "Home" : "मुख्य पृष्ठ"}
            </Link>
            <button
              onClick={() => handleNavClick("facilities")}
              className="px-4 py-3 text-base font-bold text-slate-700 hover:text-[#064E3B] hover:bg-slate-50 rounded-xl transition-all text-left"
            >
              {lang === "en" ? "Services" : "सेवाएं"}
            </button>
            <button
              onClick={() => handleNavClick("departments")}
              className="px-4 py-3 text-base font-bold text-slate-700 hover:text-[#064E3B] hover:bg-slate-50 rounded-xl transition-all text-left"
            >
              {lang === "en" ? "Specialties" : "विशेषताएं"}
            </button>
            <button
              onClick={() => handleNavClick("specialists")}
              className="px-4 py-3 text-base font-bold text-slate-700 hover:text-[#064E3B] hover:bg-slate-50 rounded-xl transition-all text-left"
            >
              {lang === "en" ? "Medical Experts" : "चिकित्सा विशेषज्ञ"}
            </button>
            <button
              onClick={() => handleNavClick("location")}
              className="px-4 py-3 text-base font-bold text-slate-700 hover:text-[#064E3B] hover:bg-slate-50 rounded-xl transition-all text-left"
            >
              {lang === "en" ? "Location" : "स्थान"}
            </button>
            <button
              onClick={() => handleNavClick("services-quick")}
              className="px-4 py-3 text-base font-bold text-slate-700 hover:text-[#064E3B] hover:bg-slate-50 rounded-xl transition-all text-left"
            >
              {lang === "en" ? "Book Appointment" : "अपॉइंटमेंट बुक करें"}
            </button>
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:9565750707"
              className="w-full h-12 bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center justify-center gap-2 font-extrabold rounded-xl shadow-md transition-all active:scale-95 text-sm"
              data-testid="mobile-nav-emergency"
            >
              <Phone className="w-4 h-4 animate-pulse" />
              <span>Emergency Call: 9565750707</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

// --- Footer Component ---
const Footer = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <footer className="bg-slate-900 text-white py-16" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand Column */}
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-white font-heading">Aarav Hospital</p>
              <p className="text-[10px] text-slate-400 font-semibold">Gorakhpur</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">{t.aboutDescription}</p>
          <div className="flex gap-3">
            <a href="tel:9565750707" className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center hover:bg-red-500 transition-colors" data-testid="footer-call-btn">
              <Phone className="w-5 h-5 text-white" />
            </a>
            <a href={`https://wa.me/919565750707?text=${encodeURIComponent(t.whatsappBookText)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center hover:bg-[#16A34A] transition-colors" data-testid="footer-whatsapp-btn">
              <MessageSquare className="w-5 h-5 text-white" />
            </a>
            <a href="https://maps.app.goo.gl/y8uCi3bR4FfkLTwg6" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors" data-testid="footer-map-btn">
              <MapPin className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* SEO Links Column */}
        <div className="space-y-4 text-left">
          <h3 className="text-white font-bold text-base uppercase tracking-wider font-heading">
            {lang === "en" ? "Find a Specialist" : "विशेषज्ञ डॉक्टर"}
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <Link to="/best-maternity-hospital-in-gorakhpur" className="hover:text-white transition-colors" data-testid="footer-seo-maternity">
                → {t.seoMaternityTitle}
              </Link>
            </li>
            <li>
              <Link to="/best-orthopaedic-doctor-in-gorakhpur" className="hover:text-white transition-colors" data-testid="footer-seo-ortho">
                → {t.seoOrthopaedicTitle}
              </Link>
            </li>
            <li>
              <Link to="/best-neurosurgeon-in-gorakhpur" className="hover:text-white transition-colors" data-testid="footer-seo-neuro">
                → {t.seoNeurosurgeryTitle}
              </Link>
            </li>
            <li>
              <Link to="/best-pediatrician-in-gorakhpur" className="hover:text-white transition-colors" data-testid="footer-seo-peds">
                → {t.seoPediatricianTitle}
              </Link>
            </li>
            <li>
              <Link to="/best-infertility-specialist-in-gorakhpur" className="hover:text-white transition-colors" data-testid="footer-seo-fertility">
                → {t.seoInfertilityTitle}
              </Link>
            </li>
          </ul>
        </div>

        {/* Official Contacts */}
        <div className="space-y-4 text-left">
          <h3 className="text-white font-bold text-base uppercase tracking-wider font-heading">
            {t.contactInfo}
          </h3>
          <div className="space-y-3.5 text-sm text-slate-400">
            <div className="flex gap-2.5 items-start">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                {t.address}
              </span>
            </div>
            <div className="flex gap-2.5 items-center">
              <Phone className="w-5 h-5 text-red-500 shrink-0" />
              <div className="flex flex-col">
                <a href="tel:9565750707" className="hover:text-white font-bold text-white">9565750707</a>
                <a href="tel:738085880" className="hover:text-white font-bold">738085880</a>
              </div>
            </div>
            <div className="flex gap-2.5 items-center">
              <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
              <a href="mailto:aaravhospital76@gmail.com" className="hover:text-white font-medium">
                aaravhospital76@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} {t.allRightsReserved}</p>
        <p className="font-medium text-slate-400">
          Developed by{" "}
          <a
            href="https://www.instagram.com/techie.jatin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-500 hover:text-emerald-400 font-bold transition-colors inline-flex items-center gap-1 hover:underline"
          >
            @techie.jatin
          </a>
        </p>
      </div>
    </footer>
  );
};

// Floating Action Buttons at the Bottom Right
const FloatingActionButtons = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
      {/* WhatsApp Booking Target */}
      <a
        href={`https://wa.me/919565750707?text=${encodeURIComponent(t.whatsappBookText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] active:bg-[#16A34A] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 relative group"
        data-testid="floating-whatsapp-booking"
      >
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
          {t.bookWhatsApp}
        </span>
        <MessageSquare className="w-6 h-6" />
      </a>

      {/* Emergency Call Target */}
      <a
        href="tel:9565750707"
        className="w-14 h-14 bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#DC2626] focus:ring-offset-2 relative group"
        data-testid="floating-emergency-call"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute inset-0 rounded-full bg-[#DC2626] animate-ping opacity-30 pointer-events-none"></span>
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-md">
          {t.tapToCall}
        </span>
        <Phone className="w-6 h-6 relative z-10" />
      </a>
    </div>
  );
};


// --- Homepage Component ---
const HomePage = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered doctors list based on category & search term
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter(doc => {
      const matchSpecialty = specialtyFilter === "all" || doc.specialtyKey === specialtyFilter;
      const docName = doc.name.toLowerCase();
      const docTitle = (lang === "en" ? doc.title_en : doc.title_hi).toLowerCase();
      const sTerm = searchTerm.toLowerCase();
      const matchSearch = docName.includes(sTerm) || docTitle.includes(sTerm);
      return matchSpecialty && matchSearch;
    });
  }, [specialtyFilter, searchTerm, lang]);

  // Inject home schema markup on mount
  useEffect(() => {
    injectSEOAndSchema(
      "home",
      t.hospitalName,
      t.aboutDescription,
      "/"
    );
  }, [lang, t]);

  // Handle hash scroll from navigation
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="space-y-16" data-testid="homepage-container">
      
      {/* 1. HERO SECTION (Above the Fold) */}
      <section id="home" className="relative bg-gradient-to-br from-[#022C22]/5 via-white to-slate-100 py-16 lg:py-24 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-[#064E3B]/10 text-[#064E3B] px-4 py-2 rounded-full text-sm font-extrabold shadow-sm">
                <Star className="w-4 h-4 fill-[#064E3B]" />
                <span>{t.bestInGorakhpur}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#022C22] tracking-tight leading-tight font-heading">
                  {t.hospitalName}
                </h1>
                <p className="text-lg sm:text-xl text-[#047857] font-bold">
                  {t.hospitalSubtitle}
                </p>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  {t.subtagline}
                </p>
              </div>

              {/* Massive action blocks with zero form fields */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                {/* Emergency Call Target */}
                <a
                  href="tel:9565750707"
                  className="flex-1 py-4 px-6 bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center justify-center gap-3 font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 duration-200"
                  data-testid="hero-emergency-btn"
                >
                  <Phone className="w-6 h-6 animate-pulse" />
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] uppercase font-bold text-red-200">{t.emergencyCall}</span>
                    <span className="block text-lg">9565750707</span>
                  </div>
                </a>

                {/* WhatsApp Chat Target */}
                <a
                  href={`https://wa.me/919565750707?text=${encodeURIComponent(t.whatsappBookText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 px-6 bg-[#25D366] hover:bg-[#16A34A] text-white flex items-center justify-center gap-3 font-extrabold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 duration-200"
                  data-testid="hero-whatsapp-btn"
                >
                  <MessageSquare className="w-6 h-6" />
                  <div className="text-left leading-tight">
                    <span className="block text-[10px] uppercase font-bold text-emerald-100">Click to Book</span>
                    <span className="block text-lg">{t.bookWhatsApp}</span>
                  </div>
                </a>
              </div>

              {/* Get Directions Target */}
              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/y8uCi3bR4FfkLTwg6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-4 bg-[#064E3B] hover:bg-[#047857] text-white font-extrabold rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 text-base"
                  data-testid="hero-directions-btn"
                >
                  <MapPin className="w-5 h-5 text-emerald-300" />
                  <span>{t.getDirections} (Google Map)</span>
                </a>
              </div>

              {/* Key Trust Stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200">
                <div className="text-left">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#022C22] font-heading">2+</span>
                  <span className="block text-xs sm:text-sm text-slate-500 font-semibold">{t.yearsExp}</span>
                </div>
                <div className="text-left">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#022C22] font-heading">20,000+</span>
                  <span className="block text-xs sm:text-sm text-slate-500 font-semibold">{t.patientsServed}</span>
                </div>
                <div className="text-left">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#022C22] font-heading">40+</span>
                  <span className="block text-xs sm:text-sm text-slate-500 font-semibold">{t.icuBeds}</span>
                </div>
                <div className="text-left">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#022C22] font-heading">8</span>
                  <span className="block text-xs sm:text-sm text-slate-500 font-semibold">{t.expertDoctors}</span>
                </div>
              </div>

            </div>

            {/* Right Graphics/Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=75&fm=webp"
                  alt="Aarav Hospital Gorakhpur"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  decoding="async"
                  fetchPriority="high"
                />
                {/* Visual Accent Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">Aarav Maternity and Multispecialty Hospital</p>
                  <p className="text-base sm:text-lg font-bold">J3/ Raptinagar Phase 4, Gorakhpur</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. QUICK SERVICES SECTION */}
      <span id="services-quick"></span>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading">
            {t.quickActions}
          </h2>
          <div className="w-16 h-1 bg-emerald-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          
          {/* Card 1: Emergency Care */}
          <div className="bg-red-50 hover:bg-red-100 border border-red-100 p-6 rounded-2xl flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] duration-200">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm">
                <Phone className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-extrabold text-red-900 font-heading">
                {lang === "en" ? "24x7 Emergency Care" : "24/7 आपातकालीन सेवा"}
              </h3>
              <p className="text-sm text-red-700 font-medium text-left">
                {lang === "en" ? "Instant medical backup, ICU support, and trauma doctors." : "तत्काल चिकित्सा सहायता, आईसीयू बैकअप और विशेषज्ञ चिकित्सक।"}
              </p>
            </div>
            <a href="tel:9565750707" className="w-full py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-extrabold rounded-xl text-center shadow text-sm block" data-testid="quick-emergency-card-btn">
              {t.callNow} (9565750707)
            </a>
          </div>

          {/* Card 2: Book Appointment */}
          <div className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 p-6 rounded-2xl flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] duration-200">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-emerald-900 font-heading">
                {lang === "en" ? "Book WhatsApp Appointment" : "व्हाट्सएप अपॉइंटमेंट"}
              </h3>
              <p className="text-sm text-emerald-700 font-medium text-left">
                {lang === "en" ? "Directly send preferred doctor name and date to book instantly." : "बिना किसी फॉर्म के सीधे व्हाट्सएप संदेश द्वारा डॉक्टर बुक करें।"}
              </p>
            </div>
            <a href={`https://wa.me/919565750707?text=${encodeURIComponent(t.whatsappBookText)}`} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#25D366] hover:bg-[#16A34A] text-white font-extrabold rounded-xl text-center shadow text-sm block" data-testid="quick-whatsapp-card-btn">
              {t.bookWhatsApp}
            </a>
          </div>

          {/* Card 3: Find Direction */}
          <div className="bg-blue-50 hover:bg-blue-100 border border-blue-100 p-6 rounded-2xl flex flex-col justify-between space-y-4 transition-all hover:scale-[1.02] duration-200">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-blue-900 font-heading">
                {lang === "en" ? "Get Google Maps Direction" : "नक्शा रास्ता खोजें"}
              </h3>
              <p className="text-sm text-blue-700 font-medium text-left">
                {lang === "en" ? "Open Google Maps navigation directly to Aarav Hospital gates." : "आरव अस्पताल गेट तक सीधे गूगल मैप्स जीपीएस नेविगेशन शुरू करें।"}
              </p>
            </div>
            <a href="https://maps.app.goo.gl/y8uCi3bR4FfkLTwg6" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-center shadow text-sm block" data-testid="quick-direction-card-btn">
              {t.getDirections}
            </a>
          </div>

        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <span id="about"></span>
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
                {t.aboutHospital}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading leading-tight">
                {t.trustedHealthcare}
              </h2>
              <div className="w-16 h-1 bg-emerald-600 rounded"></div>
              <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
                {t.aboutDescription}
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm sm:text-base">
                    {lang === "en" ? "Supervised ICU and Neonatal incubators active 24 hours." : "24 घंटे सक्रिय रहने वाली आईसीयू और नवजात शिशु एनआईसीयू सुविधाएं।"}
                  </span>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm sm:text-base">
                    {lang === "en" ? "Modern surgical suites for Neurosurgery, Urology and Trauma." : "न्यूरोसर्जरी, यूरोलॉजी और गंभीर ऑर्थोपेडिक आघात के लिए आधुनिक थिएटर।"}
                  </span>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span className="font-bold text-slate-700 text-sm sm:text-base">
                    {lang === "en" ? "Centrally located in Rapti Nagar, easily accessible for all rural & town patients." : "राप्ती नगर में केंद्रीय स्थान, ग्रामीण एवं शहरी सभी रोगियों के लिए सुलभ।"}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-md aspect-square bg-slate-200">
                    <img src="https://images.unsplash.com/photo-1612349316228-5942a9b489c2?auto=format&fit=crop&w=350&h=350&q=70&fm=webp" alt="OPD Clinic" className="w-full h-full object-cover hover:scale-105 transition-all duration-300" decoding="async" loading="lazy" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-200">
                    <img src="https://images.unsplash.com/photo-1628372095387-017d1099fc19?auto=format&fit=crop&w=350&h=197&q=70&fm=webp" alt="ICU Setup" className="w-full h-full object-cover hover:scale-105 transition-all duration-300" decoding="async" loading="lazy" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden shadow-md aspect-video bg-slate-200">
                    <img src="https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=350&h=197&q=70&fm=webp" alt="General ward" className="w-full h-full object-cover hover:scale-105 transition-all duration-300" decoding="async" loading="lazy" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-md aspect-square bg-slate-200">
                    <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=350&h=350&q=70&fm=webp" alt="Reception Desk" className="w-full h-full object-cover hover:scale-105 transition-all duration-300" decoding="async" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MEET SPECIALISTS SECTION */}
      <span id="specialists"></span>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-left space-y-4">
          <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
            {lang === "en" ? "Expert Physicians" : "विशेषज्ञ डॉक्टर टीम"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading">
            {t.meetSpecialists}
          </h2>
          <div className="w-16 h-1 bg-emerald-600 rounded"></div>
          <p className="text-slate-600 text-left max-w-3xl leading-relaxed text-sm sm:text-base">
            {t.specialistsSubtitle}
          </p>
        </div>

        {/* Filters and search block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-slate-200">
          {/* Custom Pill Filter bar */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSpecialtyFilter("all")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "all" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-all-btn"
            >
              {t.filterSpecialty}
            </button>
            <button
              onClick={() => setSpecialtyFilter("critical_pain_medicine")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "critical_pain_medicine" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-critical-btn"
            >
              {lang === "en" ? "Critical & Pain Medicine" : "गंभीर देखभाल और दर्द चिकित्सा"}
            </button>
            <button
              onClick={() => setSpecialtyFilter("maternity_infertility")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "maternity_infertility" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-maternity-btn"
            >
              {lang === "en" ? "Maternity & IVF" : "मातृत्व एवं बांझपन"}
            </button>
            <button
              onClick={() => setSpecialtyFilter("orthopaedics")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "orthopaedics" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-ortho-btn"
            >
              {lang === "en" ? "Orthopaedics" : "हड्डी रोग"}
            </button>
            <button
              onClick={() => setSpecialtyFilter("neurosurgery")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "neurosurgery" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-neuro-btn"
            >
              {lang === "en" ? "Neurosurgery" : "न्यूरोसर्जरी"}
            </button>
            <button
              onClick={() => setSpecialtyFilter("pediatrics")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "pediatrics" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-pedia-btn"
            >
              {lang === "en" ? "Pediatrics" : "बाल रोग"}
            </button>
            <button
              onClick={() => setSpecialtyFilter("urology")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "urology" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-urology-btn"
            >
              {lang === "en" ? "Urology" : "मूत्र रोग"}
            </button>
            <button
              onClick={() => setSpecialtyFilter("general_surgery")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "general_surgery" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-surgery-btn"
            >
              {lang === "en" ? "General Surgery" : "सामान्य सर्जरी"}
            </button>
            <button
              onClick={() => setSpecialtyFilter("medicine")}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${specialtyFilter === "medicine" ? "bg-[#064E3B] text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              data-testid="filter-medicine-btn"
            >
              {lang === "en" ? "Medicine" : "मेडिसिन"}
            </button>
          </div>

          {/* Visual Search input */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.doctorSearch}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#064E3B] text-slate-800 text-sm font-medium"
              data-testid="doctor-search-input"
            />
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => {
            const docSpecialty = lang === "en" ? doc.title_en : doc.title_hi;
            return (
              <div 
                key={doc.id} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                data-testid={`doctor-card-${doc.id}`}
              >
                <div>
                  {/* Photo area */}
                  <div className="h-64 bg-slate-100 overflow-hidden relative group">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      decoding="async"
                      loading="lazy"
                    />

                  </div>

                  {/* Details Area */}
                  <div className="p-5 space-y-2 text-left">
                    <h3 className="text-xl font-extrabold text-[#022C22] font-heading">
                      {doc.name}
                    </h3>
                    <p className="text-sm font-bold text-emerald-700 leading-snug">
                      {docSpecialty}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pt-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{lang === "en" ? "OPD Hours: " : "ओपीडी: "}{lang === "en" ? doc.opd_en : doc.opd_hi}</span>
                    </div>
                  </div>
                </div>

                {/* Footer CTAs */}
                <div className="p-5 pt-0 space-y-2">
                  <Link 
                    to={`/doctors/${doc.id}`} 
                    className="w-full py-2.5 border border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B]/5 font-bold rounded-xl text-center text-xs block transition-colors"
                    data-testid={`doctor-profile-btn-${doc.id}`}
                  >
                    {t.viewProfile}
                  </Link>
                  <a 
                    href={`https://wa.me/919565750707?text=${encodeURIComponent(`Hello, I want to book an appointment with ${doc.name} at Aarav Hospital.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-[#25D366] hover:bg-[#16A34A] text-white font-extrabold rounded-xl text-center text-xs flex items-center justify-center gap-1.5 shadow transition-all duration-200"
                    data-testid={`doctor-whatsapp-btn-${doc.id}`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.bookWhatsApp}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="bg-slate-50 py-12 px-4 text-center rounded-2xl">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">
              {lang === "en" ? "No doctors found matching search criteria." : "खोजे गए विवरण से कोई डॉक्टर नहीं मिले।"}
            </p>
          </div>
        )}
      </section>

      {/* 5. DEPARTMENTS SECTION */}
      <span id="departments"></span>
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-left space-y-4">
            <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
              {lang === "en" ? "Comprehensive Specialties" : "उत्कृष्ट चिकित्सा विभाग"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading">
              {t.departmentsTitle}
            </h2>
            <div className="w-16 h-1 bg-emerald-600 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept) => {
              const IconComp = dept.icon;
              return (
                <div 
                  key={dept.id} 
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
                  data-testid={`department-card-${dept.id}`}
                >
                  <div className="space-y-3 text-left">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${dept.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-[#022C22] font-heading">
                      {lang === "en" ? dept.name_en : dept.name_hi}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {lang === "en" ? dept.desc_en : dept.desc_hi}
                    </p>
                  </div>
                  <Link 
                    to={`/departments/${dept.id}`} 
                    className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#064E3B] hover:text-[#047857] self-start"
                    data-testid={`department-link-${dept.id}`}
                  >
                    <span>{t.learnMore}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOSPITAL FACILITIES GALLERY */}
      <span id="facilities"></span>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-left space-y-4">
          <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
            {lang === "en" ? "Modern Infrastructure" : "आधुनिक चिकित्सा सुविधाएं"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading">
            {t.facilitiesTitle}
          </h2>
          <div className="w-16 h-1 bg-emerald-600 rounded"></div>
          <p className="text-slate-600 text-left max-w-3xl leading-relaxed text-sm sm:text-base">
            {t.facilitiesSubtitle}
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((fac) => (
            <div 
              key={fac.id} 
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              data-testid={`facility-card-${fac.id}`}
            >
              <div className="h-56 bg-slate-100 overflow-hidden relative">
                <img 
                  src={fac.image} 
                  alt={fac.name_en} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  decoding="async"
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-left space-y-2">
                <h3 className="text-lg font-extrabold text-[#022C22] font-heading">
                  {lang === "en" ? fac.name_en : fac.name_hi}
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {lang === "en" ? fac.desc_en : fac.desc_hi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE US SECTION */}
      <section className="bg-gradient-to-br from-slate-900 to-[#022C22] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <span className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider">
              {lang === "en" ? "Excellence & Commitment" : "चिकित्सा उत्कृष्टता"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading text-white">
              {t.whyChooseUs}
            </h2>
            <div className="w-16 h-1 bg-emerald-500 rounded mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
            {WHY_CHOOSE_US.map((item, index) => (
              <div 
                key={index} 
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3.5 hover:bg-white/10 transition-all duration-200"
                data-testid={`why-choose-card-${index}`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-extrabold text-white font-heading">
                  {lang === "en" ? item.title_en : item.title_hi}
                </h3>
                <p className="text-sm text-slate-300 font-medium leading-relaxed">
                  {lang === "en" ? item.desc_en : item.desc_hi}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. PATIENT TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-left space-y-4">
          <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
            {lang === "en" ? "Real Patient Reviews" : "मरीजों का विश्वास"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading">
            {t.reviewsTitle}
          </h2>
          <div className="w-16 h-1 bg-emerald-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
              data-testid={`review-card-${index}`}
            >
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm italic font-medium leading-relaxed">
                  &ldquo;{lang === "en" ? rev.text_en : rev.text_hi}&rdquo;
                </p>
              </div>
              <div className="font-extrabold text-[#022C22] text-xs uppercase tracking-wider pt-2 border-t border-slate-100">
                - {lang === "en" ? rev.name_en : rev.name_hi}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-left space-y-4">
            <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
              {lang === "en" ? "Got Questions?" : "सामान्य जिज्ञासाएं"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading">
              {t.faqTitle}
            </h2>
            <div className="w-16 h-1 bg-emerald-600 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-2 shadow-sm"
                data-testid={`faq-card-${index}`}
              >
                <h3 className="text-lg font-extrabold text-[#022C22] font-heading">
                  Q. {lang === "en" ? faq.question_en : faq.question_hi}
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  A. {lang === "en" ? faq.answer_en : faq.answer_hi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. GOOGLE MAPS & GEOLOCATION SECTION */}
      <span id="location"></span>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md">
          
          {/* Map details left */}
          <div className="lg:col-span-5 p-8 sm:p-12 text-left space-y-6">
            <span className="text-xs uppercase font-extrabold text-emerald-700 tracking-wider">
              {t.visitUs}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading leading-tight">
              {lang === "en" ? "Easy GPS Navigation" : "आसान जीपीएस रास्ता खोजें"}
            </h2>
            <div className="w-16 h-1 bg-emerald-600 rounded"></div>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {lang === "en" 
                ? "Located prominently near ITI Charghawa on J3, Rapti Nagar Phase 4. Our hospital gate is directly visible from the main avenue. Safe parking space is available inside for patient vehicles."
                : "आईटीआई चरगांवा के निकट जे3, राप्ती नगर फेज 4 पर मुख्य मार्ग पर स्थित। हमारा गेट मुख्य मार्ग से सीधे दिखाई देता है। मरीजों के वाहनों के लिए अंदर सुरक्षित पार्किंग उपलब्ध है।"}
            </p>

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs sm:text-sm text-slate-800 font-bold space-y-1">
              <span className="block text-slate-500 text-[10px] uppercase">{t.addressTitle}</span>
              <span className="block">{t.address}</span>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <a
              href="https://maps.app.goo.gl/y8uCi3bR4FfkLTwg6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 bg-[#064E3B] hover:bg-[#047857] text-white flex items-center justify-center gap-2 font-extrabold rounded-xl shadow transition-transform active:scale-95 duration-200"
              data-testid="get-directions-navigation"
            >
              <MapPin className="w-5 h-5 text-emerald-300" />
              <span>{t.getDirections} (Google Map App)</span>
            </a>
          </div>

          {/* Interactive Google Map embed right */}
          <div className="lg:col-span-7 h-96 sm:h-[450px] w-full bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.9472621111624!2d83.3855663759938!3d26.777933176726887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39914408df1e93e7%3A0xe5a1b32d207f2a1b!2sAarav%20Maternity%20%26%20Multispeciality%20Hospital!5e0!3m2!1sen!2sin!4v1703110000000!5m2!1sen!2sin"
              title="Aarav Hospital Map Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              data-testid="embedded-google-map"
            ></iframe>
          </div>

        </div>
      </section>

      {/* 11. EMERGENCY HIGH-IMPACT BANNER */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-14 rounded-3xl mx-4 sm:mx-8 md:mx-12 shadow-xl">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-white animate-pulse">
            <Phone className="w-4 h-4" />
            <span>{t.emergencyBannerText}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
            {t.emergencySubtitle}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href="tel:9565750707"
              className="h-16 px-10 bg-white text-red-700 hover:bg-red-50 font-extrabold rounded-2xl shadow-lg text-lg flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 duration-200"
              data-testid="emergency-banner-call-btn"
            >
              <Phone className="w-6 h-6 animate-bounce" />
              <span>{t.callNow}: 9565750707</span>
            </a>
            <a
              href={`https://wa.me/919565750707?text=${encodeURIComponent(t.whatsappBookText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-16 px-10 bg-[#25D366] hover:bg-[#16A34A] text-white font-extrabold rounded-2xl shadow-lg text-lg flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 duration-200"
              data-testid="emergency-banner-whatsapp-btn"
            >
              <MessageSquare className="w-6 h-6" />
              <span>{t.bookWhatsApp}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};


// --- Individual Doctor Details Page ---
const DoctorDetailsPage = ({ lang }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];

  const doc = useMemo(() => {
    return DOCTORS.find(d => d.id === id) || DOCTORS[0];
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const title = lang === "en" ? `${doc.name} - ${doc.title_en}` : `${doc.name} - ${doc.title_hi}`;
    const desc = lang === "en" ? doc.bio_en : doc.bio_hi;
    injectSEOAndSchema("doctor", title, desc, `/doctors/${doc.id}`);
  }, [doc, lang]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-8 pb-24 sm:pb-12" data-testid="doctor-details-container">
      {/* Back button */}
      <button 
        onClick={() => navigate("/")} 
        className="inline-flex items-center gap-2 text-[#064E3B] font-bold text-sm hover:underline"
        data-testid="doctor-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToHome}</span>
      </button>

      {/* Doctor Layout details card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Photo Left */}
        <div className="md:col-span-4 space-y-4">
          <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-slate-100 border border-slate-100 max-w-xs sm:max-w-sm mx-auto md:max-w-none">
            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" decoding="async" />
          </div>

        </div>

        {/* Info Right */}
        <div className="md:col-span-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold text-[#022C22] font-heading">
              {doc.name}
            </h1>
            <p className="text-lg font-bold text-emerald-700 leading-tight">
              {lang === "en" ? doc.title_en : doc.title_hi}
            </p>
            <div className="w-12 h-1 bg-emerald-600 rounded"></div>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
              {lang === "en" ? doc.bio_en : doc.bio_hi}
            </p>
          </div>

          {/* Core metadata */}
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-2.5 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Clock className="w-5 h-5 text-slate-400 shrink-0" />
                <div className="text-xs">
                  <span className="block text-slate-500 uppercase font-bold">OPD Schedule</span>
                  <span className="font-extrabold text-slate-800">{lang === "en" ? doc.opd_en : doc.opd_hi}</span>
                </div>
              </div>
              <div className="flex gap-2.5 items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Award className="w-5 h-5 text-emerald-500 shrink-0" />
                <div className="text-xs">
                  <span className="block text-slate-500 uppercase font-bold">Qualifications</span>
                  <span className="font-extrabold text-slate-800">{lang === "en" ? doc.qualification_en : doc.qualification_hi}</span>
                </div>
              </div>
            </div>

            {/* Micro target Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a 
                href={`https://wa.me/919565750707?text=${encodeURIComponent(`Hello Aarav Hospital, I would like to book a medical appointment with ${doc.name}. Please confirm the OPD slot.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-14 bg-[#25D366] hover:bg-[#16A34A] text-white flex items-center justify-center gap-2 font-extrabold rounded-xl shadow transition-transform active:scale-95 duration-200"
                data-testid={`dr-details-whatsapp-${doc.id}`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t.bookWhatsApp}</span>
              </a>
              <a 
                href="tel:9565750707"
                className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 font-extrabold rounded-xl shadow transition-transform active:scale-95 duration-200"
                data-testid={`dr-details-call-${doc.id}`}
              >
                <Phone className="w-5 h-5 animate-bounce" />
                <span>{t.callNow} (9565750707)</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};


// --- Individual Department Details Page ---
const DepartmentDetailsPage = ({ lang }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];

  const dept = useMemo(() => {
    return DEPARTMENTS.find(d => d.id === id) || DEPARTMENTS[0];
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const relatedDoctors = useMemo(() => {
    if (dept.id === "critical-care" || dept.id === "pain-medicine") {
      return DOCTORS.filter(d => d.specialtyKey === "critical_pain_medicine");
    }
    if (dept.id === "maternity-care" || dept.id === "infertility-treatment") {
      return DOCTORS.filter(d => d.specialtyKey === "maternity_infertility");
    }
    if (dept.id === "general-surgery") {
      return DOCTORS.filter(d => d.specialtyKey === "general_surgery");
    }
    if (dept.id === "general-medicine") {
      return DOCTORS.filter(d => d.specialtyKey === "critical_pain_medicine" || d.specialtyKey === "medicine");
    }
    return DOCTORS.filter(d => d.specialtyKey === dept.id);
  }, [dept.id]);

  useEffect(() => {
    const title = lang === "en" ? `${dept.name_en} Department` : `${dept.name_hi} विभाग`;
    const desc = lang === "en" ? dept.desc_en : dept.desc_hi;
    injectSEOAndSchema("department", title, desc, `/departments/${dept.id}`);
  }, [dept, lang]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-8 pb-24 sm:pb-12" data-testid="department-details-container">
      {/* Back button */}
      <button 
        onClick={() => navigate("/")} 
        className="inline-flex items-center gap-2 text-[#064E3B] font-bold text-sm hover:underline"
        data-testid="department-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToHome}</span>
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading">
            {lang === "en" ? dept.name_en : dept.name_hi}
          </h1>
          <div className="w-16 h-1 bg-[#064E3B] rounded"></div>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            {lang === "en" ? dept.desc_en : dept.desc_hi}
          </p>
        </div>

        {/* Detailed Department Medical description */}
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-extrabold text-[#022C22]">
            {lang === "en" ? "Standard Care Guidelines" : "उपचार और परामर्श दिशानिर्देश"}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed text-left">
            {lang === "en" 
              ? "At Aarav Hospital Gorakhpur, we prioritize sterile parameters, continuous patient monitoring, and optimal medicine deployment. Our doctors analyze your diagnosis, present clinical avenues transparently, and follow international treatment guidelines."
              : "आरव अस्पताल गोरखपुर में, हम स्वच्छता मापदंडों, निरंतर रोगी निगरानी और सटीक दवा वितरण को प्राथमिकता देते हैं। हमारे डॉक्टर आपके नैदानिक परीक्षणों का विश्लेषण करते हैं, चिकित्सा विकल्पों को पारदर्शी रूप से प्रस्तुत करते हैं, और उपचार प्रोटोकॉल का पालन करते हैं।"}
          </p>
        </div>

        {/* Related Doctors List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#022C22] font-heading">
            {lang === "en" ? "Consulting Specialists" : "परामर्शदाता विशेषज्ञ डॉक्टर"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedDoctors.map(doc => (
              <div 
                key={doc.id} 
                className="border border-slate-200 p-4 rounded-xl flex gap-4 items-center bg-white"
                data-testid={`related-doctor-${doc.id}`}
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" decoding="async" loading="lazy" />
                </div>
                <div className="text-left space-y-1">
                  <h4 className="font-extrabold text-sm text-slate-900">{doc.name}</h4>
                  <p className="text-xs text-emerald-700 font-bold leading-tight">{lang === "en" ? doc.title_en : doc.title_hi}</p>
                  <Link to={`/doctors/${doc.id}`} className="text-[11px] font-bold text-[#064E3B] hover:underline block pt-0.5">
                    {lang === "en" ? "View Full Profile →" : "पूरा विवरण देखें →"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button Set */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
          <a
            href={`https://wa.me/919565750707?text=${encodeURIComponent(`Hello, I want to book an appointment for the ${lang === "en" ? dept.name_en : dept.name_hi} department at Aarav Hospital.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-14 bg-[#25D366] hover:bg-[#16A34A] text-white flex items-center justify-center gap-2 font-extrabold rounded-xl shadow transition-all duration-200"
            data-testid={`dept-whatsapp-${dept.id}`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t.bookWhatsApp}</span>
          </a>
          <a
            href="tel:9565750707"
            className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 font-extrabold rounded-xl shadow transition-all duration-200"
            data-testid={`dept-call-${dept.id}`}
          >
            <Phone className="w-5 h-5 animate-bounce" />
            <span>{t.callNow} (9565750707)</span>
          </a>
        </div>

      </div>
    </div>
  );
};


// --- Local SEO Landing Pages Container ---
const LocalSEOLandingPage = ({ lang }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seoData = useMemo(() => {
    switch (slug) {
      case "best-maternity-hospital-in-gorakhpur":
        return {
          title_en: "Best Maternity Hospital in Gorakhpur | Safe Deliveries",
          title_hi: "गोरखपुर का सर्वश्रेष्ठ प्रसूति (मैटरनिटी) अस्पताल | सुरक्षित प्रसव",
          header_en: "Gorakhpur's Leading Maternity and Safe Delivery Care",
          header_hi: "सुरक्षित प्रसव और मातृत्व देखभाल का सर्वोत्तम चिकित्सा केंद्र",
          doctor_id: "dr-vinita-goel",
          highlights_en: [
            "Over 1,000 successful normal and cesarean deliveries.",
            "Sterile labor suites and fully equipped newborn NICU setup.",
            "Painless delivery options and 24/7 obstetrician support.",
            "Prenatal guidance and customized post-pregnancy care packages."
          ],
          highlights_hi: [
            "1,000 से अधिक सफल और सुरक्षित सामान्य तथा सिजेरियन प्रसव।",
            "संक्रमण मुक्त लेबर सुइट्स और अत्यधिक सुसज्जित नवजात शिशु एनआईसीयू सेटअप।",
            "दर्द रहित प्रसव के विकल्प और चौबीसों घंटे प्रसूति रोग विशेषज्ञ की उपलब्धता।",
            "गर्भावस्था से पहले और बाद की संपूर्ण देखभाल योजनाएं।"
          ]
        };
      case "best-orthopaedic-doctor-in-gorakhpur":
        return {
          title_en: "Best Orthopaedic Doctor in Gorakhpur | Joint Replacement",
          title_hi: "गोरखपुर का सबसे अच्छा हड्डी रोग विशेषज्ञ | जोड़ प्रतिस्थापन",
          header_en: "Gorakhpur's Advanced Orthopaedic and Fracture Alignment Support",
          header_hi: "उन्नत आर्थोपेडिक्स फ्रैक्चर उपचार और जोड़ रोग विशेषज्ञ",
          doctor_id: "dr-shrey-singh",
          highlights_en: [
            "Expert trauma bone-fracture surgeries operated by Dr. Shrey Singh.",
            "Advanced arthroscopy and joint pain rehabilitation techniques.",
            "Success in knee replacements, hip revisions, and joint pain therapies.",
            "Modern sterile casts, braces, and fast bone recovery treatments."
          ],
          highlights_hi: [
            "डॉ. श्रेय सिंह द्वारा संचालित आपातकालीन फ्रैक्चर और आघात सर्जरी।",
            "जोड़ों के दर्द से मुक्ति के लिए उन्नत आर्थोस्कोपी तकनीक।",
            "घुटने और कूल्हे के प्रत्यारोपण में उच्च सफलता दर।",
            "आधुनिक जीवाणुरहित कास्ट, ब्रेसिज़ और त्वरित हड्डी जुड़ाव उपचार।"
          ]
        };
      case "best-neurosurgeon-in-gorakhpur":
        return {
          title_en: "Best Neurosurgeon in Gorakhpur | Brain & Spine Surgery",
          title_hi: "गोरखपुर के सर्वश्रेष्ठ न्यूरोसर्जन | मस्तिष्क एवं रीढ़ की हड्डी के ऑपरेशन",
          header_en: "Critical Brain & Spine Operations Under Advanced ICU Backup",
          header_hi: "मस्तिष्क, रीढ़ और तंत्रिका रोगों के लिए विश्वसनीय न्यूरोसर्जन टीम",
          doctor_id: "dr-manas-prakash",
          highlights_en: [
            "Expert neurosurgeons Dr. Manas Prakash & Dr. P.K. Verma (MCH).",
            "Advanced micro-neurosurgical equipment and vertebral trauma alignment.",
            "State-of-the-art ICU backup on premises.",
            "Hemorrhage intervention, stroke recovery, and complex head injury care."
          ],
          highlights_hi: [
            "अनुभवी एमसीएच न्यूरोसर्जन डॉ. मानस प्रकाश और डॉ. पी.के. वर्मा।",
            "उन्नत सूक्ष्म-न्यूरोसर्जिकल उपकरण और रीढ़ की हड्डी की सूक्ष्म सर्जरी।",
            "त्वरित उपचार के लिए अस्पताल परिसर में ही उन्नत आईसीयू बैकअप सुविधा।",
            "ब्रेन हैमरेज, पक्षाघात (स्ट्रोक) और गंभीर सिर की चोट का तत्काल इलाज।"
          ]
        };
      case "best-pediatrician-in-gorakhpur":
        return {
          title_en: "Best Pediatrician in Gorakhpur | Newborn Incubator care",
          title_hi: "गोरखपुर के सबसे अच्छे बाल रोग विशेषज्ञ | एनआईसीयू (NICU) सुविधा",
          header_en: "Dedicated Newborn NICU & Pediatric Emergency Care",
          header_hi: "शिशुओं और बच्चों के लिए समर्पित एनआईसीयू (NICU) एवं आपातकालीन वार्ड",
          doctor_id: "dr-shivendra",
          highlights_en: [
            "Expert child physician Dr. Shivendra (MD Pediatrics).",
            "Continuous incubator setups, neonatal phototherapy, and warmers.",
            "Newborn immunizations, child growth milestones, and pediatric asthma care.",
            "24/7 pediatric critical care nursing assistance."
          ],
          highlights_hi: [
            "अनुभवी बाल रोग विशेषज्ञ डॉ. शिवेंद्र (एमडी पीडियाट्रिक्स)।",
            "कमजोर नवजात शिशुओं के लिए इनक्यूबेटर, वार्मर और फोटोथेरेपी मशीनें।",
            "बच्चों के सभी निवारक टीके और विकास के मील के पत्थर की निगरानी।",
            "24 घंटे सक्रिय रहने वाली बच्चों की क्रिटिकल केयर नर्सिंग टीम।"
          ]
        };
      case "best-infertility-specialist-in-gorakhpur":
        return {
          title_en: "Best Infertility Specialist in Gorakhpur | IVF & IUI Care",
          title_hi: "गोरखपुर की सर्वश्रेष्ठ बांझपन रोग विशेषज्ञ | आईयूआई (IUI) उपचार",
          header_en: "Advanced Infertility Counseling and Follicular Support",
          header_hi: "बांझपन उपचार और परिवार नियोजन के लिए सर्वोत्तम चिकित्सा सहायता",
          doctor_id: "dr-vinita-goel",
          highlights_en: [
            "Advanced diagnostic testing for ovulation and male/female fertility.",
            "Expert follicular monitoring, hormone regulation, and custom IUI cycles.",
            "Compassionate IVF counseling under the veteran Dr. Vinita Goel.",
            "High pregnancy rates with fully scientific and ethical procedures."
          ],
          highlights_hi: [
            "स्त्री और पुरुष प्रजनन क्षमता की विस्तृत नैदानिक जांच परीक्षण।",
            "सटीक ओव्यूलेशन ट्रैकिंग और कस्टम आईयूआई (IUI) उपचार प्रक्रियाएं।",
            "अनुभवी डॉ. विनीता गोयल के मार्गदर्शन में बांझपन पर सफल परामर्श।",
            "पूर्ण वैज्ञानिक दृष्टिकोण और नैतिक नियमों के साथ गर्भावस्था की उच्च दर।"
          ]
        };
      default:
        return {
          title_en: "Best Hospital in Gorakhpur | Aarav Hospital",
          title_hi: "गोरखपुर का सर्वश्रेष्ठ अस्पताल | आरव अस्पताल",
          header_en: "Gorakhpur's Leading Medical and Surgical Multi-specialty Clinic",
          header_hi: "गोरखपुर का अग्रणी मेडिकल और सर्जिकल मल्टी-स्पेशलिटी अस्पताल",
          doctor_id: "dr-rupesh-goel",
          highlights_en: [
            "Multi-disciplinary specialty clinics representing 8 experienced doctors.",
            "24/7 critical ventilator ICU and neonatal ICU support.",
            "Bilingual interface (English & Hindi) for easy navigation.",
            "Affordable pricing parameters suited perfectly for local residents."
          ],
          highlights_hi: [
            "8 अनुभवी डॉक्टरों के मार्गदर्शन में संचालित मल्टी-स्पेशलिटी क्लिनिक।",
            "24/7 वेंटिलेटर लाइफ-सपोर्ट आईसीयू और नवजात शिशु एनआईसीयू।",
            "हिंदी और अंग्रेजी में उपलब्ध सरल और स्पष्ट लेआउट।",
            "स्थानीय निवासियों के लिए उपयुक्त रूप से अनुकूलित अत्यंत वहनीय चिकित्सा दरें।"
          ]
        };
    }
  }, [slug, lang]);

  const targetDoc = useMemo(() => {
    return DOCTORS.find(d => d.id === seoData.doctor_id) || DOCTORS[0];
  }, [seoData]);

  useEffect(() => {
    const pageTitle = lang === "en" ? seoData.title_en : seoData.title_hi;
    const pageDesc = lang === "en" ? `${seoData.header_en}. ${t.seoTagline}` : `${seoData.header_hi}. ${t.seoTagline}`;
    injectSEOAndSchema("seo_landing", pageTitle, pageDesc, `/best/${slug}`);
  }, [seoData, lang, slug, t]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left space-y-8 pb-24 sm:pb-12" data-testid="seo-landing-container">
      {/* Back button */}
      <button 
        onClick={() => navigate("/")} 
        className="inline-flex items-center gap-2 text-[#064E3B] font-bold text-sm hover:underline"
        data-testid="seo-back-btn"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToHome}</span>
      </button>

      {/* SEO Headline Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        <span className="bg-[#064E3B]/10 text-[#064E3B] px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm">
          {lang === "en" ? "Gorakhpur Local Medical Information" : "गोरखपुर स्थानीय स्वास्थ्य सूचना"}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#022C22] font-heading leading-tight">
          {lang === "en" ? seoData.header_en : seoData.header_hi}
        </h1>
        <div className="w-16 h-1 bg-[#064E3B] rounded"></div>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          {t.seoTagline}
        </p>

        {/* bullet Highlights */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-lg font-extrabold text-[#022C22]">
            {lang === "en" ? "Key Treatment Highlights" : "मुख्य चिकित्सा विशिष्टताएं"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(lang === "en" ? seoData.highlights_en : seoData.highlights_hi).map((hl, index) => (
              <div key={index} className="flex gap-2.5 items-start">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 font-bold" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Specialty doctor showcase card */}
        <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-white shadow">
            <img src={targetDoc.image} alt={targetDoc.name} className="w-full h-full object-cover" decoding="async" loading="lazy" />
          </div>
          <div className="text-left space-y-2 flex-1">
            <h4 className="text-lg font-extrabold text-[#022C22]">{lang === "en" ? "Chief Consulting Doctor:" : "मुख्य परामर्शदाता चिकित्सक:"} {targetDoc.name}</h4>
            <p className="text-sm text-emerald-800 font-bold leading-tight">{lang === "en" ? targetDoc.title_en : targetDoc.title_hi}</p>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              {lang === "en" ? targetDoc.bio_en : targetDoc.bio_hi}
            </p>
            <Link to={`/doctors/${targetDoc.id}`} className="inline-block text-xs font-bold text-[#064E3B] hover:underline pt-1">
              {lang === "en" ? "View Doctor Clinical Schedule →" : "डॉक्टर की ओपीडी जानकारी देखें →"}
            </Link>
          </div>
        </div>

        {/* Action Button Set */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-100">
          <a
            href={`https://wa.me/919565750707?text=${encodeURIComponent(`Hello, I want to book an appointment for ${lang === "en" ? seoData.header_en : seoData.header_hi} under Aarav Hospital.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-14 bg-[#25D366] hover:bg-[#16A34A] text-white flex items-center justify-center gap-2 font-extrabold rounded-xl shadow transition-all duration-200"
            data-testid="seo-whatsapp-btn"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t.bookWhatsApp}</span>
          </a>
          <a
            href="tel:9565750707"
            className="flex-1 h-14 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2 font-extrabold rounded-xl shadow transition-all duration-200"
            data-testid="seo-call-btn"
          >
            <Phone className="w-5 h-5 animate-bounce" />
            <span>{t.callNow} (9565750707)</span>
          </a>
        </div>

      </div>
    </div>
  );
};


// --- Main Application Entry Router ---
function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("aarav_lang") || "en";
    } catch {
      return "en";
    }
  });

  const changeLang = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem("aarav_lang", newLang);
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased flex flex-col justify-between selection:bg-[#064E3B]/20 selection:text-[#064E3B]" data-testid="hospital-app-root">
      <BrowserRouter basename={process.env.PUBLIC_URL || "/"}>
        {/* Header (Sticky / Global) */}
        <Header lang={lang} setLang={changeLang} />

        {/* Main Content Router block */}
        <main className="flex-grow py-8">
          <Routes>
            <Route path="/" element={<HomePage lang={lang} />} />
            <Route path="/doctors/:id" element={<DoctorDetailsPage lang={lang} />} />
            <Route path="/departments/:id" element={<DepartmentDetailsPage lang={lang} />} />
            <Route path="/best-maternity-hospital-in-gorakhpur" element={<LocalSEOLandingPage lang={lang} />} />
            <Route path="/best-orthopaedic-doctor-in-gorakhpur" element={<LocalSEOLandingPage lang={lang} />} />
            <Route path="/best-neurosurgeon-in-gorakhpur" element={<LocalSEOLandingPage lang={lang} />} />
            <Route path="/best-pediatrician-in-gorakhpur" element={<LocalSEOLandingPage lang={lang} />} />
            <Route path="/best-infertility-specialist-in-gorakhpur" element={<LocalSEOLandingPage lang={lang} />} />
            <Route path="/best/:slug" element={<LocalSEOLandingPage lang={lang} />} />
          </Routes>
        </main>

        {/* Footer (Global) */}
        <Footer lang={lang} />

        {/* Floating Action Buttons (Global in bottom right) */}
        <FloatingActionButtons lang={lang} />
      </BrowserRouter>
    </div>
  );
}

export default App;
