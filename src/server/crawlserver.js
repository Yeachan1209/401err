const cheerio = require("cheerio");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const app = express();
const port = 4000;

app.use(cors());

// 이전 크롤링 결과를 저장하는 변수
let previousResults = [];

async function crawlPages() {
  const baseUrl =
    "https://www.inu.ac.kr/inu/1534/subview.do";
  const maxResults = 11; // 결과 개수
  const results = [];

  try {
    // 이전 크롤링 결과를 로드 (최초 실행 시 비어있음)
    const previousResultsFilePath = path.join(
      __dirname,
      "CrawlingDir",
      "previousResults.json"
    );
    if (fs.existsSync(previousResultsFilePath)) {
      previousResults = JSON.parse(fs.readFileSync(previousResultsFilePath));
    }

    for (let currentPage = 1; results.length < maxResults; currentPage++) {
      const url = `${baseUrl}&pageUnit=10&searchCnd=all&pageIndex=${currentPage}`;
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);

      // 원하는 요소를 선택하고 텍스트를 추출
      const elements = $("table tbody tr");

      if (elements.length === 0) {
        // 페이지에 더 이상 요소가 없는 경우 종료
        break;
      }

      elements.each((index, element) => {
        if (results.length < maxResults) {
          const elementData = {
            title: cleanText($(element).find("td.p-subject a").text()),
            link:
              "https://www.kyonggi.ac.kr/www/" +
              $(element).find("td.p-subject a").attr("href"),
            number: cleanText($(element).find("td:nth-child(1) span").text()),
            date: cleanText($(element).find("td:nth-child(7) time").text()),
          };

          // 새로운 공지사항인지 확인
          if (!isInPreviousResults(elementData)) {
            results.push(elementData);
          }
        }
      });
    }

    // 결과 데이터 JSON 파일로 저장
    const CrawlingDir = path.join(__dirname, "CrawlingDir");
    if (!fs.existsSync(CrawlingDir)) {
      fs.mkdirSync(CrawlingDir);
    }

    const filePath = path.join(CrawlingDir, "result.json");
    fs.writeFileSync(filePath, JSON.stringify(results, null, 2));

    // 현재 결과를 이전 결과로 설정
    previousResults = results;

    // 데이터를 브라우저에 출력
    app.get("/data", (req, res) => {
      res.json(results);
    });

    // 이전 결과를 파일로 저장
    fs.writeFileSync(
      previousResultsFilePath,
      JSON.stringify(previousResults, null, 2)
    );

    // 웹 서버 시작
    app.listen(port, () => {
      console.log(`웹 서버가 http://localhost:${port} 에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error("크롤링 중 오류 발생:", error);
  }
}

function cleanText(text) {
  return text.replace(/\n/g, "").replace(/\s+/g, " ").trim();
}

function isInPreviousResults(elementData) {
  // 새로운 공지사항인지 확인하는 함수
  return previousResults.some(
    (prevElement) => prevElement.link === elementData.link
  );
}
// 매 30분마다 크롤링 실행
cron.schedule("*/30 * * * *", () => {
  console.log("크롤링을 실행합니다.");
  crawlPages();
});

crawlPages();
