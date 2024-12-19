import Image from 'next/image';

const defaultPhoto = '/images/default-photo.jpg';

interface Member {
  name: string[];
  photo: string;
}

interface ProjectTeamGalleryProps {
  members: Member[];
}

const ProjectTeamGallery: React.FC<ProjectTeamGalleryProps> = ({ members }) => {
  return (
    <section aria-label='Team Photos' className="team-gallery, grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {members.map((member, index) => (
        <div key={index} className="team-member flex flex-col items-center gap-4">
          <Image
            fill={false}
            src={member.photo || defaultPhoto}
            alt={`Photo of ${member.name[0]}.`}
            className="team-member-photo"
            width={200}
            height={200}
          />
          <div className="team-member-info">
            <h3>{member.name[0]}</h3>
            <p>{member.name[1]}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectTeamGallery;