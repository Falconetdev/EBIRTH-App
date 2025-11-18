const stats = [
  { label: "Expert Mentors", value: "305+" },
  { label: "Students Enrolled", value: "3,600+" },
  { label: "Premium Courses", value: "220+" },
  { label: "Success Stories", value: "1,700+" },
];

const StatsSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-inherit">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">{stat.value}</h3>
              <p className="text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
