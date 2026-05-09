'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaymentContent() {
  const params = useSearchParams();
  const name = params.get('name');
  const price = params.get('pages');

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-black text-amber-400 text-center mb-8">결제하기</h1>
        <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-8">
          <p className="text-gray-400 mb-2">고객명</p>
          <p className="text-white text-lg font-bold mb-6">{name || '-'}</p>
          <p className="text-gray-400 mb-2">페이지</p>
          <p className="text-amber-400 text-2xl font-black mb-8">{price || '-'}페이지</p>
          <button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-black py-4 rounded-lg font-black text-lg hover:shadow-lg hover:shadow-amber-500/50 transition">결제 진행</button>
        </div>
      </div>
    </main>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <PaymentContent />
    </Suspense>
  );
}