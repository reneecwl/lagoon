import { useState, useEffect } from "react";
import londonImage from "../../src/assets/images/destinations/london.jpg";
import barcelonaImage from "../../src/assets/images/destinations/barcelona.jpg";
import sevilleImage from "../../src/assets/images/destinations/seville.jpg";
import romeImage from "../../src/assets/images/destinations/rome.jpg";
import tokyoImage from "../../src/assets/images/destinations/tokyo.jpg";
import sydneyImage from "../../src/assets/images/destinations/sydney.jpg";
import granadaImage from "../../src/assets/images/destinations/granada.jpg";
import parisImage from "../../src/assets/images/destinations/paris.jpg";

export const locationImages = {
  London: londonImage,
  Paris: parisImage,
  Barcelona: barcelonaImage,
  Seville: sevilleImage,
  Rome: romeImage,
  Tokyo: tokyoImage,
  Sydney: sydneyImage,
  Granada: granadaImage,
};

export const getDestinationImage = (location) => {
  if (location && locationImages[location]) {
    return locationImages[location];
  }
  return locationImages["Seville"];
};

export const useDestinationImage = (location) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    if (location) {
      setBackgroundImage(getDestinationImage(location));
    }
  }, [location]);

  return backgroundImage;
};
