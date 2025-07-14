import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ServiceUnitsSection from '@/components/ServiceUnitsSection';
import NewsSection from '@/components/NewsSection';
import ActivitiesSection from '@/components/ActivitiesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-thai">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ServiceUnitsSection />
        <NewsSection />
        <ActivitiesSection />
        <ContactSection />
      </main>
      <Footer />
      <AdminPanel />
    </div>
  );
};

export default Index;
