
import { Award, Shield, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "../components/LanguageSwitcher";

const AboutPage = () => {
  const { t } = useTranslation();
  
  const teamMembers = [
    {
      name: "Gauri Wagh",
      role: "Full stack developer",
      image: "https://t4.ftcdn.net/jpg/06/43/68/65/240_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.jpg",
      bio: "Entusiastic about new tech and loves exploring..!"
    },
    {
      name: "Mokshada Sheth",
      role: "Full stack developer",
      image: "https://t4.ftcdn.net/jpg/06/43/68/65/240_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.jpg",
      bio: "Entusiastic about new tech and loves exploring..!"
    },
    {
      name: "Sayali Pawar",
      role: "Full stack developer",
      image: "https://t4.ftcdn.net/jpg/06/43/68/65/240_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.jpg",
      bio: "Entusiastic about new tech and loves exploring..!"
    },
    {
      name: "Sanskruti Patil",
      role: "Full stack developer",
      image: "https://t4.ftcdn.net/jpg/06/43/68/65/240_F_643686558_Efl6HB1ITw98bx1PdAd1wy56QpUTMh47.jpg",
      bio: "Entusiastic about new tech and loves exploring..!"
    }
  ];

  const values = [
    {
      icon: <Users className="h-12 w-12 text-forest-500" />,
      title: t("farmerCentric"),
      description: t("farmerCentricDesc")
    },
    {
      icon: <Award className="h-12 w-12 text-forest-500" />,
      title: t("excellence"),
      description: t("excellenceDesc")
    },
    {
      icon: <Shield className="h-12 w-12 text-forest-500" />,
      title: t("prevention"),
      description: t("preventionDesc")
    },
    {
      icon: <Globe className="h-12 w-12 text-forest-500" />,
      title: t("accessibility"),
      description: t("accessibilityDesc")
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-earth-900 font-serif">{t("aboutHeading")}</h1>
            <p className="mt-4 text-xl text-earth-700 max-w-3xl mx-auto">
              {t("aboutMission")}
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:space-x-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2 className="text-3xl font-bold text-earth-900 font-serif">{t("ourStory")}</h2>
              <p className="mt-4 text-lg text-earth-700">
                {t("storyPart1")}
              </p>
              <p className="mt-4 text-lg text-earth-700">
                {t("storyPart2")}
              </p>
              {/* <p className="mt-4 text-lg text-earth-700">
                {t("storyPart3")}
              </p> */}
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=400" 
                alt="Healthy cattle" 
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values Section */}
      <section className="py-16 bg-earth-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-earth-900 font-serif">{t("ourValues")}</h2>
            <p className="mt-4 text-xl text-earth-600 max-w-3xl mx-auto">
              {t("valuesPrinciples")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center shadow-md border border-gray-100">
                <div className="mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-earth-800 mb-3">{value.title}</h3>
                <p className="text-earth-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Our Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-earth-900 font-serif">{t("ourTeam")}</h2>
            <p className="mt-4 text-xl text-earth-600 max-w-3xl mx-auto">
              {t("teamDesc")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-earth-50 rounded-lg p-8 text-center shadow-md border border-earth-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-earth-800">{member.name}</h3>
                <p className="text-forest-600 mb-4">{member.role}</p>
                <p className="text-earth-700">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-forest-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-serif mb-6">{t("joinMission")}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t("joinDesc")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-white text-forest-600 hover:bg-gray-100 px-8 py-3 rounded-md shadow-md"
              onClick={() => window.location.href = "/register"}
            >
              {t("signUpNow")}
            </Button>
            {/* <Button 
              variant="outline" 
              className="border-white text-black hover:bg-forest-700 px-8 py-3 rounded-md"
              onClick={() => window.location.href = "/contact"}
            >
              {t("contactUs")}
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
