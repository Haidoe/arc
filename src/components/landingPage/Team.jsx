import Image from "next/image";
import Link from "next/link";

const Team = () => {
  const teamMembers = [
    {
      name: "Stephany Jade",
      role: "Project Manager / UI/UX Designer",
      linkedIn: "https://www.linkedin.com/in/stephanyxjade/",
      photo: "/images/landing-page/Jade.jpg",
    },
    {
      name: "Rafaela Jung",
      role: "Lead Designer",
      linkedIn: "https://www.linkedin.com/in/rafaelajung/",
      photo: "/images/landing-page/Hafa.jpg",
    },
    {
      name: "Wakana Kaneiwa",
      role: "UI Designer",
      linkedIn: "https://www.linkedin.com/in/wakanakaneiwa/",
      photo: "/images/landing-page/Wakana.jpg",
    },
    {
      name: "Katrina Mirambel",
      role: "UX Designer",
      linkedIn: "https://www.linkedin.com/in/katrinamirambel/",
      photo: "/images/landing-page/Kat.jpg",
    },
    {
      name: "Haidren Amalia",
      role: "Lead Developer",
      linkedIn: "https://www.linkedin.com/in/haidrenamalia/",
      photo: "/images/landing-page/Heids.jpg",
    },
    {
      name: "JB Sinluenam",
      role: "Full Stack Developer",
      linkedIn: "https://www.linkedin.com/in/jbsinluenam/",
      photo: "/images/landing-page/JB.jpg",
    },
    {
      name: "Karan Singh Dhir",
      role: "Full Stack Developer",
      linkedIn: "https://www.linkedin.com/in/ksdhir/",
      photo: "/images/landing-page/Karan.jpg",
    },
  ];

  return (
    <section
      id="team"
      className="flex flex-col items-center gap-6 bg-primary-light px-6 py-16 text-center text-arc lg:gap-16"
    >
      <h2 className="text-4xl font-bold">Team</h2>

      <div className="flex w-full max-w-[600px] flex-wrap gap-4 lg:max-w-[1280px] lg:flex-wrap-reverse lg:gap-0 lg:py-12">
        {teamMembers.map((member, idx) => (
          <Link
            href={member.linkedIn}
            key={idx}
            className="flex flex-1 basis-[25%] flex-col rounded p-4 hover:bg-primary-trans"
          >
            <div className="relative mb-2 h-[118px] w-[118px] self-center overflow-hidden rounded-full bg-gray-300 lg:h-[144px] lg:w-[144px]">
              <Image
                src={member.photo}
                alt={`${member.name} photo`}
                layout="fill"
                objectFit="contain"
              />
            </div>

            <h3 className="text-base font-semibold text-arc lg:text-lg">
              {member.name}
            </h3>

            <p className="text-xs text-arc lg:text-base">{member.role}</p>
          </Link>
        ))}
      </div>

      <div className="team-description hidden max-w-[1024px] py-12 text-xl lg:block">
        Our team of industry experts collaborated to develop Arc. With their
        deep understanding of the filmmaking process and their passion for
        innovation, they crafted a powerful tool that caters to the unique needs
        and challenges of the film production, revolutionizing the way
        filmmakers can bring their visions to the screen.
      </div>
    </section>
  );
};

export default Team;
