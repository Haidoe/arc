// react imports
import Image from "next/image";
import Hafa from "/public/images/landing-page/Hafa.jpg";
import Heids from "/public/images/landing-page/Heids.jpg";
import Jade from "/public/images/landing-page/Jade.jpg";
import JB from "/public/images/landing-page/JB.jpg";
import Karan from "/public/images/landing-page/Karan.jpg";
import Kat from "/public/images/landing-page/Kat.jpg";
import Wakana from "/public/images/landing-page/Wakana.jpg";

// CastTimeLog component form
const Team = () => {
  // team members list
  const teamMembers = [
    {
      name: "Stephany Jade Becerra",
      role: "Project Manager / Designer",
      linkedIn: "https://www.linkedin.com/in/stephanyxjade/",
      photo: Jade,
    },
    {
      name: "Rafaela Jung",
      role: "Lead Designer",
      linkedIn: "https://www.linkedin.com/in/rafaelajung/",
      photo: Hafa,
    },
    {
      name: "Wakana Kaneiwa",
      role: "UI Designer",
      linkedIn: "https://www.linkedin.com/in/wakanakaneiwa/",
      photo: Wakana,
    },
    {
      name: "Katrina Mirambel",
      role: "UX Designer",
      linkedIn: "https://www.linkedin.com/in/katrinamirambel/",
      photo: Kat,
    },
    {
      name: "Haidren Amalia",
      role: "Lead Developer",
      linkedIn: "https://www.linkedin.com/in/haidrenamalia/",
      photo: Heids,
    },
    {
      name: "JB Sinluenam",
      role: "Full Stack Developer",
      linkedIn: "https://www.linkedin.com/in/jbsinluenam/",
      photo: JB,
    },
    {
      name: "Karan Singh Dhir",
      role: "Full Stack Developer",
      linkedIn: "https://www.linkedin.com/in/ksdhir/",
      photo: Karan,
    },
  ];

  //

  return (
    <>
      <div className="bg-primary-light flex flex-col gap-6 text-arc py-16 px-10 text-center">
        <h2 className="text-3xl font-semibold section-title">Team</h2>
        <div className="team-members-list flex flex-row flex-wrap gap-2">          
          {/* using teamMembers.map create cards */}
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-member-card flex-1 flex flex-col rounded borde p-4">
              <div className="mb-2 h-28 w-28 self-center rounded-full bg-gray-300">
                <Image
                  src={member.photo}
                  alt="team member photo"
                  className="w-full h-full rounded-full"
                />
              </div>
              <h3 className="text-lg text-arc font-semibold">{member.name}</h3>
              <p className="text-arc text-sm">{member.role}</p>
            </div>
          ))}
        </div>
        <div className="hidden md:block team-description text-m">
          Our team of industry experts collaborated to develop Arc. With their
          deep understanding of the filmmaking process and their passion for
          innovation, they crafted a powerful tool that caters to the unique
          needs and challenges of the film production, revolutionizing the way
          filmmakers can bring their visions to the screen.
        </div>
      </div>
    </>
  );
};

export default Team;
