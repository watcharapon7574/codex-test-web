import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAdmin } from '@/contexts/AdminContext';
// ...import อื่นๆ ตามเดิม

const AboutSection = () => {
  const { isAdmin } = useAdmin();
  const [about, setAbout] = useState<any>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase
        .from('about')
        .select('*')
        .single(); // ดึงแถวเดียว
      if (error) return; // handle error
      setAbout(data);
    };
    fetchAbout();
  }, []);

  if (!about) return null; // หรือ loading spinner

  // features, mission_points, stats ดึงจาก jsonb
  const features = about.features ?? [];
  const missionPoints = about.mission_points ?? [];
  const stats = about.stats ?? [];

  return (
    <section id="about" className="section-container bg-gradient-to-b from-background to-accent/20">
      <div className="text-center mb-16">
        <h2 className="section-title">{about.title}</h2>
        <p className="section-subtitle">{about.description}</p>
      </div>
      {/* Image Section */}
      <div className="mb-16">
        <div className="max-w-4xl mx-auto">
          <img
            src={about.image ? `${about.image}?t=${about.updated_at || Date.now()}` : ""}
            alt={about.imageDescription || "เกี่ยวกับศูนย์การศึกษาพิเศษ"}
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-card"
          />
          <p className="text-center text-muted-foreground mt-4">
            {about.imageCaption}
          </p>
        </div>
      </div>
      {/* จุดเด่น */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="education-card text-center border-0 shadow-card hover:shadow-card-hover"
          >
            {feature.image ? (
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-40 object-cover rounded-t-2xl"
                style={{ display: 'block' }}
              />
            ) : (
              <div className="w-full h-40 bg-primary/10 rounded-t-2xl"></div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-bold text-primary mt-4">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* พันธกิจ + สถิติ */}
      <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-primary mb-6">
              พันธกิจของเรา
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {missionPoints.map((m: any, idx: number) => (
                <p key={idx}>
                  <strong className="text-primary">{m.title}:</strong> {m.description}
                </p>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-primary-light/10 rounded-xl p-8">
            <h4 className="text-2xl font-bold text-primary mb-6">สถิติความสำเร็จ</h4>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s: any, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{s.number}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;