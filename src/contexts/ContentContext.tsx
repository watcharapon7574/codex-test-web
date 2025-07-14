import React, { createContext, useContext, useState, useEffect } from 'react';

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    backgroundVideo: string;
  };
  about: {
    title: string;
    description: string;
    image: string;
    imageCaption: string;
    features: Array<{
      title: string;
      description: string;
    }>;
    mission: {
      title: string;
      points: Array<{
        title: string;
        description: string;
      }>;
    };
    stats: Array<{
      number: string;
      label: string;
    }>;
  };
  services: {
    title: string;
    description: string;
    image: string;
    imageCaption: string;
    serviceList: Array<{
      title: string;
      description: string;
      features: string[];
    }>;
  };
  serviceUnits: {
    title: string;
    description: string;
    units: Array<{
      name: string;
      district: string;
      facebookUrl: string;
    }>;
  };
  news: {
    title: string;
    description: string;
    image: string;
    imageCaption: string;
    articles: Array<{
      title: string;
      excerpt: string;
      date: string;
      category: string;
      featured: boolean;
    }>;
  };
  activities: {
    title: string;
    description: string;
    image: string;
    imageCaption: string;
    events: Array<{
      title: string;
      description: string;
      date: string;
      time: string;
      participants: string;
      status: string;
    }>;
  };
  contact: {
    title: string;
    description: string;
    image: string;
    imageCaption: string;
    contactInfo: Array<{
      title: string;
      details: string[];
    }>;
  };
}

interface ContentContextType {
  content: ContentData;
  updateContent: (section: keyof ContentData, data: any) => void;
  updateNestedContent: (section: keyof ContentData, key: string, data: any) => void;
}

