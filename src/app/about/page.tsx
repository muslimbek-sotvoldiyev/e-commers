import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/components/team-member";
import { Map } from "@/components/map";
import { ShoppingBag, Shield, Zap } from "lucide-react";

export const metadata = {
  title: "Biz haqimizda | E-commerce Do'koni",
  description:
    "E-commerce do'konimiz haqida batafsil ma'lumot, tarix va qadriyatlarimiz.",
};

function AboutUs() {
  const VALUES_DATA = [
    {
      icon: ShoppingBag,
      title: "Sifat",
      description: "Biz faqat eng yuqori sifatli mahsulotlarni taklif etamiz",
    },
    {
      icon: Shield,
      title: "Ishonch",
      description:
        "Mijozlarimiz bilan ochiq va halol munosabatlarni qadrlaymiz",
    },
    {
      icon: Zap,
      title: "Innovatsiya",
      description: "Doimiy ravishda yangilanib va takomillashib boramiz",
    },
  ];

  const TEAM_MEMBERS = [
    { name: "Aziz Rahimov", position: "CEO", image: "/user.png" },
    { name: "Malika Karimova", position: "CTO", image: "/user.png" },
    {
      name: "Jasur Umarov",
      position: "Marketing Director",
      image: "/user.png",
    },
    {
      name: "Nilufar Saidova",
      position: "Customer Support Lead",
      image: "/user.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16 relative overflow-hidden h-screen flex flex-col justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/e-commerce.png')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white px-6">
          <h1 className="text-5xl font-bold mb-4">Biz haqimizda</h1>
          <p className="text-xl text-gray-300 mb-8">
            Sizning ishonchli onlayn xarid hamkoringiz
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Bizning qadriyatlarimiz</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {VALUES_DATA.map((value, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Bizning jamoamiz</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>

      <section id="contact" className="mb-16 scroll-mt-16">
        <h2 className="text-3xl font-semibold mb-6">Biz bilan bog'laning</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-xl text-gray-600 mb-4">
              Savollaringiz bormi? Biz sizga yordam berishdan xursand bo'lamiz!
            </p>
            <address className="not-italic mb-4">
              <p>9QQQ+3GV, Kuvasay Street, Fergana, Uzbekistan</p>
              <p>Tel: +998 94 459 06 28</p>
              <p>Email: info@e-commerce.uz</p>
            </address>
          </div>
          <div className="h-64 rounded-lg overflow-hidden">
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
