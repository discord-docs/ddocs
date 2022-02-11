import { CSSProperties, keyframes } from "@stitches/react";
import { FunctionComponent } from "react";
import ProgressiveImage from "react-progressive-graceful-image";
import API, { Routes } from "../../lib/api";
import { styled } from "../../stitches.config";

interface GracefulImageProps {
  hasThumbnail?: boolean;
  id: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  style?: CSSProperties;
  onClick?: () => void;
}
const GracefulImage: FunctionComponent<GracefulImageProps> = ({
  id,
  hasThumbnail,
  width,
  height,
  className,
  alt,
  style,
  onClick,
}) => {
  const imageUrl = API.getRoute(Routes.Assets + `/${id}`);
  return (
    <>
      {hasThumbnail && (
        <ProgressiveImage src={imageUrl} placeholder={imageUrl + ".thumb"}>
          {(src: string, loading: boolean) => (
            <img
              src={src}
              className={className}
              alt={alt}
              height={height}
              width={width}
              onClick={onClick}
              style={{
                ...style,
                transition: `all 250ms ease-in-out`,
                filter: loading ? "blur(10px)" : "",
              }}
            />
          )}
        </ProgressiveImage>
      )}
      {!hasThumbnail && (
        <img
          onClick={onClick}
          src={imageUrl}
          className={className}
          alt={alt}
          height={height}
          width={width}
          style={style}
        />
      )}
    </>
  );
};

export default GracefulImage;
