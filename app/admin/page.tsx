"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const name = localStorage.getItem("adminName");
    if (!name) {
      router.push("/admin/login");
      return;
    }
    setAdminName(name);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminName");
    router.push("/admin/login");
  };

  const menuItems = [
    { label: "📊 대시보드", href: "/admin", active: true },
    { label: "👥 파트너 관리", href: "/admin/partners" },
    { label: "🎟️ 할인코드", href: "/admin/discount-codes" },
    { label: "💰 정산 관리", href: "/admin/settlement" },
    { label: "⭐ TOP 판매자", href: "/admin/top-sales" },
  ];

  return (
    <>
      <Head>
        <title>어드민 대시보드 - 점운</title>
      </Head>

      <main
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
          fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
          display: "flex",
        }}
      >
        {/* 사이드바 */}
        <div
          style={{
            width: isMobile ? "0" : "250px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: isMobile ? "0" : "30px 20px",
            color: "white",
            display: isMobile ? "none" : "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: 900, marginTop: 0, marginBottom: "30px" }}>
            👑 점운
          </h1>

          <div style={{ flex: 1 }}>
            {menuItems.map((item) => (
              
                key={item.href}
                href={item.href}
                style={{
                  display: "block",
                  padding: "12px 15px",
                  marginBottom: "10px",
                  background: item.active ? "rgba(255,255,255,0.3)" : "transparent",
                  borderRadius: "8px",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: item.active ? 700 : 500,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "12px 15px",
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🚪 로그아웃
          </button>
        </div>

        {/* 메인 컨텐츠 */}
        <div style={{ flex: 1, padding: "30px" }}>
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ marginBottom: "30px" }}>
              <h1 style={{ fontSize: "32px", fontWeight: 900, margin: 0, marginBottom: "10px", color: "#333" }}>
                👑 어드민 대시보드
              </h1>
              <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                {adminName}님 환영합니다!
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: "20px",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  padding: "30px",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "10px" }}>파트너</div>
                <div style={{ fontSize: "36px", fontWeight: 900 }}>0</div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #f093fb, #f5576c)",
                  padding: "30px",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "10px" }}>이번달 매출</div>
                <div style={{ fontSize: "36px", fontWeight: 900 }}>₩0</div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                  padding: "30px",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                <div style={{ fontSize: "12px", opacity: 0.8, marginBottom: "10px" }}>분석 건수</div>
                <div style={{ fontSize: "36px", fontWeight: 900 }}>0</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}