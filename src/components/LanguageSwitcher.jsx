
import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" }, // Hindi
  { code: "pa", name: "ਪੰਜਾਬੀ" }, // Punjabi
  { code: "gu", name: "ગુજરાતી" }, // Gujarati
  { code: "mr", name: "मराठी" }, // Marathi
  { code: "bn", name: "বাংলা" }, // Bengali
  { code: "ta", name: "தமிழ்" }, // Tamil
  { code: "te", name: "తెలుగు" }, // Telugu
  { code: "kn", name: "ಕನ್ನಡ" }, // Kannada
  { code: "ml", name: "മലയാളം" }, // Malayalam
];

// Extended translation system with About page translations
const translations = {
  en: {
    home: "Home",
    about: "About",
    contact: "Contact",
    login: "Login",
    register: "Register",
    findVets: "Find Vets",
    dashboard: "Dashboard",
    articles: "Articles",
    welcomeMessage: "Welcome to PashuSwasth-Doot",
    resources: "Resources",
    services: "Services",
    logout: "Logout",
    // About page translations
    aboutHeading: "About PashuSwasth-Doot",
    aboutMission: "Our mission is to improve bovine healthcare by connecting farmers with veterinary resources, knowledge, and professionals.",
    ourStory: "Our Story",
    storyPart1: "PashuSwasth-Doot was founded in 2025.",
    storyPart2: "After witnessing preventable losses of cattle due to delayed treatment and lack of information, we decided to create a platform that bridges the gap between farmers and veterinary professionals.",
    storyPart3: "",
    ourValues: "Our Values",
    valuesPrinciples: "The principles that guide our work and shape our platform",
    farmerCentric: "Farmer-Centric",
    farmerCentricDesc: "We place farmers at the heart of everything we do, ensuring our solutions address their real challenges.",
    excellence: "Excellence",
    excellenceDesc: "We are committed to providing the highest quality information and connecting farmers with qualified professionals.",
    prevention: "Prevention",
    preventionDesc: "We emphasize preventive care to reduce disease outbreaks and improve overall cattle health and productivity.",
    accessibility: "Accessibility",
    accessibilityDesc: "We strive to make veterinary care accessible to all farmers, regardless of their location or resources.",
    ourTeam: "Our Team",
    teamDesc: "Meet the dedicated professionals behind PashuSwasth-Doot",
    joinMission: "Join us in our mission",
    joinDesc: "Be part of our growing community working to improve bovine healthcare and the livelihoods of farmers.",
    signUpNow: "Sign Up Now",
    contactUs: "Contact Us",
    symptoms: "Symptoms",
    homeRemedies: "Home Remedies",
    videoTutorials: "Video Tutorials"
  },
  hi: {
    home: "होम",
    about: "हमारे बारे में",
    contact: "संपर्क",
    login: "लॉगिन",
    register: "रजिस्टर",
    findVets: "पशु चिकित्सक खोजें",
    dashboard: "डैशबोर्ड",
    articles: "लेख",
    welcomeMessage: "पशुस्वास्थ-दूत में आपका स्वागत है",
    resources: "संसाधन",
    services: "सेवाएँ",
    logout: "लॉगआउट",
    // About page translations
    aboutHeading: "पशुस्वास्थ-दूत के बारे में",
    aboutMission: "हमारा मिशन किसानों को पशु चिकित्सा संसाधनों, ज्ञान और पेशेवरों से जोड़कर पशुधन स्वास्थ्य को बेहतर बनाना है।",
    ourStory: "हमारी कहानी",
    storyPart1: "पशुस्वास्थ-दूत की स्थापना 2023 में पशु चिकित्सकों, कृषि विशेषज्ञों और तकनीकी पेशेवरों की एक टीम द्वारा की गई थी, जिन्होंने समय पर पशु चिकित्सा देखभाल प्राप्त करने में पशुपालकों द्वारा सामना की जाने वाली चुनौतियों को पहचाना था।",
    storyPart2: "देरी से उपचार और जानकारी की कमी के कारण पशुधन की रोके जा सकने वाली हानि को देखने के बाद, हमने किसानों और पशु चिकित्सा पेशेवरों के बीच की खाई को पाटने के लिए एक मंच बनाने का फैसला किया।",
    storyPart3: "आज, पशुस्वास्थ-दूत देश भर में हजारों किसानों की सेवा कर रहा है, उन्हें अपने पशुधन को स्वस्थ और उत्पादक रखने के लिए आवश्यक संसाधन प्रदान कर रहा है।",
    ourValues: "हमारे मूल्य",
    valuesPrinciples: "वे सिद्धांत जो हमारे काम का मार्गदर्शन करते हैं और हमारे मंच को आकार देते हैं",
    farmerCentric: "किसान-केंद्रित",
    farmerCentricDesc: "हम किसानों को हर चीज के केंद्र में रखते हैं, यह सुनिश्चित करते हुए कि हमारे समाधान उनकी वास्तविक चुनौतियों का समाधान करें।",
    excellence: "उत्कृष्टता",
    excellenceDesc: "हम उच्चतम गुणवत्ता वाली जानकारी प्रदान करने और किसानों को योग्य पेशेवरों से जोड़ने के लिए प्रतिबद्ध हैं।",
    prevention: "रोकथाम",
    preventionDesc: "हम रोग प्रकोपों को कम करने और समग्र पशु स्वास्थ्य और उत्पादकता में सुधार के लिए निवारक देखभाल पर जोर देते हैं।",
    accessibility: "पहुंच",
    accessibilityDesc: "हम सभी किसानों के लिए, उनके स्थान या संसाधनों की परवाह किए बिना, पशु चिकित्सा देखभाल को सुलभ बनाने का प्रयास करते हैं।",
    ourTeam: "हमारी टीम",
    teamDesc: "पशुस्वास्थ-दूत के पीछे समर्पित पेशेवरों से मिलें",
    joinMission: "हमारे मिशन में शामिल हों",
    joinDesc: "पशुधन स्वास्थ्य और किसानों की आजीविका में सुधार के लिए काम करने वाले हमारे बढ़ते समुदाय का हिस्सा बनें।",
    signUpNow: "अभी साइन अप करें",
    contactUs: "संपर्क करें",
    symptoms: "लक्षण",
    homeRemedies: "घरेलू उपचार",
    videoTutorials: "वीडियो ट्यूटोरियल"
  },
  pa: {
    home: "ਘਰ",
    about: "ਸਾਡੇ ਬਾਰੇ",
    contact: "ਸੰਪਰਕ",
    login: "ਲਾਗਿਨ",
    register: "ਰਜਿਸਟਰ",
    findVets: "ਪਸ਼ੂ ਡਾਕਟਰ ਲੱਭੋ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    articles: "ਲੇਖ",
    welcomeMessage: "ਪਸ਼ੂਸਵਾਸਥ-ਦੂਤ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    resources: "ਸਰੋਤ",
    services: "ਸੇਵਾਵਾਂ",
    logout: "ਲੌਗ ਆਉਟ",
    // About page translations for Punjabi
    aboutHeading: "ਪਸ਼ੂਸਵਾਸਥ-ਦੂਤ ਬਾਰੇ",
    aboutMission: "ਸਾਡਾ ਮਿਸ਼ਨ ਕਿਸਾਨਾਂ ਨੂੰ ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਸਰੋਤਾਂ, ਗਿਆਨ, ਅਤੇ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਜੋੜ ਕੇ ਪਸ਼ੂਧਨ ਸਿਹਤ ਨੂੰ ਬਿਹਤਰ ਬਣਾਉਣਾ ਹੈ।",
    ourStory: "ਸਾਡੀ ਕਹਾਣੀ",
    storyPart1: "ਪਸ਼ੂਸਵਾਸਥ-ਦੂਤ ਦੀ ਸਥਾਪਨਾ 2023 ਵਿੱਚ ਪਸ਼ੂ ਚਿਕਿਤਸਕਾਂ, ਖੇਤੀਬਾੜੀ ਮਾਹਿਰਾਂ, ਅਤੇ ਤਕਨੀਕੀ ਪੇਸ਼ੇਵਰਾਂ ਦੀ ਇੱਕ ਟੀਮ ਦੁਆਰਾ ਕੀਤੀ ਗਈ ਸੀ।",
    storyPart2: "ਦੇਰੀ ਨਾਲ ਇਲਾਜ ਅਤੇ ਜਾਣਕਾਰੀ ਦੀ ਘਾਟ ਕਾਰਨ ਪਸ਼ੂਧਨ ਦੇ ਬਚਾਏ ਜਾ ਸਕਣ ਵਾਲੇ ਨੁਕਸਾਨ ਨੂੰ ਦੇਖਣ ਤੋਂ ਬਾਅਦ, ਅਸੀਂ ਕਿਸਾਨਾਂ ਅਤੇ ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਪੇਸ਼ੇਵਰਾਂ ਵਿਚਕਾਰ ਪਾੜੇ ਨੂੰ ਪਾਟਣ ਲਈ ਇੱਕ ਪਲੇਟਫਾਰਮ ਬਣਾਉਣ ਦਾ ਫੈਸਲਾ ਕੀਤਾ।",
    storyPart3: "ਅੱਜ, ਪਸ਼ੂਸਵਾਸਥ-ਦੂਤ ਦੇਸ਼ ਭਰ ਦੇ ਹਜ਼ਾਰਾਂ ਕਿਸਾਨਾਂ ਦੀ ਸੇਵਾ ਕਰ ਰਿਹਾ ਹੈ, ਉਨ੍ਹਾਂ ਨੂੰ ਆਪਣੇ ਪਸ਼ੂਧਨ ਨੂੰ ਸਿਹਤਮੰਦ ਅਤੇ ਉਤਪਾਦਕ ਰੱਖਣ ਲਈ ਲੋੜੀਂਦੇ ਸਰੋਤ ਪ੍ਰਦਾਨ ਕਰ ਰਿਹਾ ਹੈ।",
    ourValues: "ਸਾਡੇ ਮੁੱਲ",
    valuesPrinciples: "ਉਹ ਸਿਧਾਂਤ ਜੋ ਸਾਡੇ ਕੰਮ ਦੀ ਅਗਵਾਈ ਕਰਦੇ ਹਨ ਅਤੇ ਸਾਡੇ ਪਲੇਟਫਾਰਮ ਨੂੰ ਆਕਾਰ ਦਿੰਦੇ ਹਨ",
    farmerCentric: "ਕਿਸਾਨ-ਕੇਂਦਰਿਤ",
    farmerCentricDesc: "ਅਸੀਂ ਕਿਸਾਨਾਂ ਨੂੰ ਹਰ ਚੀਜ਼ ਦੇ ਕੇਂਦਰ ਵਿੱਚ ਰੱਖਦੇ ਹਾਂ, ਇਹ ਯਕੀਨੀ ਬਣਾਉਂਦੇ ਹੋਏ ਕਿ ਸਾਡੇ ਹੱਲ ਉਨ੍ਹਾਂ ਦੀਆਂ ਅਸਲ ਚੁਣੌਤੀਆਂ ਨੂੰ ਹੱਲ ਕਰਦੇ ਹਨ।",
    excellence: "ਉੱਤਮਤਾ",
    excellenceDesc: "ਅਸੀਂ ਉੱਚ ਗੁਣਵੱਤਾ ਵਾਲੀ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਨ ਅਤੇ ਕਿਸਾਨਾਂ ਨੂੰ ਯੋਗ ਪੇਸ਼ੇਵਰਾਂ ਨਾਲ ਜੋੜਨ ਲਈ ਵਚਨਬੱਧ ਹਾਂ।",
    prevention: "ਰੋਕਥਾਮ",
    preventionDesc: "ਅਸੀਂ ਬਿਮਾਰੀਆਂ ਦੇ ਫੈਲਣ ਨੂੰ ਘਟਾਉਣ ਅਤੇ ਸਮੁੱਚੇ ਪਸ਼ੂਧਨ ਸਿਹਤ ਅਤੇ ਉਤਪਾਦਕਤਾ ਵਿੱਚ ਸੁਧਾਰ ਲਈ ਨਿਵਾਰਕ ਦੇਖਭਾਲ 'ਤੇ ਜ਼ੋਰ ਦਿੰਦੇ ਹਾਂ।",
    accessibility: "ਪਹੁੰਚਯੋਗਤਾ",
    accessibilityDesc: "ਅਸੀਂ ਸਾਰੇ ਕਿਸਾਨਾਂ ਲਈ, ਉਨ੍ਹਾਂ ਦੇ ਸਥਾਨ ਜਾਂ ਸਰੋਤਾਂ ਦੀ ਪਰਵਾਹ ਕੀਤੇ ਬਿਨਾਂ, ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਦੇਖਭਾਲ ਨੂੰ ਪਹੁੰਚਯੋਗ ਬਣਾਉਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰਦੇ ਹਾਂ।",
    ourTeam: "ਸਾਡੀ ਟੀਮ",
    teamDesc: "ਪਸ਼ੂਸਵਾਸਥ-ਦੂਤ ਦੇ ਪਿੱਛੇ ਸਮਰਪਿਤ ਪੇਸ਼ੇਵਰਾਂ ਨੂੰ ਮਿਲੋ",
    joinMission: "ਸਾਡੇ ਮਿਸ਼ਨ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    joinDesc: "ਪਸ਼ੂਧਨ ਸਿਹਤ ਅਤੇ ਕਿਸਾਨਾਂ ਦੀ ਰੋਜ਼ੀ-ਰੋਟੀ ਵਿੱਚ ਸੁਧਾਰ ਕਰਨ ਲਈ ਕੰਮ ਕਰਨ ਵਾਲੇ ਸਾਡੇ ਵਧ ਰਹੇ ਭਾਈਚਾਰੇ ਦਾ ਹਿੱਸਾ ਬਣੋ।",
    signUpNow: "ਹੁਣੇ ਸਾਈਨ ਅਪ ਕਰੋ",
    contactUs: "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    symptoms: "ਲੱਛਣ",
    homeRemedies: "ਘਰੇਲੂ ਇਲਾਜ",
    videoTutorials: "ਵੀਡੀਓ ਟਿਊਟੋਰੀਅਲ"
  }
};

// Context setup would be better for a real app, this is a simplified example
export const useTranslation = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  
  const t = (key) => {
    if (translations[language] && translations[language][key]) {
      return translations[language][key];
    }
    
    // Fallback to English if translation not found
    return translations.en[key] || key;
  };
  
  return { t, language, setLanguage };
};

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("language") || "en");
  
  const handleLanguageChange = (code) => {
    setCurrentLanguage(code);
    localStorage.setItem("language", code);
    
    // This would trigger a re-render in a context-based implementation
    // For now, we'll just reload the page
    window.location.reload();
  };
  
  // Find the current language object
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={currentLanguage === lang.code ? "bg-accent text-accent-foreground" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
