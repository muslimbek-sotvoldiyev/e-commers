import Image from "next/image";

export const TeamMember = ({
  name,
  position,
  image,
}: {
  name: string;
  position: string;
  image: string;
}) => {
  return (
    <div className="text-center group">
      <div className="relative overflow-hidden rounded-full mb-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={200}
          height={200}
          className="mx-auto transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{position}</p>
    </div>
  );
};
