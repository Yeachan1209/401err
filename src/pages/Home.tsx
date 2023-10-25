import Header from "../components/home/Header";
import Main from "../components/home/Main";
import Aside from "../components/home/Aside";
import Footer from "../components/home/Footer";
import styled from "styled-components";
import ChatButton from "../components/home/Chatting/Chat";

function HomePage() {
  return (
    <Container>
      <Header />
      <Main />
      <Aside />
      <Footer />
      <ChatButton />
    </Container>
  );
}

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: f9f9f9;
`;

/*import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Express 웹 서버로부터 데이터 가져오기
    axios
      .get("http://localhost:4000/data") // Express 웹 서버 주소
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("데이터를 불러오는 중 에러 발생:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>데이터 출력 예제</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <p>제목: {item.span}</p>
            <p>링크: {item.link}</p>
            <p>시간: {item.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;*/
