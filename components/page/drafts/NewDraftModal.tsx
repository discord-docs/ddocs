import { FunctionComponent, useEffect, useState } from "react";
import { css, styled } from "../../../stitches.config";
import Text from "../../typography/Text";
import DatePicker from "../../util/form/DatePicker";
import Modal from "../../util/Modal";
import TextInput from "../../util/form/TextInput";
import UploadFile from "../../util/form/UploadFile";
import GracefulImage from "../../util/GracefulImage";
import Header from "../../typography/Header";
import Button from "../../util/form/Button";
import { CreateDraft } from "../../../lib/api-models/createDraft";

interface NewDraftModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (draft: CreateDraft) => void;
  clearOnCancel?: boolean;
  clearOnSumbit?: boolean;
}

export interface NewDraftFormContents {
  heldAt: Date;
  title: string;
  description: string;
  thumbnail: string;
}

const DescriptionStyles = css({
  height: "110px",
});

const DateTimePickerContainer = styled("div", {
  display: "flex",
});

const TimePickerStyles = css({
  marginLeft: "1rem",
});

const ImageStyles = css({
  width: "-moz-available;width:-webkit-fill-available",
});

const ImageContainer = styled("div", {
  display: "flex",
  marginTop: "1rem",
});

const ButtonContainer = styled("div", {
  display: "flex",
  marginTop: "1rem",
});

const ButtonStyle = css({
  marginRight: "1rem",
});

const NewDraftModal: FunctionComponent<NewDraftModalProps> = ({
  open,
  onCancel,
  onSubmit,
  clearOnCancel,
  clearOnSumbit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [heldAtDate, setHeldAtDate] = useState(new Date());
  const [heldAtTime, setHeldAtTime] = useState(new Date());
  const [thumbnail, setThumbnail] = useState<string>();

  const [titleInvalid, setTitleInvalid] = useState(false);
  const [titleInvalidReason, setTitleInvalidReason] = useState("");
  const [descriptionInvalid, setDescriptionInvalid] = useState(false);
  const [descriptionInvalidReason, setDescriptionInvalidReason] = useState("");

  clearOnSumbit ??= true;
  clearOnCancel ??= false;

  const getDate = () => {
    return new Date(
      Date.parse(`${heldAtDate.toDateString()} ${heldAtTime.toTimeString()}`)
    );
  };

  const validateInput = (): boolean => {
    let isValid = true;

    if (!title) {
      setTitleInvalid(true);
      setTitleInvalidReason("Title is required");
      isValid = false;
    } else {
      setTitleInvalid(false);
    }

    if (!description) {
      setDescriptionInvalid(true);
      setDescriptionInvalidReason("Description is required");
      isValid = false;
    } else {
      setDescriptionInvalid(false);
    }

    return isValid;
  };

  useEffect(() => {
    if (titleInvalid) setTitleInvalid(false);
  }, [title]);

  useEffect(() => {
    if (descriptionInvalid) setDescriptionInvalid(false);
  }, [description]);

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setHeldAtDate(new Date(Date.now()));
    setHeldAtTime(new Date(Date.now()));
    setThumbnail("");
  };

  const footer = (
    <ButtonContainer>
      <Button
        onClick={() => {
          onCancel();
          if (clearOnCancel) clearForm();
        }}
        className={`${ButtonStyle}`}
        style="secondary"
      >
        Cancel
      </Button>
      <Button
        onClick={() => {
          if (validateInput()) {
            onSubmit({
              title,
              description,
              heldAt: getDate().toJSON(),
              thumbnail,
            });

            if (clearOnSumbit) {
              clearForm();
            }
          }
        }}
        className={`${ButtonStyle}`}
        style="primary"
      >
        Submit
      </Button>
    </ButtonContainer>
  );

  return (
    <Modal
      open={open}
      title="New draft"
      footer={footer}
      onClickeOutside={onCancel}
    >
      <Text>Create a new draft for you and others to work on.</Text>
      <TextInput
        title="Title"
        required
        value={title}
        onChange={setTitle}
        shakeOnInvalid
        placeholder="Ian 2 deploy"
        invalid={titleInvalid}
        invalidMessage={titleInvalidReason}
      />

      <TextInput
        className={`${DescriptionStyles}`}
        title="Description"
        required
        value={description}
        onChange={setDescription}
        placeholder="This is a description of the draft"
        multiline
        resize="none"
        rows={5}
        shakeOnInvalid
        invalid={descriptionInvalid}
        invalidMessage={descriptionInvalidReason}
      />
      <DateTimePickerContainer>
        <DatePicker
          value={heldAtDate}
          onChange={(d) => {
            setHeldAtDate(d);
            console.log("Date set ", d);
          }}
          required
          title="Date"
          type="date"
        ></DatePicker>
        <DatePicker
          value={heldAtTime}
          onChange={(d) => {
            setHeldAtTime(d);

            console.log("Time set ", d);
          }}
          className={`${TimePickerStyles}`}
          required
          title="Time"
          type="time"
        ></DatePicker>
      </DateTimePickerContainer>
      <UploadFile
        crop
        aspect={16 / 9}
        accept="image/jpeg, image/png"
        description="Upload a jpg or png file."
        onUpload={(id) => {
          console.log("Uploaded file", id);
          setThumbnail(id);
        }}
        title="Thumbnail"
        buttonText="Upload thumbnail"
      />
      {thumbnail && (
        <ImageContainer>
          <GracefulImage
            className={`${ImageStyles}`}
            id={thumbnail}
          ></GracefulImage>
        </ImageContainer>
      )}
    </Modal>
  );
};

export default NewDraftModal;
