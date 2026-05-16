import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, birth, birthHour, gender } = await request.json();

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
        max_tokens: 2500,
        messages: [
          {
            role: "user",
            content: `이름: ${name}
생년월일: ${birth}
생시: ${birthHour}
성별: ${gender}

당신은 전문 사주 분석가입니다. 다음 6가지를 상세하게 작성하세요:

1. **이름 간단풀이**: ${name}의 이름 의미, 성격, 특징을 상세히 분석
2. **총운**: 전체 운의 흐름, 인생 패턴을 구체적으로 분석
3. **재물운**: 재물 흐름, 경제 운, 재정 관리 방법을 상세히 분석
4. **연애운**: 연애 패턴, 결혼 운, 가정 운을 구체적으로 분석
5. **건강운**: 건강 상태, 주의해야 할 질환, 건강 관리 방법을 상세히 분석
6. **직업운**: 적성, 추천 직업, 커리어 방향을 구체적으로 분석

각 섹션마다 상세하고 구체적인 내용을 담되, 긍정적인 톤으로 작성하세요.

다음 형식으로 반드시 작성하세요:
[이름 간단풀이]
내용

[총운]
내용

[재물운]
내용

[연애운]
내용

[건강운]
내용

[직업운]
내용`,
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

    let analysisText = "";
    
    if (data.content && Array.isArray(data.content) && data.content.length > 0) {
      const firstContent = data.content[0];
      if (firstContent.type === "text") {
        analysisText = firstContent.text;
      }
    }

    // 텍스트 파싱
    const parseSection = (text: string, section: string): string => {
      const regex = new RegExp(`\\[${section}\\]([^\\[]*?)(?=\\[|$)`, 's');
      const match = text.match(regex);
      if (match && match[1]) {
        return match[1].trim();
      }
      return "분석 완료";
    };

    const result = {
      name: parseSection(analysisText, "이름 간단풀이"),
      totalLuck: parseSection(analysisText, "총운"),
      wealthLuck: parseSection(analysisText, "재물운"),
      loveLuck: parseSection(analysisText, "연애운"),
      healthLuck: parseSection(analysisText, "건강운"),
      jobLuck: parseSection(analysisText, "직업운"),
    };

    return NextResponse.json({ result });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}