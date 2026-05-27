"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function PaidAnalysisResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [paidInfo, setPaidInfo] = useState<any>(null);
  const [packageName, setPackageName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const infoStr = sessionStorage.getItem("analysisResult");
    const pkg = searchParams.get("package") || "기본 분석";

    if (infoStr) {
      try {
        setPaidInfo(JSON.parse(infoStr));
      } catch (e) {
        console.error("Failed to parse:", e);
      }
    }
    setPackageName(pkg);
  }, [searchParams]);

  const getAnalysisData = () => {
    const name = paidInfo?.name || "분석 완료";

    return {
      nameAnalysis: paidInfo?.name || "분석 완료",
      wealthLuck: paidInfo?.wealthLuck || "분석 완료",
      loveLuck: paidInfo?.loveLuck || "분석 완료",
      yearlyLuck: paidInfo?.yearlyLuck || "분석 완료",
      monthlyLuck: paidInfo?.monthlyLuck || "분석 완료",
      healthLuck: paidInfo?.healthLuck || "분석 완료",
      couple: paidInfo?.couple || "분석 완료",
      fullAnalysis: paidInfo?.fullAnalysis || paidInfo?.analysis || "분석 완료",
    };
  };

  const getDisplayItems = () => {
    const data = getAnalysisData();
    let items = [];

    switch(packageName) {
      case "기본 분석":
        items.push(
          { key: "yearlyLuck", label: "☀️ 올해 운세", value: data.yearlyLuck },
          { key: "monthlyLuck", label: "🌙 월별 운세", value: data.monthlyLuck }
        );
        break;
      case "베이직":
        items.push(
          { key: "yearlyLuck", label: "☀️ 올해 운세", value: data.yearlyLuck },
          { key: "monthlyLuck", label: "🌙 월별 운세", value: data.monthlyLuck },
          { key: "wealthLuck", label: "💎 재물운", value: data.wealthLuck },
          { key: "loveLuck", label: "💕 연애운", value: data.loveLuck }
        );
        break;
      case "프리미엄":
        items.push(
          { key: "yearlyLuck", label: "☀️ 올해 운세", value: data.yearlyLuck },
          { key: "monthlyLuck", label: "🌙 월별 운세", value: data.monthlyLuck },
          { key: "wealthLuck", label: "💎 재물운", value: data.wealthLuck },
          { key: "loveLuck", label: "💕 연애운", value: data.loveLuck },
          { key: "healthLuck", label: "🌿 건강운", value: data.healthLuck }
        );
        break;
      case "VIP 커플팩":
        items.push(
          { key: "nameAnalysis", label: "📝 이름분석", value: data.nameAnalysis },
          { key: "wealthLuck", label: "💎 재물운", value: data.wealthLuck },
          { key: "loveLuck", label: "💕 연애운", value: data.loveLuck },
          { key: "healthLuck", label: "🌿 건강운", value: data.healthLuck },
          { key: "couple", label: "👫 궁합분석", value: data.couple },
          { key: "yearlyLuck", label: "☀️ 올해 운세", value: data.yearlyLuck },
          { key: "monthlyLuck", label: "🌙 월별 운세", value: data.monthlyLuck },
          { key: "fullAnalysis", label: "🎋 전체 사주분석", value: data.fullAnalysis }
        );
        break;
      default:
        items.push(
          { key: "yearlyLuck", label: "☀️ 올해 운세", value: data.yearlyLuck },
          { key: "monthlyLuck", label: "🌙 월별 운세", value: data.monthlyLuck }
        );
    }

    return items;
  };

  const handleDownload = async () => {
    if (!paidInfo) {
      alert("사용자 정보를 찾을 수 없습니다.");
      return;
    }

    setIsGenerating(true);

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      let htmlContent = `
        <div style="margin: 0; padding: 0;">
          <div style="width: 210mm; height: 297mm; background-color: #FFD700; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; box-sizing: border-box; padding: 40px; margin: 0; page-break-after: avoid;">
            <div style="font-size: 80px; margin-bottom: 30px;">🔮</div>
            <h1 style="font-size: 48px; font-weight: 900; margin: 0 0 50px 0; color: #1a1a1a;">점운</h1>
            <p style="font-size: 20px; font-weight: 700; margin: 0; color: #666;">${packageName} 패키지</p>
          </div>
      `;

      const items = getDisplayItems();
     
      items.forEach((item, index) => {
        htmlContent += `
          <div style="width: 210mm; height: 297mm; background-color: #FFD700; display: flex; flex-direction: column; justify-content: flex-start; padding: 30px; box-sizing: border-box; margin: 0;">
            <div style="width: 100%; background-color: #FFFACD; padding: 25px; border-radius: 8px; box-sizing: border-box;">
              <h2 style="font-size: 20px; font-weight: 900; border-bottom: 3px solid #FFD700; padding-bottom: 10px; margin: 0 0 15px 0; color: #1a1a1a;">${item.label}</h2>
              <p style="font-size: 13px; font-weight: 600; line-height: 1.8; color: #333; white-space: pre-wrap; margin: 0; word-break: break-word;">${item.value}</p>
              <p style="font-size: 9px; color: #999; text-align: right; margin-top: 10px;">점운 AI 사주 분석</p>
            </div>
          </div>
        `;
      });

      htmlContent += `
        <div style="width: 210mm; height: 297mm; background-color: #FFD700; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 30px; box-sizing: border-box; margin: 0; text-align: center;">
          <div style="width: 80%; background-color: #FFFACD; padding: 50px; border-radius: 8px; box-sizing: border-box;">
            <p style="font-size: 28px; font-weight: 900; color: #1a1a1a; margin: 0 0 20px 0;">감사합니다</p>
            <p style="font-size: 16px; font-weight: 700; color: #333; margin: 0 0 30px 0; line-height: 1.8;">
              귀하의 사주 분석을 위해 저희 서비스를 이용해주셔서<br/>
              진심으로 감사드립니다.
            </p>
            <p style="font-size: 13px; color: #666; margin: 0;">점운 AI 사주 분석</p>
          </div>
        </div>
      `;

      const element = document.createElement("div");
      element.innerHTML = htmlContent;
      element.style.margin = "0";
      element.style.padding = "0";

      const opt: any = {
        margin: 0,
        filename: `점운_${paidInfo.name}_${packageName}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#FFD700",
          allowTaint: true
        },
        jsPDF: {
          orientation: "p",
          unit: "mm",
          format: "a4",
          compress: false
        }
      };

      html2pdf()
        .set(opt)
        .from(element)
        .save();

      alert("PDF가 다운로드되었습니다!");
    } catch (error) {
      console.error("PDF 생성 에러:", error);
      alert("PDF 생성 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  const displayItems = getDisplayItems();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fffacd 0%, #ffffe0 100%)",
        color: "#333",
        fontFamily: "'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 70, marginBottom: 16, filter: "brightness(0.9)" }}>🔮</div>
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 36px)",
                fontWeight: 900,
                marginBottom: 30,
                color: "#1a1a1a",
                marginTop: 0,
              }}
            >
              점운
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "#555",
                fontWeight: 700,
                margin: 0,
                marginBottom: 30,
              }}
            >
              {packageName} 패키지
            </p>
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%)",
              padding: 20,
              borderRadius: 12,
              marginBottom: 24,
              border: "2px solid rgba(139,92,246,0.4)",
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: "#333",
                fontWeight: 700,
                margin: "0 0 8px 0",
              }}
            >
              📦 패키지: {packageName}
            </p>
            <p
              style={{
                fontSize: 13,
                color: "#333",
                fontWeight: 700,
                margin: 0,
              }}
            >
              ✨ {displayItems.length}개 운세 포함
            </p>
          </div>

          {displayItems.map((item) => (
            <div
              key={item.key}
              style={{
                background: "linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%)",
                padding: 20,
                borderRadius: 12,
                marginBottom: 16,
                border: "2px solid rgba(255,215,0,0.4)",
              }}
            >
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  color: "#1a1a1a",
                  margin: "0 0 12px 0",
                  borderBottom: "2px solid #ffd700",
                  paddingBottom: 8,
                }}
              >
                {item.label}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#333",
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

          <div style={{ marginTop: 32 }}>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              style={{
                width: "100%",
                padding: 14,
                background: "linear-gradient(135deg, #ff1493, #ff69b4)",
                color: "white",
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
                background: "linear-gradient(135deg, #fff9e6 0%, #fffbf0 100%)",
                color: "#333",
                border: "2px solid rgba(139,92,246,0.6)",
                borderRadius: 10,
                fontWeight: 900,
                fontSize: 15,
                cursor: "pointer",
              }}
            >
              ← 홈으로
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PaidAnalysisResult() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PaidAnalysisResultContent />
    </Suspense>
  );
}
