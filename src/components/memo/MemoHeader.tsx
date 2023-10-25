import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Itemprops } from "../../types";

function MemoHeader(props: Itemprops) {
  const { openModal } = props;

  return (
    <Header>
      <Title>메모</Title>
      <AddButton onClick={openModal}>
        <AddIcon sx={{ width: 30, height: 30 }} />
      </AddButton>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  color: #ffffff;
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

export default MemoHeader;
