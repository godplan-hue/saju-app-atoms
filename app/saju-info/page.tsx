'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SajuInfo() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const categories = [
    {
      id: 'yinyang',
      title: '음양오행',
      icon: '☯️',
      items: [
        { id: 'yin', name: '음(陰)', desc: '밤, 겨울, 북쪽, 여성, 안정, 보수, 내향성을 상징합니다.' },
        { id: 'yang', name: '양(陽)', desc: '낮, 여름, 남쪽, 남성, 적극, 진보, 외향성을 상징합니다.' },
        { id: 'wood', name: '목(木)', desc: '성장, 발전, 창의성, 정의감, 참을성을 상징합니다.' },
        { id: 'fire', name: '화(火)', desc: '열정, 외향성, 지혜, 예술성, 표현력을 상징합니다.' },
        { id: 'earth', name: '토(土)', desc: '안정, 신뢰, 현실성, 포용력, 신중함을 상징합니다.' },
        { id: 'metal', name: '금(金)', desc: '정의, 결단력, 질서, 엄격함, 독립심을 상징합니다.' },
        { id: 'water', name: '수(水)', desc: '지혜, 유연성, 신비성, 내성, 수성을 상징합니다.' }
      ]
    },
    {
      id: 'jeong',
      title: '십성',
      icon: '🎯',
      items: [
        { id: 'jae', name: '재성(財星)', desc: '재물운을 나타내는 별입니다. 물질적 풍요와 재운을 관장합니다.' },
        { id: 'gwon', name: '권성(權星)', desc: '권력과 지위를 나타내는 별입니다. 리더십과 영향력을 관장합니다.' },
        { id: 'yeon', name: '연성(緣星)', desc: '인연과 관계운을 나타내는 별입니다. 대인관계를 관장합니다.' },
        { id: 'yul', name: '율성(律星)', desc: '학문과 지식을 나타내는 별입니다. 지적 능력을 관장합니다.' },
        { id: 'gwang', name: '광성(光星)', desc: '명예와 성공을 나타내는 별입니다. 사회적 지위를 관장합니다.' },
        { id: 'sa', name: '사성(邪星)', desc: '도전과 변화를 나타내는 별입니다. 혁신과 전환을 관장합니다.' },
        { id: 'ha', name: '해성(害星)', desc: '극복과 성장을 나타내는 별입니다. 시련과 성장을 관장합니다.' }
      ]
    },
    {
      id: 'sang',
      title: '상성(십간십이지)',
      icon: '💑',
      items: [
        { id: 'rat', name: '자(鼠)', desc: '지혜롭고 다재다능한 성향을 가지고 있습니다. 민첩하고 영리합니다.' },
        { id: 'ox', name: '축(丑)', desc: '성실하고 책임감이 강한 성향을 가지고 있습니다. 꾸준하고 신뢰할 수 있습니다.' },
        { id: 'tiger', name: '인(寅)', desc: '용감하고 정의감이 강한 성향을 가지고 있습니다. 에너지가 넘칩니다.' },
        { id: 'rabbit', name: '묘(卯)', desc: '온화하고 세심한 성향을 가지고 있습니다. 예술적 감각이 뛰어납니다.' },
        { id: 'dragon', name: '진(辰)', desc: '자신감 있고 야망이 큰 성향을 가지고 있습니다. 리더십이 뛰어납니다.' },
        { id: 'snake', name: '사(巳)', desc: '신비로우며 지혜로운 성향을 가지고 있습니다. 통찰력이 뛰어납니다.' },
        { id: 'horse', name: '오(午)', desc: '활발하고 열정적인 성향을 가지고 있습니다. 행동력이 뛰어납니다.' },
        { id: 'goat', name: '미(未)', desc: '온화하고 감정이 풍부한 성향을 가지고 있습니다. 감성적입니다.' },
        { id: 'monkey', name: '신(申)', desc: '똑똑하고 재치 있는 성향을 가지고 있습니다. 창의력이 뛰어납니다.' },
        { id: 'rooster', name: '유(酉)', desc: '진실하고 정직한 성향을 가지고 있습니다. 원칙적입니다.' },
        { id: 'dog', name: '술(戌)', desc: '충직하고 의리 있는 성향을 가지고 있습니다. 신의가 있습니다.' },
        { id: 'pig', name: '해(亥)', desc: '순박하고 진실한 성향을 가지고 있습니다. 따뜻하고 친절합니다.' }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* 배경 별 효과 */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute w-1 h-1 bg-white rounded-full top-10 left-20 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-40 left-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-1 h-1 bg-white rounded-full top-60 right-40 animate-pulse" style={{animationDelay: '0.3s'}}></div>
      </div>

      {/* 헤더 */}
      <header className="relative z-40 flex justify-between items-center px-8 py-6 border-b border-amber-900/30">
        <h1 className="text-2xl font-black text-amber-500">⭐ 점운</h1>
        <Link href="/" className="bg-amber-500 text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-amber-400 transition">← 돌아가기</Link>
      </header>

      {/* 히어로 섹션 */}
      <section className="relative z-20 text-center py-16 px-4 border-b border-amber-900/30">
        <div className="text-6xl mb-6">🔮</div>
        <h2 className="text-4xl font-black text-amber-300 mb-4">사주를 이해하는 핵심 개념</h2>
        <p className="text-gray-400">사주의 기본을 알아보세요</p>
      </section>

      {/* 카테고리별 아코디언 */}
      <section className="relative z-20 max-w-4xl mx-auto px-4 py-20">
        {categories.map(category => (
          <div key={category.id} className="mb-24">
            <h3 className="text-3xl font-black text-amber-400 text-center mb-12">
              {category.icon} {category.title}
            </h3>
            
            <div className="space-y-2">
              {category.items.map(item => (
                <div 
                  key={item.id} 
                  className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-700/30 rounded-lg overflow-hidden"
                >
                  <button 
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    className="w-full flex justify-between items-center p-4 hover:bg-purple-900/30 transition font-bold"
                  >
                    <span className="text-white">{item.name}</span>
                    <span className="text-amber-400 text-lg">
                      {expandedItem === item.id ? '▼' : '▶'}
                    </span>
                  </button>
                  
                  {expandedItem === item.id && (
                    <div className="bg-purple-900/10 border-t border-purple-700/30 p-4">
                      <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center mt-20">
          <Link 
            href="/analyze" 
            className="inline-block bg-gradient-to-r from-amber-500 to-amber-400 text-black px-12 py-4 rounded-full font-black text-lg hover:shadow-lg hover:shadow-amber-500/50 transition"
          >
            ✨ 지금 바로 분석하기
          </Link>
        </div>
      </section>
    </main>
  );
}