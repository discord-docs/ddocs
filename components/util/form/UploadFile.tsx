import React, { createRef, useState } from "react";
import { FunctionComponent } from "react";
import { css, styled } from "../../../stitches.config";
import Button from "./Button";
import FormItemTitle from "./FormItemTitle";
import Text from "../../typography/Text";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner";
import CropperModal from "../CropperModal";
import { Area } from "react-easy-crop/types";
import { toBase64 } from "../../../lib/fileConverter";

interface UploadFileProps {
  title?: string;
  description?: string;
  buttonText?: string;
  required?: boolean;
  accept?: string;
  crop?: boolean;
  aspect?: number;
  onUpload: (id: string) => void;
}

const FileInput = styled("input", {
  display: "none",
});

const ButtonStyles = css({});

const ButtonContainer = styled("div", {
  marginTop: "0.5rem",
  position: "relative",

  display: "flex",
  alignItems: "center",
});

const CropContainer = styled("div", {});

const UploadFile: FunctionComponent<UploadFileProps> = ({
  title,
  required,
  buttonText,
  description,
  onUpload,
  accept,
  crop,
  aspect,
}) => {
  const auth = useAuth();
  const inputRef = createRef<HTMLInputElement>();

  const [uploading, setIsUploading] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [imageString, setImageString] = useState<string>("");

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileUpload = async (
    file: File,
    cropArea?: Area,
    upload: boolean = false
  ) => {
    if (!crop || upload) {
      setIsUploading(true);

      const id = await uploadFile(file, cropArea);

      if (id) {
        onUpload(id);
      }

      setIsUploading(false);
    } else {
      setFile(file);
      setImageString((await toBase64(file))!);
      setCropModalOpen(true);
    }
  };

  const uploadFile = (
    file: File,
    cropArea?: Area
  ): Promise<string | undefined> => {
    return auth.Api!.uploadAsset(file, cropArea);
  };

  return (
    <>
      {crop && (
        <CropperModal
          onCancel={() => setCropModalOpen(false)}
          image={imageString}
          open={cropModalOpen}
          aspect={aspect!}
          onCrop={(a) => {
            setCropModalOpen(false);
            handleFileUpload(file!, a, true);
          }}
        />
      )}
      <FormItemTitle title={title ?? "Upload File"} required={required} />
      {description && (
        <Text size={"small"} weight={"light"}>
          {description}
        </Text>
      )}
      <FileInput
        onChange={(e) => {
          console.log(e.target.files);
          if (e.target.files?.length === 0) return;

          const file = e.target.files?.item(0)!;
          handleFileUpload(file);
        }}
        accept={accept}
        ref={inputRef}
        type="file"
      ></FileInput>
      <ButtonContainer>
        <Button
          disabled={uploading}
          onClick={() => openFileDialog()}
          className={`${ButtonStyles}`}
        >
          {buttonText ?? "Upload file"}
        </Button>
        {uploading && (
          <Spinner className={`${css({ stroke: "$brand" })}`}></Spinner>
        )}
      </ButtonContainer>
    </>
  );
};

export default UploadFile;
