import SectionHeader from "../ui/SectionHeader";

const features = [
  { num: "01", title: "Well-Maintained Equipment", desc: "Regularly serviced machines, safety-checked before every dispatch." },
  { num: "02", title: "Flexible Rental Terms", desc: "Daily and monthly plans that scale with your project timeline." },
  { num: "03", title: "Genuine Brands", desc: "Original products from Festo, Bosch, Fluke, SMC, Cumi and more." },
  { num: "04", title: "Responsive Support", desc: "Direct phone and WhatsApp assistance for rentals and enquiries." },
];

const ReliabilitySupport = () => {
  return (
    <section className="reliability">
      <div className="container">
        <SectionHeader
          subtitle="Why AeroTech"
          title="Built on reliability and support"
          description="We combine dependable machines, genuine products and responsive service so your work never stops."
          theme="dark"
        />
        <div className="reliability__grid">
          {features.map((f) => (
            <div className="reliability__card" key={f.num}>
              <span className="reliability__num">{f.num}</span>
              <h3 className="reliability__title">{f.title}</h3>
              <p className="reliability__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReliabilitySupport;
