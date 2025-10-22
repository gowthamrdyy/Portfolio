import React, { useState } from "react";
import { Blurhash } from "react-blurhash";

const ProjectImage = ({ image, blurhash, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-60 w-full overflow-hidden rounded-xl">
      {!loaded && (
        <Blurhash
          hash={blurhash}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="absolute top-0 left-0 h-full w-full"
        />
      )}
      <img
        src={image}
        onLoad={() => setLoaded(true)}
        className={`absolute top-0 left-0 h-full w-full object-cover rounded-xl transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        alt={alt}
      />
    </div>
  );
};

export default ProjectImage;