const defaultContent: ContentData = {
  hero: {
    title: 'ยินดีต้อนรับสู่ศูนย์การศึกษาพิเศษ เขตการศึกษา 6 จังหวัดลพบุรี',
    subtitle: 'ศูนย์การศึกษาพิเศษ',
    description: 'มุ่งมั่นพัฒนาการศึกษาสำหรับเด็กพิเศษ สร้างโอกาสและความเท่าเทียมในการเรียนรู้ เพื่อชีวิตที่มีคุณภาพและเป็นอิสระ',
    backgroundVideo: 'https://www.youtube.com/embed/6vfmR7xW9Ws'
  },
  about: {
    title: 'เกี่ยวกับศูนย์การศึกษาพิเศษ',
    description: 'ศูนย์การศึกษาพิเศษ เขตการศึกษา 6 จังหวัดลพบุรี มุ่งมั่นในการให้บริการการศึกษาที่มีคุณภาพสำหรับเด็กที่มีความต้องการพิเศษ ด้วยความเอาใจใส่และความใส่ใจในรายบุคคล',
    image: '/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png',
    imageCaption: 'กิจกรรมการเรียนรู้ผ่านการเล่นเพื่อพัฒนาทักษะของเด็กพิเศษ',
    features: [
      {
        title: 'ทีมผู้เชี่ยวชาญ',
        description: 'บุคลากรที่มีความเชี่ยวชาญในการศึกษาพิเศษ พร้อมให้การดูแลและพัฒนาเด็กอย่างเต็มความสามารถ'
      },
      {
        title: 'หลักสูตรครบวงจร',
        description: 'หลักสูตรการศึกษาที่ออกแบบเฉพาะสำหรับเด็กที่มีความต้องการพิเศษ ครอบคลุมทุกด้านของการพัฒนา'
      },
      {
        title: 'กิจกรรมหลากหลาย',
        description: 'กิจกรรมส่งเสริมพัฒนาการทั้งด้านร่างกาย สังคม อารมณ์ และสติปัญญา เพื่อชีวิตที่สมบูรณ์'
      }
    ],
    mission: {
      title: 'พันธกิจของเรา',
      points: [
        {
          title: 'สร้างโอกาส',
          description: 'เปิดโอกาสทางการศึกษาที่เท่าเทียมสำหรับเด็กทุกคน ไม่ว่าจะมีความต้องการพิเศษในรูปแบบใด'
        },
        {
          title: 'พัฒนาศักยภาพ',
          description: 'ส่งเสริมและพัฒนาความสามารถของเด็กให้เต็มตามศักยภาพของแต่ละบุคคล'
        },
        {
          title: 'สร้างชุมชน',
          description: 'สร้างชุมชนที่เข้าใจ ยอมรับ และสนับสนุนการพัฒนาเด็กที่มีความต้องการพิเศษ'
        }
      ]
    },
    stats: [
      { number: '150+', label: 'นักเรียน' },
      { number: '25+', label: 'อาจารย์' },
      { number: '10+', label: 'ปีประสบการณ์' },
      { number: '95%', label: 'ความพึงพอใจ' }
    ]
  },
  services: {
    title: 'บริการสำหรับเด็กพิเศษและผู้ปกครอง',
    description: 'บริการครบวงจรที่ออกแบบมาเฉพาะเพื่อตอบสนองความต้องการของเด็กที่มีความต้องการพิเศษและสนับสนุนครอบครัวในทุกขั้นตอนของการพัฒนา',
    image: '/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png',
    imageCaption: 'บริการการศึกษาและการบำบัดที่ครอบคลุมทุกความต้องการ',
    serviceList: [
      {
        title: 'การศึกษาพิเศษ',
        description: 'หลักสูตรการศึกษาที่ปรับให้เหมาะสมกับความต้องการของเด็กแต่ละคน',
        features: ['หลักสูตรเฉพาะบุคคล (IEP)', 'การสอนแบบตัวต่อตัว', 'การประเมินพัฒนาการ', 'การบำบัดทางการศึกษา']
      },
      {
        title: 'บำบัดและฟื้นฟู',
        description: 'บริการบำบัดครบวงจรเพื่อพัฒนาทักษะด้านต่างๆ',
        features: ['กายภาพบำบัด', 'กิจกรรมบำบัด', 'การบำบัดทางการพูด', 'การบำบัดเชิงพฤติกรรม']
      }
    ]
  },
  serviceUnits: {
    title: 'หน่วยบริการการศึกษาพิเศษ',
    description: 'ศูนย์การศึกษาพิเศษ เขตการศึกษา 6 จังหวัดลพบุรี มีการให้บริการทางการศึกษาโดยหน่วยบริการ 11 อำเภอของจังหวัดลพบุรี',
    units: [
      { name: 'หน่วยบริการหนองม่วง', district: 'อำเภอหนองม่วง', facebookUrl: 'https://www.facebook.com/profile.php?id=100057078505352' },
      { name: 'หน่วยบริการโคกเจริญ', district: 'อำเภอโคกเจริญ', facebookUrl: 'https://www.facebook.com/profile.php?id=100057482198011' }
    ]
  },
  news: {
    title: 'ข่าวสาร / ประชาสัมพันธ์',
    description: 'ติดตามข่าวสารและกิจกรรมล่าสุดของศูนย์การศึกษาพิเศษ เพื่อไม่พลาดโอกาสดีๆ ในการพัฒนาและเรียนรู้',
    image: '/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png',
    imageCaption: 'ข่าวสารและกิจกรรมต่างๆ ของศูนย์การศึกษาพิเศษ',
    articles: [
      {
        title: 'เปิดรับสมัครนักเรียนใหม่ ปีการศึกษา 2567',
        excerpt: 'ศูนย์การศึกษาพิเศษ เขตการศึกษา 6 จังหวัดลพบุรี เปิดรับสมัครนักเรียนใหม่สำหรับปีการศึกษา 2567',
        date: '15 มีนาคม 2567',
        category: 'ประชาสัมพันธ์',
        featured: true
      }
    ]
  },
  activities: {
    title: 'กิจกรรม / โครงการเด่น',
    description: 'กิจกรรมและโครงการที่ออกแบบมาเพื่อส่งเสริมการพัฒนาเด็กพิเศษในทุกมิติ พร้อมสร้างประสบการณ์การเรียนรู้ที่สนุกสนานและมีประสิทธิภาพ',
    image: '/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png',
    imageCaption: 'กิจกรรมการเรียนรู้และพัฒนาทักษะที่หลากหลาย',
    events: [
      {
        title: 'โครงการพัฒนาทักษะสังคม',
        description: 'กิจกรรมส่งเสริมการปฏิสัมพันธ์ทางสังคมและการสื่อสารของเด็กพิเศษ ผ่านเกมและกิจกรรมกลุ่ม',
        date: '20 มีนาคม 2567',
        time: '09:00 - 12:00 น.',
        participants: '25 คน',
        status: 'เปิดรับสมัคร'
      }
    ]
  },
  contact: {
    title: 'ติดต่อเรา',
    description: 'พร้อมให้คำปรึกษาและตอบข้อสงสัยเกี่ยวกับการศึกษาพิเศษ ติดต่อเราได้ทุกวันในเวลาทำการ',
    image: '/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png',
    imageCaption: 'ติดต่อเราเพื่อสอบถามข้อมูลและขอรับคำปรึกษา',
    contactInfo: [
      {
        title: 'ที่อยู่',
        details: ['123 ถนนพหลโยธิน ตำบลป่าตาล', 'อำเภอเมือง จังหวัดลพบุรี 15000']
      },
      {
        title: 'ติดต่อ',
        details: ['โทรศัพท์: 036-123-456', 'แฟกซ์: 036-123-457', 'อีเมล: info@specialed6.ac.th']
      }
    ]
  }
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentData>(defaultContent);

  useEffect(() => {
    const savedContent = localStorage.getItem('websiteContent');
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent));
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    }
  }, []);

  const updateContent = (section: keyof ContentData, data: any) => {
    const newContent = {
      ...content,
      [section]: { ...content[section], ...data }
    };
    setContent(newContent);
    localStorage.setItem('websiteContent', JSON.stringify(newContent));
  };

  const updateNestedContent = (section: keyof ContentData, key: string, data: any) => {
    const newContent = {
      ...content,
      [section]: {
        ...content[section],
        [key]: data
      }
    };
    setContent(newContent);
    localStorage.setItem('websiteContent', JSON.stringify(newContent));
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, updateNestedContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};