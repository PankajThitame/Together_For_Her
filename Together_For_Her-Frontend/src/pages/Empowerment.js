import React from "react";
import { Link } from "react-router-dom";
import Card, { CardBody } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { FaGraduationCap, FaShieldAlt, FaHeartbeat, FaQuoteLeft, FaQuestionCircle, FaArrowRight } from "react-icons/fa";

const Empowerment = () => {
  return (
    <div className="min-h-screen bg-pink-50/20 animate-fadeIn">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-500 to-rose-600 text-white py-20 px-8 rounded-[3rem] shadow-2xl mb-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">Empowering Women, <span className="text-pink-200">Together</span></h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed italic">
              "Join us in creating a world where every woman feels safe, healthy, and empowered to lead."
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/donate">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 shadow-xl">Support Our Mission</Button>
              </Link>
              <Link to="/community">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">Join the Movement</Button>
              </Link>
            </div>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl opacity-20" />
        </section>

        {/* Why Empowerment - Stats */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Why Our Work Matters</h2>
            <p className="text-gray-500 max-w-2xl mx-auto italic">Addressing systemic challenges with data-driven action and community support.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { val: "1 in 3", desc: "Experience gender-based violence", icon: <FaShieldAlt />, color: "bg-pink-100 text-pink-600" },
              { val: "500M+", desc: "Lack menstrual hygiene resources", icon: <FaHeartbeat />, color: "bg-rose-100 text-rose-600" },
              { val: "Only 24%", desc: "Leadership positions held by women", icon: <FaGraduationCap />, color: "bg-purple-100 text-purple-600" }
            ].map((stat, idx) => (
              <Card key={idx} className="border-none shadow-xl bg-white/80 backdrop-blur-sm text-center group">
                <CardBody className="p-10">
                  <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-extrabold text-gray-900 mb-2 truncate">{stat.val}</h3>
                  <p className="text-gray-500 font-medium">{stat.desc}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Focus Areas */}
        <section className="mb-20">
          <div className="flex items-center justify-between gap-4 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Focus Areas</h2>
            <div className="h-px flex-1 bg-pink-100 ml-4" />
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Menstrual Health", img: "/images/menstrual health.jpg", desc: "Breaking myths and spreading awareness about global hygiene standards." },
              { title: "Safety & Support", img: "/images/safetyandsupport.jpg", desc: "Direct resources and emergency helplines for women in distress." },
              { title: "Leadership", img: "/images/leadership.jpg", desc: "Empowering career growth and educational milestones for future leaders." }
            ].map((area, idx) => (
              <Card key={idx} className="overflow-hidden border-none shadow-lg group">
                <div className="aspect-video relative overflow-hidden">
                  <img src={area.img} alt={area.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white">{area.title}</h3>
                </div>
                <CardBody className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{area.desc}</p>
                  <Link to="/services" className="text-pink-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/link">
                    Explore Service <FaArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="bg-slate-900 text-white rounded-[3rem] p-12 md:p-20 mb-20 relative overflow-hidden">
          <FaQuoteLeft className="text-7xl text-pink-600/20 absolute top-10 left-10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight text-center">Stories of Strength</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                { name: "Priya Sharma", text: "I started my own business after joining this initiative. It completely changed my life and outlook on my community." },
                { name: "Ananya Verma", text: "Together for Her gave me the confidence and mental support when I needed it the most. I'm now a volunteer myself." }
              ].map((story, idx) => (
                <div key={idx} className="space-y-4">
                  <p className="text-lg md:text-xl text-slate-300 font-light italic leading-relaxed">"{story.text}"</p>
                  <h4 className="font-bold text-pink-500 uppercase tracking-widest text-sm">— {story.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ & Help Section */}
        <div className="grid lg:grid-cols-2 gap-10">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm p-2">
            <CardBody className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <FaQuestionCircle className="text-pink-600" /> FAQs
              </h3>
              <div className="space-y-6">
                {[
                  { q: "What is menstrual hygiene awareness?", a: "It includes standardized education on menstrual health, proper hygiene practices, and breaking long-standing myths." },
                  { q: "How can I volunteer my time?", a: "You can join our global mission by signing up on our dedicated Volunteer page or reaching out via Contact." }
                ].map((faq, idx) => (
                  <details key={idx} className="group border-b border-pink-50 pb-4">
                    <summary className="cursor-pointer font-bold text-gray-800 list-none flex justify-between items-center">
                      {faq.q}
                      <span className="text-pink-600 transition-transform group-open:rotate-180">↓</span>
                    </summary>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed italic">{faq.a}</p>
                  </details>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-xl bg-gradient-to-br from-pink-600 to-rose-700 text-white p-2">
            <CardBody className="p-8">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 border-b border-white/20 pb-4">
                Resources & Helplines
              </h3>
              <div className="space-y-6">
                {[
                  { label: "Women’s Helpline", val: "1091", desc: "Available 24/7 for urgent distress calls." },
                  { label: "Domestic Violence", val: "181", desc: "Support for safety and relocation." },
                  { label: "Legal Aid Center", val: "Visit Website", desc: "Free legal representation for women." }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-pink-100 text-xs uppercase tracking-widest mb-1">{item.label}</h4>
                      <p className="text-[10px] text-white/60 italic">{item.desc}</p>
                    </div>
                    <span className="text-lg font-extrabold bg-white/10 px-4 py-2 rounded-xl group-hover:bg-white group-hover:text-pink-600 transition-all">{item.val}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/contact">
                  <Button className="w-full bg-white text-pink-600 hover:bg-pink-50 h-12 shadow-lg">Contact Our Support Team</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Empowerment;
