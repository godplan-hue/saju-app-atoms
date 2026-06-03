import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const adminId = request.headers.get("x-admin-id");

    if (!adminId) {
      return NextResponse.json(
        { error: "인증되지 않았습니다" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      partners: [
        {
          id: "partner1",
          name: "테스트파트너",
          email: "test@partner.com",
          tier: "실버",
          analysisCount: 0,
          revenue: 0,
        },
      ],
    });
  } catch (error) {
    console.error("Partners error:", error);
    return NextResponse.json(
      { error: "파트너 조회 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}