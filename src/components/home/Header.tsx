import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Sidebar from "./Headrcomponets/Sidebar";
import Alarm from "./Headrcomponets/Alram";
import MenuIcon from "@mui/icons-material/Menu";
import axios from 'axios';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const exit = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3002/logout');
      setUserEmail("");
      setUserNickname("");
      setIsLoggedIn(false);
      alert("로그아웃 되었습니다");
    } catch (error) {
      console.error('로그아웃 오류:', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/user');
        const userData = response.data;
        if (userData.email && userData.username) {
          setIsLoggedIn(true);
          setUserEmail(userData.email);
          setUserNickname(userData.username);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('사용자 정보 불러오기 오류:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <HeaderContainer>
      <MenuButton onClick={exit}><MenuIcon/></MenuButton>
      <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
        <HeaderText>우리 학교 알리미</HeaderText>
      </Link>
      <Alarm isSidebarOpen={isSidebarOpen} onLogout={handleLogout} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        ref={sidebarRef}
        userNickname={userNickname}
        userEmail={userEmail}
        onLogout={handleLogout}
        exit={exit}
      />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 56px;
  background: #0074e4;
  align-items: center;
  justify-content: space-between;
`;

const MenuButton = styled.div`
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 24px;
  cursor: pointer;
`;

const HeaderText = styled.h1`
  color: #fff;
  text-decoration: none;
`;

export default Header;
