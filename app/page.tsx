'use client';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <h1 className="text-4xl font-bold p-4">사주앱</h1>
      <p className="p-4 text-lg">당신의 운명을 분석합니다</p>
      <button className="bg-yellow-500 text-white px-6 py-3 m-4 rounded">
        지금 분석받기
      </button>
    </div>
  );
}
