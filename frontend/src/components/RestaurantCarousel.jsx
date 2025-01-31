import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const RestaurantCarousel = ({ images, restaurantId }) => {
  const [noImage, setNoImage] = useState(false);
  useEffect(() => {
    setNoImage(images.length === 0);
  }, [images]);
  return (
    <div className="carousel w-full h-[300px]">
      {images.length > 0 ? (
        images.map((image, imgIndex) => (
          <div
            key={imgIndex}
            id={`slide${restaurantId}-${imgIndex + 1}`}
            className="carousel-item relative w-full"
          >
            <img
              src={image.url}
              alt={`Foto ${imgIndex + 1}`}
              className="w-full h-[300px]"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                href={`#slide${restaurantId}-${
                  imgIndex === 0 ? images.length : imgIndex
                }`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${restaurantId}-${
                  imgIndex === images.length - 1 ? 1 : imgIndex + 2
                }`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="self-center justify-self-center w-full">No hay imágenes disponibles.</p>
      )}
      {!noImage && (
        <div className="flex justify-center w-full py-2 gap-2">
          {images.map((_, imgIndex) => (
            <a
              key={imgIndex}
              href={`#slide${restaurantId}-${imgIndex + 1}`}
              className="btn btn-xs"
            >
              {imgIndex + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

RestaurantCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  restaurantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default RestaurantCarousel;
