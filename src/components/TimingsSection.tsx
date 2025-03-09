
import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, MapPin } from 'lucide-react';

const TimingsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const childElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    childElements?.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      childElements?.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  const regularTimings = [
    { day: "सोमवार से शनिवार", morning: "05:00 AM - 12:00 PM", evening: "04:00 PM - 09:00 PM" },
    { day: "रविवार और छुट्टियां", morning: "04:30 AM - 01:00 PM", evening: "03:30 PM - 10:00 PM" },
  ];
  
  const specialTimings = [
    { name: "नवरात्रि", time: "03:30 AM - 11:00 PM" },
    { name: "कृष्ण जन्माष्टमी", time: "24 घंटे खुला" },
    { name: "शिवरात्रि", time: "24 घंटे खुला" },
    { name: "होली", time: "06:00 AM - 10:00 PM" },
  ];
  
  const upcomingEvents = [
    { name: "नवरात्रि उत्सव", date: "15 अक्टूबर - 24 अक्टूबर, 2023" },
    { name: "अन्नकूट", date: "13 नवंबर, 2023" },
    { name: "गीता जयंती", date: "23 दिसंबर, 2023" },
  ];

  return (
    <section id="timings" className="section-container bg-temple-cream/50" ref={sectionRef}>
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-temple-gold font-medium mb-3 opacity-0 animate-on-scroll">दर्शन समय</p>
        <h2 className="section-heading text-temple-maroon opacity-0 animate-on-scroll">मंदिर समय</h2>
        <p className="text-lg opacity-0 animate-on-scroll">
          श्री नरसिंह मंदिर के दर्शन और पूजा के समय की जानकारी प्राप्त करें।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="glass-card opacity-0 animate-on-scroll">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-temple-gold mr-2" />
                <h3 className="font-serif text-xl font-semibold text-temple-maroon">नियमित दर्शन समय</h3>
              </div>
              
              <table className="w-full border-collapse">
                <thead className="border-b border-temple-gold/30">
                  <tr>
                    <th className="py-3 text-left text-temple-maroon">दिन</th>
                    <th className="py-3 text-left text-temple-maroon">सुबह</th>
                    <th className="py-3 text-left text-temple-maroon">शाम</th>
                  </tr>
                </thead>
                <tbody>
                  {regularTimings.map((timing, index) => (
                    <tr key={index} className="border-b border-temple-gold/10">
                      <td className="py-3 font-medium">{timing.day}</td>
                      <td className="py-3">{timing.morning}</td>
                      <td className="py-3">{timing.evening}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-8">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-temple-gold mr-2" />
                  <h3 className="font-serif text-xl font-semibold text-temple-maroon">विशेष दिनों के समय</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {specialTimings.map((timing, index) => (
                    <div key={index} className="border border-temple-gold/20 rounded-lg p-4 bg-white/50">
                      <p className="font-medium text-temple-maroon">{timing.name}</p>
                      <p className="text-sm">{timing.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card mt-6 opacity-0 animate-on-scroll">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-temple-gold mr-2" />
                <h3 className="font-serif text-xl font-semibold text-temple-maroon">पहुंचने का मार्ग</h3>
              </div>
              
              <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                {/* Map placeholder */}
                <div className="w-full h-full flex items-center justify-center bg-temple-gold/10">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-temple-maroon mx-auto mb-2" />
                    <p className="font-medium">श्री नरसिंह मंदिर, हसमपुर</p>
                    <p className="text-sm text-gray-600">मानचित्र यहां प्रदर्शित होगा</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="font-medium">पता:</p>
                <p>श्री नरसिंह मंदिर</p>
                <p>हसमपुर गांव,</p>
                <p>उत्तर प्रदेश, भारत</p>
                
                <Separator className="my-4 bg-temple-gold/20" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">निकटतम रेलवे स्टेशन:</p>
                    <p className="text-sm">हसमपुर रेलवे स्टेशन (2 किमी)</p>
                  </div>
                  
                  <div>
                    <p className="font-medium">निकटतम बस स्टॉप:</p>
                    <p className="text-sm">हसमपुर बस स्टैंड (1 किमी)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="glass-card sticky top-20 opacity-0 animate-on-scroll">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-temple-gold mr-2" />
                <h3 className="font-serif text-xl font-semibold text-temple-maroon">आगामी उत्सव</h3>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="border-b border-temple-gold/20 pb-4 last:border-0">
                    <p className="font-medium text-temple-maroon">{event.name}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6 bg-temple-gold/20" />
              
              <div>
                <h4 className="font-medium mb-2 text-temple-maroon">आरती समय</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>प्रातः आरती:</span>
                    <span className="font-medium">5:30 AM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>मध्याह्न आरती:</span>
                    <span className="font-medium">12:00 PM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>संध्या आरती:</span>
                    <span className="font-medium">6:30 PM</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>शयन आरती:</span>
                    <span className="font-medium">8:00 PM</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6 bg-temple-gold/20" />
              
              <div>
                <h4 className="font-medium mb-2 text-temple-maroon">संपर्क विवरण</h4>
                
                <div className="space-y-2">
                  <p>फोन: <span className="font-medium">+91 98765 43210</span></p>
                  <p>ईमेल: <span className="font-medium">info@narsinghmandir.org</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TimingsSection;
