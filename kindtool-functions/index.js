const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 10 });

// 기본 라우트 예시
exports.helloWorld = onRequest((req, res) => {
  logger.info("Hello logs!", { structuredData: true });
  res.status(200).send(`
    <html>
      <head>
        <title>KindTool Functions Test</title>
      </head>
      <body>
        <h1>Firebase Functions 연결 성공!</h1>
        <p>이 페이지가 보이면 Functions가 정상적으로 작동 중입니다.</p>
      </body>
    </html>
  `);
});