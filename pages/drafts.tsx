import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { useWebsocket } from "../components/context/WebsocketContext";
import NewDraftModal from "../components/page/drafts/NewDraftModal";
import Modal from "../components/util/Modal";
import Textbox from "../components/util/form/TextInput";
import Button from "../components/util/form/Button";
import Spinner from "../components/util/Spinner";
import { css, styled } from "../stitches.config";
import CropperModal from "../components/util/CropperModal";
import { Draft } from "../lib/api-models/draft";
import Author from "../lib/api-models/author";
import { Intents } from "../lib/packets/intents";
import Panel from "../components/util/Panel";
import GracefulImage from "../components/util/GracefulImage";
import Header from "../components/typography/Header";
import Text from "../components/typography/Text";
import React from "react";
import { Packet } from "../lib/packets/packet";

interface DraftsProps {}

const DraftsContainer = styled("div", {
  position: "relative",
  display: "grid",
  justifyContent: "center",
  gridTemplateColumns: "repeat(auto-fit, 250px)",
  gridTemplateRows: "290px",
  gap: 40,
  width: "100%",
});

const Padding = styled("div", {
  padding: 12,
});

const CardHeaderStyle = css({
  margin: "0 0 0.25rem 0",
});

const CardStyle = css({
  userSelect: "none",
  cursor: "pointer",
});

function DraftCard({ draft }: { draft: Draft }) {
  const router = useRouter();
  return (
    <Panel
      onClick={() => {
        router.push("/drafts/" + draft.id);
      }}
      className={`${CardStyle}`}
      padding="nopad"
    >
      {draft.thumbnail && (
        <GracefulImage
          style={{
            width: "100%",
          }}
          id={draft.thumbnail}
        />
      )}
      <Padding>
        <Header className={`${CardHeaderStyle}`} variant="h6">
          {draft.title}
        </Header>
        <Text>{draft.description}</Text>
      </Padding>
    </Panel>
  );
}

const Drafts: FunctionComponent<DraftsProps> = () => {
  const socket = useWebsocket();
  const auth = useAuth();
  const router = useRouter();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [users, setUsers] = useState<Author[]>([]);

  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    const intentListener = (draft: Draft) => {
      setDrafts((prevDrafts) => prevDrafts.concat(draft));
    };

    const callback = async (isAuthenticated: boolean) => {
      if (!isAuthenticated) router.replace("/");
      else {
        setDrafts((await auth.Api?.getDrafts()) ?? []);
        socket.addIntentListener(Intents.DraftCreated, intentListener);
      }
    };
    auth.loginCallback(callback);
    return () => {
      auth.removeLoginCallback(callback);
      socket.removeIntentListener(intentListener);
    };
  }, []);

  useEffect(() => {
    setUsers(socket.users);
  }, [socket.users]);

  return (
    <>
      <NewDraftModal
        onSubmit={async (draft) => {
          setCreateModalOpen(false);
          await auth.Api?.createDraft(draft);
        }}
        onCancel={() => {
          setCreateModalOpen(false);
        }}
        open={createModalOpen}
      />
      <Header variant="h1">Drafts</Header>
      <Text>
        Create, edit, and collaborate on summary drafts with your friends or
        foes
      </Text>

      <Button onClick={() => setCreateModalOpen(true)} style={"primary"}>
        Open shitty modal
      </Button>
      <DraftsContainer>
        {drafts.map((draft) => (
          <DraftCard key={draft.id} draft={draft} />
        ))}
      </DraftsContainer>
    </>
  );
};

export default Drafts;
