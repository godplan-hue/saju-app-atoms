import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email } = await request.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API 키가 설정되지 않았습니다" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: `이름: ${name}

당신은 전문 사주 분석가입니다. 위 이름만으로도 상세한 사주 분석을 작성해야 합니다.

반드시 다음 내용을 포함해서 3페이지 분량으로 작성하세요:

**1. 성격 및 기질 분석 (한글 이름의 한자 의미 기반)**
- 이름 글자의 의미
- 성격의 강점
- 성격의 약점

**2. 2026년 운세**
- 전체 운세
- 월별 운세

**3. 오행 기반 분석**
- 재물운
- 결혼운
- 직업운
- 건강운

긍정적이고 희망적인 톤으로 작성하세요. 부정적인 내용은 피하세요.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      let errorMessage = "Claude API 오류";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || JSON.stringify(errorData);
      } catch (parseError) {
        const textError = await response.text();
        errorMessage = textError || response.statusText;
      }
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();

    let analysisText = "분석 결과를 불러올 수 없습니다.";
    
    if (data.content && Array.isArray(data.content) && data.content.length > 0) {
      const firstContent = data.content[0];
      if (firstContent.type === "text") {
        analysisText = firstContent.text;
      }
    }

    return NextResponse.json({ result: analysisText });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}