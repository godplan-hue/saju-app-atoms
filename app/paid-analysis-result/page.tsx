"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PaidAnalysisResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paidInfo, setPaidInfo] = useState<any>(null);
  const [packageName, setPackageName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // localStorage에서 정보 읽기
    const infoStr = localStorage.getItem("paidAnalysisInfo");
    const pkg = searchParams.get("package") || "베이직";

    if (infoStr) {
      setPaidInfo(JSON.parse(infoStr));
    }
    setPackageName(pkg);
  }, [searchParams]);

  // 더미 분석 데이터
  const getAnalysisData = () => {
    const name = paidInfo?.name || "사용자";
    const hasTime = paidInfo?.birthTime && paidInfo.birthTime !== "00:00";

    return {
      // 생시 필요 5개 (맨 앞에 표시)
      wealthLuck: `${name}님의 재물운은 매우 우호적입니다.\n투자와 사업에 좋은 운을 타고 있으며,\n올해는 경제적 성장이 예상됩니다.`,
      loveLuck: `${name}님의 연애운은 긍정적입니다.\n새로운 인연을 만날 가능성이 높으며,\n기존 관계는 더욱 돈독해질 것입니다.`,
      monthlyLuck: `1월: 새로운 시작의 달\n2월: 준비와 계획의 달\n3월: 실행과 실현의 달\n(매월 다양한 변화가 예상됩니다)`,
      yearlyLuck: `올해 운세는 매우 긍정적입니다.\n새로운 기회와 도전이 많을 것이며,\n성공의 가능성이 높습니다.`,
      couple: `궁합 분석 결과 매우 좋습니다.\n상호 존중과 이해가 바탕이 되어\n행복한 관계를 유지할 수 있습니다.`,

      // 생시 불필요 3개 (아래에 표시)
      nameAnalysis: `"${name}"은(는) 밝고 긍정적인 에너지를 가진 이름입니다.\n주변 사람들에게 좋은 영향을 미치며,\n친화력이 우수합니다.`,
      fullAnalysis: `당신의 사주는 매우 특별합니다.\n음양오행의 조화가 잘 이루어져 있으며,\n인생의 모든 분야에서 발전이 예상됩니다.`,
      healthLuck: `${name}님의 건강운은 안정적입니다.\n규칙적인 운동과 식단 관리로\n더욱 건강한 한 해를 보낼 수 있습니다.`,
    };
  };

  // 코스별로 보여줄 항목
  const getDisplayItems = () => {
    const data = getAnalysisData();
    const hasTime = paidInfo?.birthTime && paidInfo.birthTime !== "00:00";

    let items = [];

    // 생시 필요 5개 (항상 맨 앞에)
    if (hasTime) {
      items.push(
        { key: "wealthLuck", label: "💰 재물운", value: data.wealthLuck },
        { key: "loveLuck", label: "💕 연애운", value: data.loveLuck },
        { key: "monthlyLuck", label: "🌙 월별 운세", value: data.monthlyLuck },
        { key: "yearlyLuck", label: "⭐ 올해 운세", value: data.yearlyLuck }
      );

      // VIP만 궁합분석
      if (packageName === "VIP 커플팩") {
        items.push({
          key: "couple",
          label: "👫 궁합분석",
          value: data.couple,
        });
      }
    }

    // 생시 불필요 3개 (항상 포함)
    items.push(
      { key: "nameAnalysis", label: "🔮 이름분석", value: data.nameAnalysis },
      {
        key: "fullAnalysis",
        label: "💎 전체 사주분석",
        value: data.fullAnalysis,
      },
      { key: "healthLuck", label: "🌟 건강운", value: data.healthLuck }
    );

    return items;
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const pdfContent = document.createElement("div");
      pdfContent.style.width = "210mm";
      pdfContent.style.height = "297mm";
      pdfContent.style.padding = "20mm";
      pdfContent.style.background =
        "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)";
      pdfContent.style.fontFamily =
        "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";
      pdfContent.style.color = "#333";
      pdfContent.style.display = "flex";
      pdfContent.style.flexDirection = "column";
      pdfContent.style.justifyContent = "center";
      pdfContent.style.alignItems = "center";
      pdfContent.style.position = "absolute";
      pdfContent.style.left = "-9999px";

      const page1 = document.createElement("div");
      page1.style.width = "100%";
      page1.style.height = "100%";
      page1.style.display = "flex";
      page1.style.flexDirection = "column";
      page1.style.justifyContent = "center";
      page1.style.alignItems = "center";
      page1.style.textAlign = "center";
      page1.style.background = "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)";
      page1.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 20px; color: #1a1a1a;">🔮</div>
        <h1 style="font-size: 42px; font-weight: 900; margin-bottom: 10px; color: #1a1a1a;">점운</h1>
        <p style="font-size: 24px; font-weight: 700; margin-bottom: 40px; color: #333;">${paidInfo?.name || "사용자"}님의 사주 분석</p>
        <p style="font-size: 18px; font-weight: 700; color: #555;">${packageName} 패키지</p>
      `;
      pdfContent.appendChild(page1);
      document.body.appendChild(pdfContent);

      const canvas = await html2canvas(pdfContent, {
        scale: 2,
        backgroundColor: "#ffd700",
        logging: false,
      });

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);

      // 분석 결과 페이지 추가
      const items = getDisplayItems();
      for (let i = 0; i < items.length; i++) {
        pdf.addPage();
        const pageContent = document.createElement("div");
        pageContent.style.width = "210mm";
        pageContent.style.height = "297mm";
        pageContent.style.padding = "20mm";
        pageContent.style.background =
          "linear-gradient(135deg, #fff8dc 0%, #fffacd 100%)";
        pageContent.style.fontFamily =
          "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif";
        pageContent.style.color = "#333";
        pageContent.style.position = "absolute";
        pageContent.style.left = "-9999px";

        pageContent.innerHTML = `
          <h2 style="font-size: 24px; font-weight: 900; margin-bottom: 20px; color: #1a1a1a; border-bottom: 3px solid #ffd700; padding-bottom: 10px;">
            ${items[i].label}
          </h2>
          <p style="font-size: 14px; font-weight: 700; line-height: 1.8; color: #333; margin-bottom: 15px; white-space: pre-wrap;">
            ${items[i].value}
          </p>
          <p style="font-size: 12px; font-weight: 700; color: #888; text-align: right; margin-top: 40px;">
            점운 AI 사주 분석 | ${new Date().getFullYear()}년 ${new Date().getMonth() + 1}월
          </p>
        `;

        document.body.appendChild(pageContent);
        const pageCanvas = await html2canvas(pageContent, {
          scale: 2,
          backgroundColor: "#fffacd",
          logging: false,
        });

        const pageImgData = pageCanvas.toDataURL("image/png");
        pdf.addImage(pageImgData, "PNG", 0, 0, 210, 297);
        document.body.removeChild(pageContent);
      }

      pdf.save(`점운_${paidInfo?.name || "사용자"}_${packageName}_분석.pdf`);
      document.body.removeChild(pdfContent);
      alert("PDF가 다운로드되었습니다!");
    } catch (error) {
      alert("PDF 생성 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const displayItems = getDisplayItems();

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f0620 0%, #1a0f35 50%, #0a0420 100%)",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1711510778620-0f287fb5500f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
        fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.55)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "40px 16px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto", width: "100%" }}>
          {/* 제목 */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🔮</div>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 900,
                marginBottom: 12,
                color: "#fbbf24",
              }}
            >
              {paidInfo?.name || "사용자"}님의 사주 분석
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#f5f5f5",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {packageName} 패키지
            </p>
          </div>

          {/* 정보 박스 */}
          <div
            style={{
              background: "rgba(108,64,200,0.3)",
              padding: 20,
              borderRadius: 12,
              marginBottom: 24,
              border: "1px solid rgba(251,191,36,0.3)",
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "#fbbf24",
                fontWeight: 700,
                margin: "0 0 12px 0",
              }}
            >
              📅 생년월일: {paidInfo?.birthDate}
            </p>
            {paidInfo?.birthTime && paidInfo.birthTime !== "00:00" && (
              <p
                style={{
                  fontSize: 13,
                  color: "#fbbf24",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                🕐 태어난 시간: {paidInfo.birthTime}
              </p>
            )}
          </div>

          {/* 분석 결과 */}
          {displayItems.map((item, index) => (
            <div
              key={item.key}
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: 20,
                borderRadius: 12,
                marginBottom: 16,
                border: "1px solid rgba(251,191,36,0.2)",
              }}
            >
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: "#fbbf24",
                  margin: "0 0 12px 0",
                }}
              >
                {item.label}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#f5f5f5",
                  lineHeight: 1.8,
                  margin: 0,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {item.value}
              </p>
            </div>
          ))}

          {/* 버튼 그룹 */}
          <div style={{ marginTop: 32 }}>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              style={{
                width: "100%",
                padding: 14,
                background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                color: "black",
                border: "none",
                borderRadius: 10,
                fontWeight: 900,
                fontSize: 15,
                cursor: isGenerating ? "not-allowed" : "pointer",
                marginBottom: 12,
                opacity: isGenerating ? 0.6 : 1,
              }}
            >
              📥 {isGenerating ? "PDF 생성 중..." : "PDF 다운로드"}
            </button>

            <button
              onClick={() => router.push("/")}
              style={{
                width: "100%",
                padding: 14,
                background: "rgba(139,92,246,0.3)",
                color: "#f5f5f5",
                border: "1px solid rgba(139,92,246,0.8)",
                borderRadius: 10,
                fontWeight: 900,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              ← 홈으로
            </button>
          </div>

          {/* 정보 박스 */}
          <div
            style={{
              background: "#fff3cd",
              padding: "18px 16px",
              borderRadius: 8,
              marginTop: 28,
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#333",
                fontSize: "13px",
                fontWeight: 700,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              ✨ 분석 결과는 AI와
템플릿을 결합하여 생성되었습니다! 🔮
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}