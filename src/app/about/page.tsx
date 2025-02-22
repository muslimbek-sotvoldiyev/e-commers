import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { TeamMember } from "@/components/team-member";
import { Map } from "@/components/map";
import { ShoppingBag, Shield, Zap } from "lucide-react";

export const metadata = {
  title: "Biz haqimizda | E-commerce Do'koni",
  description:
    "E-commerce do'konimiz haqida batafsil ma'lumot, tarix va qadriyatlarimiz.",
};

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16 relative overflow-hidden h-screen flex flex-col justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/e-commerce.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 text-white px-6">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">
            Biz haqimizda
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
            Sizning ishonchli onlayn xarid hamkoringiz
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Bizning tarixmiz</h2>
        <Timeline>
          <TimelineItem
            year="2025"
            title="Kompaniya tashkil topdi"
            description="Kichik startup sifatida ishni boshladik"
          />
          <TimelineItem
            year="2030"
            title="100 000 foydalanuvchi"
            description="katta online dokon boladi uzum marketni sindiradi"
          />
          <TimelineItem
            year="2050"
            title="Mobil ilova"
            description="Android va iOS uchun ilovamizni ishga tushuriladi kelajeda"
          />
        </Timeline>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Bizning qadriyatlarimiz</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <ShoppingBag className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sifat</h3>
              <p className="text-gray-600">
                Biz faqat eng yuqori sifatli mahsulotlarni taklif etamiz
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ishonch</h3>
              <p className="text-gray-600">
                Mijozlarimiz bilan ochiq va halol munosabatlarni qadrlaymiz
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovatsiya</h3>
              <p className="text-gray-600">
                Doimiy ravishda yangilanib va takomillashib boramiz
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Bizning jamoamiz</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <TeamMember name="Aziz Rahimov" position="CEO" image="/user.png" />
          <TeamMember name="Malika Karimova" position="CTO" image="/user.png" />
          <TeamMember
            name="Jasur Umarov"
            position="Marketing Director"
            image="/user.png"
          />
          <TeamMember
            name="Nilufar Saidova"
            position="Customer Support Lead"
            image="/user.png"
          />
        </div>
      </section>

      <section className="mb-16 relative">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
          }}
        ></div>
        <div className="relative bg-black bg-opacity-60 text-white p-8 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Bizning maqsadimiz</h2>
          <p className="text-xl mb-4">
            Biz O'zbekistondagi har bir inson uchun sifatli mahsulotlarni qulay
            va ishonchli tarzda xarid qilish imkoniyatini yaratishni maqsad
            qilganmiz.
          </p>
          <p className="text-xl">
            Innovatsion texnologiyalar va mijozlarga yo'naltirilgan
            yondashuvimiz orqali biz onlayn savdoning yangi standartlarini
            o'rnatmoqchimiz.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Biz bilan bog'laning</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-xl text-gray-600 mb-4">
              Savollaringiz bormi? Biz sizga yordam berishdan xursand bo'lamiz!
            </p>
            <address className="not-italic mb-4">
              <p>
                9QQQ+3GV, Kuvasay Street, Fergana, Fergana Region, Uzbekistan
              </p>
              <p>Tel: +998 94 459 06 28</p>
              <p>Email: info@e-commerce.uz</p>
            </address>
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary-dark"
            >
              Bog'lanish
            </Button>
          </div>
          <div className="h-64 rounded-lg overflow-hidden">
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
}
