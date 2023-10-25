import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import CampaignIcon from "@mui/icons-material/Campaign";
import SchoolIcon from "@mui/icons-material/School";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Link } from "react-router-dom";

function Aside() {
  return (
    <AsideContainer>
      <AsideForm>
        <List to={"https://www.kyonggi.ac.kr/www/index.do"}>
          <HomeIcon sx={{ width: 48, height: 48 }} />
          <IconText>홈페이지</IconText>
        </List>
        <List
          to={
            "https://www.kyonggi.ac.kr/www/selectBbsNttList.do?key=7520&bbsNo=1073"
          }
        >
          <CampaignIcon sx={{ width: 48, height: 48 }} />
          <IconText>공지사항</IconText>
        </List>
        <List
          to={
            "https://www.kyonggi.ac.kr/www/selectTnSchafsSchdulListUS.do?key=5695&sc1=10"
          }
        >
          <SchoolIcon sx={{ width: 48, height: 48 }} />
          <IconText>학사공지</IconText>
        </List>
        <List
          to={
            "https://www.kyonggi.ac.kr/www/selectTnRstrntMenuListU.do?key=7138&sc1=30&"
          }
        >
          <LocalDiningIcon sx={{ width: 48, height: 48 }} />
          <IconText>식당메뉴</IconText>
        </List>
        <List to={"https://www.kyonggi.ac.kr/www/contents.do?key=5749"}>
          <DirectionsBusIcon sx={{ width: 48, height: 48 }} />
          <IconText>셔틀버스</IconText>
        </List>
      </AsideForm>
    </AsideContainer>
  );
}

export default Aside;

const AsideContainer = styled.aside`
  display: flex;
  width: 100%;
  height: 92px;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`;

const AsideForm = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 12px 26px;
  gap: 23px;
`;

const IconTextContainer = styled.div`
  display: flex;
  min-width: 54px;
  align-items: center;
  flex-direction: column;
`;

const List = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #000000;
  &:visited {
    color: #000000;
  }

  &:hover {
    color: #000000;
  }

  &:active {
    color: #000000;
  }
`;

const IconText = styled.p`
  color: #000;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -2px;
  margin: 0;
`;
