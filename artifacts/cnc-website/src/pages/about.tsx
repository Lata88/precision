import { Target, Users, Award, Handshake, Settings, Plane, Flame, Factory, Cross, GraduationCap, CheckCircle2 } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To empower modern manufacturing by delivering innovative, high-precision machining solutions that drive unparalleled operational growth.",
  },
  {
    icon: Users,
    title: "Our Expertise",
    desc: "A multidisciplinary team offering specialized turnkey solutions, advanced CNC machinery, and expert consultation tailored to your unique industrial needs.",
  },
  {
    icon: Award,
    title: "Our Commitment",
    desc: "Unwavering dedication to uncompromising quality, transparent integrity, and ensuring complete customer satisfaction in every project we undertake.",
  },
  {
    icon: Handshake,
    title: "Our Promise",
    desc: "To build enduring, value-driven partnerships anchored in mutual trust, relentless technological advancement, and consistent performance.",
  },
];

const industries = [
  { icon: Settings, label: "Automotive" },
  { icon: Plane, label: "Aerospace" },
  { icon: Flame, label: "Oil & Gas" },
  { icon: Factory, label: "General Engineering" },
  { icon: Cross, label: "Medical" },
  { icon: GraduationCap, label: "Education & Research" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Section 1: Hero Split ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-navy mb-4 border-b-2 border-primary inline-block pb-1">
            About Us
          </p>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-gray-900 leading-tight mb-2">
            Precision Solutions.
          </h1>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-navy leading-tight mb-6">
            Powering Progress.
          </h1>
          <div className="w-12 h-1 bg-gray-800 mb-8"></div>

          <p className="text-gray-700 leading-relaxed mb-5">
            <strong>Precision Machine Tools LLC</strong>, based in Sharjah, is a trusted provider of advanced engineering and industrial automation solutions across the UAE and MENA region. Backed by a team of experienced technocrats and industry professionals with over a decade of expertise, we specialize in delivering complete turnkey solutions including machine tools, fixtures, robotics, and customized tooling tailored to diverse industrial requirements.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For more than five years, we have supported our customers with strong technical knowledge, practical engineering solutions, and reliable service. Our focus is on helping businesses improve operational efficiency, adopt the latest technologies, and achieve higher productivity through innovative and cost-effective solutions designed for long-term success.
          </p>
        </div>

        {/* Right: image */}
        <div className="relative h-80 lg:h-[600px] rounded-lg overflow-hidden shadow-xl">
          <img
            src={`${import.meta.env.BASE_URL}images/about-hero.png`}
            alt="Engineers at CNC machine"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── Section 2: 4-pillar navy strip ── */}
      <section className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {pillars.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start">
              <div className="shrink-0 w-16 h-16 rounded-full border-2 border-white/40 flex items-center justify-center mt-1">
                <Icon className="w-9 h-9 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Industries bar ── */}
      <section className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-30">          {/* Label */}
          <div className="shrink-0 lg:w-48 lg:border-r lg:border-gray-300 lg:pr-10">
            <h2 className="text-xl font-display font-extrabold text-navy leading-tight">
              Serving Diverse<br />Industries
            </h2>
          </div>

          {/* Icons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-20">
            {industries.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="w-14 h-14 rounded-full border-2 border-gray-300 flex items-center justify-center text-navy">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-gray-600 font-medium max-w-[72px] leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: ISO Certificates ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">Certifications</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
              ISO Certifications
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto"></div>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              Our commitment to quality and excellence is demonstrated through our internationally recognized certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ISO 9001 Certificate */}
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden mb-4">
                <img 
                  src="/images/iso-9001-certificate.png" 
                  alt="ISO 9001:2015 Quality Management System Certificate"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  ISO 9001:2015
                </h3>
                <p className="text-primary font-semibold">
                  Quality Management System
                </p>
              </div>
            </div>

            {/* ISO 14001 Certificate */}
            <div className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden mb-4">
                <img 
                  src="/images/iso-14001-certificate.png" 
                  alt="ISO 14001:2015 Environmental Management System Certificate"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-foreground mb-2">
                  ISO 45001:2018
                </h3>
                <p className="text-primary font-semibold">
                  Occupational Health & Safety Management System
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              These certifications demonstrate our dedication to maintaining the highest standards in quality management and environmental responsibility.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
