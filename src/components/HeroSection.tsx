import heroImage from '@/assets/hero-education-center.jpg';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const HeroSection = () => {
  const [content, setContent] = useState({
    subtitle: '',
    description: '',
    background_video: ''
  });

  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } = await supabase.from('hero').select('*').eq('id', 1).single();
      if (data) {
        setContent(data);
      }
    };
    fetchHero();
  }, []);

  // ดึง videoId จาก background_video เพื่อใช้ใน playlist ให้ลูปวิดีโอได้ถูกต้อง
  const videoId = content.background_video.split("/embed/")[1]?.split("?")[0];
  // เตรียม query string พิเศษไว้บังคับ refresh iframe ทุกครั้ง
  const bgVideoUrl = content.background_video
    ? content.background_video +
      (content.background_video.includes("?") ? "&" : "?") +
      `autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&fs=0` +
      `&refresh=${Date.now()}`
    : "";

  return (
    <section id="home" className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video 
          TODO: ตรวจสอบการโหลดวิดีโอจาก Supabase hero.background_video
          ใช้ bgVideoUrl ซึ่งเพิ่ม query เพื่อบังคับ refresh ทุกครั้ง
      */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <iframe
          src={bgVideoUrl}
          title="Background Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full object-cover"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            minWidth: '100vw', // บังคับเต็มจอ
            minHeight: '100vh', // บังคับเต็มจอ
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary/30 to-primary-light/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg stroke-white">
            <span className="text-white">ยินดีต้อนรับสู่</span>
            <br />
            <span className="text-white">{content.subtitle}</span>
            <br />
            <span className="text-white">เขตการศึกษา 6 จังหวัดลพบุรี</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 hidden lg:block animate-float">
        <div className="w-4 h-4 bg-blue-100/60 rounded-full"></div>
      </div>
      <div className="absolute bottom-32 right-16 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-6 bg-blue-50/50 rounded-full"></div>
      </div>
      <div className="absolute top-40 right-20 hidden lg:block animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-3 h-3 bg-blue-200/60 rounded-full"></div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-32 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          fill="none"
          className="w-full h-full text-background"
        >
          <path
            d="M0,64L1440,32L1440,120L0,120Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;