import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { readFileSync } from "fs";
import { join } from "path";

// Firebase Admin 초기화
admin.initializeApp();
const db = admin.firestore();

const app = express();

// 보안 미들웨어
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: [
        "'self'",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "https://pagead2.googlesyndication.com",
        "https://partner.googleadservices.com",
        "https://tpc.googlesyndication.com",
        "https://googleads.g.doubleclick.net"
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https:",
        "https://www.google-analytics.com",
        "https://pagead2.googlesyndication.com",
        "https://googleads.g.doubleclick.net"
      ],
      connectSrc: [
        "'self'",
        "https://www.google-analytics.com",
        "https://analytics.google.com"
      ],
      frameSrc: [
        "https://googleads.g.doubleclick.net",
        "https://tpc.googlesyndication.com"
      ]
    }
  }
}));

app.use(cors({ origin: true }));
app.use(express.json());

// 방문자 추적 미들웨어
app.use((req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const userAgent = req.headers['user-agent'];
  const page = req.path;
  
  // 정적 파일과 API 요청은 제외
  if (!page.startsWith('/api') && !page.includes('.')) {
    recordVisit(String(ip), userAgent, page).catch(console.error);
  }
  
  next();
});

// 방문자 기록 함수
async function recordVisit(ip: string, userAgent?: string, page: string = "/"): Promise<void> {
  try {
    await db.collection('visitors').add({
      ip,
      userAgent,
      page,
      visitedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Error recording visit:', error);
  }
}

// 오늘 방문자 수 조회
async function getTodayVisitorCount(): Promise<number> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const snapshot = await db.collection('visitors')
      .where('visitedAt', '>=', admin.firestore.Timestamp.fromDate(today))
      .get();
    
    // IP별로 중복 제거
    const uniqueIPs = new Set();
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.ip) {
        uniqueIPs.add(data.ip);
      }
    });
    
    return uniqueIPs.size;
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return 0;
  }
}

// API 라우트들
app.get("/api/stats/visitors/today", async (req, res) => {
  try {
    const count = await getTodayVisitorCount();
    res.json({ count });
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    res.status(500).json({ error: "Failed to fetch visitor count" });
  }
});

// 문의사항 API
app.get("/api/inquiries", async (req, res) => {
  try {
    const { authorKey } = req.query;
    
    let query = db.collection('inquiries').orderBy('createdAt', 'desc');
    
    if (authorKey) {
      query = query.where('authorKey', '==', authorKey);
    } else {
      // 공개 문의사항만 조회
      query = query.where('isPrivate', '==', false);
    }
    
    const snapshot = await query.get();
    const inquiries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString()
    }));
    
    res.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

app.get("/api/inquiries/all", async (req, res) => {
  try {
    // 관리자 전용 - 모든 문의사항 조회
    const snapshot = await db.collection('inquiries')
      .orderBy('createdAt', 'desc')
      .get();
    
    const inquiries = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString()
    }));
    
    res.json(inquiries);
  } catch (error) {
    console.error("Error fetching all inquiries:", error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

app.post("/api/inquiries", async (req, res) => {
  try {
    const inquiry = {
      ...req.body,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('inquiries').add(inquiry);
    const doc = await docRef.get();
    
    res.json({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate().toISOString()
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({ error: "Failed to create inquiry" });
  }
});

app.delete("/api/inquiries/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('inquiries').doc(id).delete();
    res.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({ error: "Failed to delete inquiry" });
  }
});

// 답글 API
app.get("/api/inquiries/:id/replies", async (req, res) => {
  try {
    const { id } = req.params;
    const snapshot = await db.collection('replies')
      .where('inquiryId', '==', id)
      .orderBy('createdAt', 'asc')
      .get();
    
    const replies = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString()
    }));
    
    res.json(replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ error: "Failed to fetch replies" });
  }
});

app.post("/api/inquiries/:id/replies", async (req, res) => {
  try {
    const { id } = req.params;
    const reply = {
      ...req.body,
      inquiryId: id,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('replies').add(reply);
    const doc = await docRef.get();
    
    res.json({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data()?.createdAt?.toDate().toISOString()
    });
  } catch (error) {
    console.error("Error creating reply:", error);
    res.status(500).json({ error: "Failed to create reply" });
  }
});

// 헤더 스크립트 API
app.get("/kindtool-header.js", (req, res) => {
  try {
    const headerScript = readFileSync(join(__dirname, 'kindtool-header.js'), 'utf-8');
    res.setHeader('Content-Type', 'application/javascript');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.send(headerScript);
  } catch (error) {
    console.error("Error serving header script:", error);
    res.status(404).json({ error: "Header script not found" });
  }
});

// 404 핸들러
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Firebase Functions로 내보내기
export const api = functions.https.onRequest(app);