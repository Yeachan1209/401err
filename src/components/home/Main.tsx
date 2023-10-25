import { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Link } from "react-router-dom";
import { Itemprops } from "../../types";

function Main() {
  const [data, setData] = useState<Itemprops[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/data/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      });
  }, []);
  
  return (
    <MainContainer>
      <MainContent>
        <MainHeader>
          <MainTitle>공지사항</MainTitle>
          <AddIcon sx={{ width: 30, height: 30, marginRight: "16px" }} />
        </MainHeader>
        {data.slice(0, 7).map((item, index) => (
          <SectionContents key={index}>
            <Line />
            <List to={item.link}>
              <SectionTitle>{item.title}</SectionTitle>
              <SectionDate>{item.date}</SectionDate>
            </List>
          </SectionContents>
        ))}
      </MainContent>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: #f9f9f9;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background: #ffffff;
  margin: 24px 24px 9px 24px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #0074e4;
  border-radius: 12px;
  background: f9f9f9;
`;

const MainHeader = styled.div`
  display: flex;
  width: 100%;
  min-height: 52px;
  align-items: center;
  justify-content: space-between;
`;

const MainTitle = styled.div`
  color: #000000;
  margin-left: 16px;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.5px;
`;

const SectionContents = styled.div`
  width: 100%;
  height: auto;
  min-height: 49px;
  flex-shrink: 0;
  background: #ffffff;
  color: #000000;
  display: block;
  justify-content: space-between;
  align-items: center;
`;

const List = styled(Link)`
  display: flex;
  justify-content: space-between;
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

const SectionTitle = styled.p`
  float: left;
  margin-left: 10px;
  height: 17px;
  line-height: 18px;
  font-size: 15px;
  letter-spacing: 0;
  margin-left: 16px;
`;

const SectionDate = styled.div`
  margin: 0;
  padding: 0;
  margin-right: 16px;
`;

const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid #d7d7d7;
`;
