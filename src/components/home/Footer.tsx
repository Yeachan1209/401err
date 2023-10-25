import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { Itemprops } from "../../types";

function Footer() {
  const numberOfFooterContents = 10;
  const createFooterContent = (index: Itemprops["index"]) => (
    <FooterContent key={index}></FooterContent>
  );
  return (
    <FooterContainer>
      <FooterForm>
        <FooterHeader>
          <FooterTitle>메모</FooterTitle>
          <AddButton>
            <AddIcon sx={{ width: 30, height: 30 }} />
          </AddButton>
        </FooterHeader>
        <FooterBody>
          {Array.from({ length: numberOfFooterContents }, (_, index) =>
            createFooterContent(index)
          )}
        </FooterBody>
      </FooterForm>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  background-color: #f9f9f9;
  padding: 16px 24px 36px 24px;
`;

const FooterForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 191px;
  border: 1px solid #0074e4;
  border-radius: 12px;
  background: #f9f9f9;
`;

const FooterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FooterTitle = styled.div`
  margin: 16px 0 10px 16px;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const AddButton = styled.div`
  width: 30px;
  height: 30px;
  margin: 8px 16px 8px 0;
  flex-shrink: 0;
`;

const FooterBody = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 145px;
  overflow: hidden;
  margin: 0 9px 0px 9px;
`;

const FooterContent = styled.div`
  min-width: 94px;
  min-height: 129px;
  margin: 0 7px 16px 7px;
  border: 1px solid #0074e4;
  border-radius: 12px;
  background: #ffffff;
`;
