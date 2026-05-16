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
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `다음 사람의 사주를 3페이지 분량으로 간단히 분석해주세요:

이름: ${name}
이메일: ${email}

분석 내용:
1. 기본 성격 분석 (긍정적 관점)
2. 올해 운세
3. 추천 운세 분석

간단하고 긍정적인 톤으로 작성해주세요.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Anthropic API 오류:", data);
      return NextResponse.json(
        { error: "분석 중 오류가 발생했습니다" },
        { status: response.status }
      );
    }

    const analysisText =
      data.content[0].type === "text"
        ? data.content[0].text
        : "분석 결과를 불러올 수 없습니다.";

    return NextResponse.json({ result: analysisText });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}