import styled from "styled-components";
import ReactModal from "react-modal";
import { Itemprops } from "../../types";

function MemoModal(props: Itemprops) {
  const {
    modalIsOpen,
    closeModal,
    title,
    content,
    setTitle,
    setContent,
    addMemo,
    modalEditMode,
    deletMemo,
  } = props;

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel={modalEditMode ? "메모 편집 모달" : "메모 추가 모달"}
    >
      <ModalContainer>
        <Modaltitle
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ModalContent
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ModalFooter>
          <SaveButton onClick={addMemo}>
            {modalEditMode ? "수정" : "저장"}
          </SaveButton>
          <ExitButton onClick={closeModal}>닫기</ExitButton>
          {modalEditMode && (
            <DeleteButton onClick={deletMemo}>삭제</DeleteButton>
          )}
        </ModalFooter>
      </ModalContainer>
    </ReactModal>
  );
}

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Modaltitle = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #0074e4;
  border-radius: 5px;
  width: 80%;
`;

const ModalContent = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #0074e4;
  border-radius: 5px;
  width: 80%;
  height: 60%;
`;

const ModalFooter = styled.div``;

const SaveButton = styled.button``;

const ExitButton = styled.button``;

const DeleteButton = styled.button``;

export default MemoModal;
