import { FunctionComponent, useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { css, styled } from "../../stitches.config";
import Button from "./form/Button";
import Slider from "./form/Slider";
import Modal from "./Modal";

interface CropperModalProps {
  open: boolean;
  aspect: number;
  image: string;

  onCrop: (crop: Area) => void;
  onCancel: () => void;
}

const ModalStyles = css({});

const CropperContainer = styled("div", {
  position: "relative",
  width: "500px",
  height: "500px",

  "@mobile": {
    width: "100%",
    height: "100%",
  },
});

const ButtonContainer = styled("div", {
  display: "flex",
  marginTop: "1rem",
  alignItems: "center",
});

const ButtonStyle = css({
  marginRight: "1rem",
});

const CropperStyles = css({
  zIndex: 2950,
});

const CropperModal: FunctionComponent<CropperModalProps> = ({
  open,
  aspect,
  image,
  onCrop,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [cropArea, setCropArea] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const footer = (
    <ButtonContainer>
      <Button
        onClick={() => onCancel()}
        className={`${ButtonStyle}`}
        style="danger"
      >
        Cancel
      </Button>
      <Button
        onClick={() => {
          onCrop(cropArea);
        }}
        className={`${ButtonStyle}`}
        style="primary"
      >
        Save
      </Button>
      <Slider
        value={zoom * 10}
        onChange={(v) => setZoom(v / 10)}
        min={10}
        max={50}
        step={1}
      ></Slider>
    </ButtonContainer>
  );

  return (
    <Modal
      className={`${ModalStyles}`}
      open={open}
      title="Crop image"
      footer={footer}
    >
      <CropperContainer>
        <Cropper
          classes={{
            containerClassName: `${CropperStyles} modal-ignore`,
          }}
          image={image}
          aspect={aspect}
          crop={crop}
          zoom={zoom}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, v) => {
            setCropArea(v);
          }}
        ></Cropper>
      </CropperContainer>
    </Modal>
  );
};

export default CropperModal;
