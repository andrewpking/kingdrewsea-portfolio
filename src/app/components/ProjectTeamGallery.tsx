import Image from 'next/image';

const defaultPhoto = '/images/default-photo.jpg'; // Path to your default photo

interface Member {
  name: string[];
  photo: string;
}

interface ProjectTeamGalleryProps {
  members: Member[];
}

const ProjectTeamGallery: React.FC<ProjectTeamGalleryProps> = ({ members }) => {
  return (
    <div className="team-gallery">
      {members.map((member, index) => (
        <div key={index} className="team-member">
          <Image
            src={member.photo || defaultPhoto}
            alt={`Photo of ${member.name[0]}.`}
            className="team-member-photo"
          />
          <div className="team-member-info">
            <h3>{member.name[0]}</h3>
            <p>{member.name[1]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectTeamGallery;