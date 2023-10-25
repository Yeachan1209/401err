import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import Header from "../components/home/Header";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

Modal.setAppElement("#root");

interface Memo {
  title: string;
  content: string;
}

function MemoPage() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEditMode, setModalEditMode] = useState(false);
  const [modalMemoIndex, setModalMemoIndex] = useState(-1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const openModal = () => {
    setModalIsOpen(true);
    setModalEditMode(false);
    setTitle("");
    setContent("");
  };

  const openEditModal = (index: number) => {
    setModalIsOpen(true);
    setModalEditMode(true);
    setModalMemoIndex(index);
    setTitle(memos[index].title);
    setContent(memos[index].content);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const addMemo = () => {
    if (title || content) {
      if (modalEditMode) {
        const updatedMemos = [...memos];
        updatedMemos[modalMemoIndex] = { title, content };
        setMemos(updatedMemos);
      } else {
        setMemos([...memos, { title, content }]);
      }
      setTitle("");
      setContent("");
    }
    closeModal();
  };

  const deletMemo = () => {
    if (modalEditMode) {
      const updatedMemos = [...memos];
      updatedMemos.splice(modalMemoIndex, 1);
      setMemos(updatedMemos);
      closeModal();
    }
  };

  return (
    <AppContainer>
      <Header />
      <MemoHeader>
        <Title>메모</Title>
        <AddButton onClick={openModal}>
          <AddIcon sx={{ width: 30, height: 30 }} />
        </AddButton>
      </MemoHeader>
      <Main>
        {memos.map((memo, index) => (
          <Memo key={index} onClick={() => openEditModal(index)}>
            <MemoTitle>{memo.title}</MemoTitle>
            <MemoContent>{memo.content}</MemoContent>
          </Memo>
        ))}
      </Main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={modalEditMode ? "메모 편집 모달" : "메모 추가 모달"}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            maxWidth: "70%",
            maxHeight: "70%",
            margin: "auto",
            border: "1px solid #0074e4",
            borderRadius: "12px",
          },
        }}
      >
        <ModalContainer>
          <ModalHeader>
            <Modaltitle
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ExitButton onClick={closeModal}>
              <CloseIcon sx={{ width: 30, height: 30 }} />
            </ExitButton>
          </ModalHeader>
          <ModalMain>
            <ModalContent
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalMain>
          <ModalFooter>
            <SaveButton onClick={addMemo}>
              {modalEditMode ? "수정" : "저장"}
            </SaveButton>
            <DeleteButton onClick={deletMemo}>삭제</DeleteButton>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemoHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #f9f9f9;
`;
const Title = styled.h1`
  margin: 0;
  padding: 23px 0px 18px 35px;
  color: #000000;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const AddButton = styled.div`
  padding: 15px 40px 16px 0;
  color: #000000;
`;

const Main = styled.main`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  place-items: center;
  background-color: #f9f9f9;
`;

const Memo = styled.div`
  width: 100%;
  max-width: 160px;
  height: 225px;
  border-radius: 12px;
  border: 1px solid #0074e4;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  background-color: #ffffff;
`;

const MemoTitle = styled.h3``;

const MemoContent = styled.p``;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
`;

const ExitButton = styled.div``;

const Modaltitle = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #0074e4;
  border-radius: 12px;
  width: 100%;
`;
const ModalMain = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 10px 0;
`;
const ModalContent = styled.textarea`
  padding: 10px;
  border: 1px solid #0074e4;
  border-radius: 12px;
  width: 100%;
  height: 100%;
`;

const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 30px 10px 10px 10px;
`;

const SaveButton = styled.button`
  border-radius: 12px;
  background-color: #0074e4;
  border: none;
  width: 63px;
  height: 35px;
`;

const DeleteButton = styled.button`
  border-radius: 12px;
  background-color: #0074e4;
  border: none;
  width: 63px;
  height: 35px;
`;

export default MemoPage;
