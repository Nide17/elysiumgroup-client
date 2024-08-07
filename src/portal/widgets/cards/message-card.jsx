import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Typography } from "@material-tailwind/react";
import img_thumbnail from "@/images/img_thumbnail.png";

export function MessageCard({ imageUrl, name, message, action }) {

  const [preloadedImage, setPreloadedImage] = useState(null);

  useEffect(() => {
    const preloadImage = async () => {
      const response = imageUrl && await fetch(imageUrl);

      if (response && response.ok) {
        const blob = await response.blob();
        setPreloadedImage(URL.createObjectURL(blob));
      }
    };

    preloadImage();
  }, [imageUrl]);

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar
          src={preloadedImage || img_thumbnail}
          alt={name}
          variant="rounded"
          className="shadow-lg shadow-blue-gray-500/25"
        />
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {name}
          </Typography>
          <Typography className="text-xs font-normal text-blue-gray-400">
            {message}
          </Typography>
        </div>
      </div>
      {action}
    </div>
  );
}

MessageCard.defaultProps = {
  action: null,
};

MessageCard.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.node.isRequired,
  action: PropTypes.node,
};

MessageCard.displayName = "/src/widgets/cards/message-card.jsx";

export default MessageCard;
