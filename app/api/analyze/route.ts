import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, birth, birthHour, gender, planType } = await request.json();

    console.log("분석 요청:", { name, email, birth, planType });

    const result = {
      name: getNameTemplate(name),
      wealthLuck: getWealthTemplate(birth),
      loveLuck: getLoveTemplate(birth),
      healthLuck: getHealthTemplate(birth),
      couple: getCoupleTemplate(birth),
      yearlyLuck: getYearlyTemplate(birth),
      monthlyLuck: getMonthlyTemplate(birth),
      fullAnalysis: getFullTemplate(birth),
    };

    console.log("분석 완료:", result);

    return NextResponse.json({ result });
  } catch (error) {
    console.error("분석 오류:", error);
    return NextResponse.json(
      { error: "분석 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

function getNameTemplate(name: string): string {
  return `${name}님의 이름 분석입니다.\n\n각 글자의 음운을 분석한 결과 매우 긍정적인 에너지를 가지고 있습니다.\n\n귀하의 인생 기운 중 가장 강한 특징은 리더십입니다.\n\n당신의 이름은 좋은 인생을 가져올 것입니다.`;
}

function getWealthTemplate(birth: string): string {
  const year = parseInt(birth.split("-")[0]);
  
  if (year >= 1970 && year < 1980) {
    return `당신의 재운은 중년 이후에 큰 발전을 가져올 것입니다.\n\n지금까지의 노력이 결실을 맺을 시기가 다가오고 있습니다.\n\n30대 후반부터 재운이 크게 상승합니다.\n\n꾸준한 노력으로 좋은 미래를 기대할 수 있습니다.`;
  } else if (year >= 1980 && year < 1990) {
    return `당신의 재운은 현재 좋은 시기를 맞이하고 있습니다.\n\n스트레스 관리가 재운 향상의 핵심입니다.\n\n차분한 태도로 일을 추진하면 성공할 수 있습니다.\n\n긍정적인 마음가짐으로 부의 문을 열 수 있습니다.`;
  } else if (year >= 1990 && year < 2000) {
    return `당신의 재운은 처음부터 매우 좋습니다.\n\n이른 나이의 사업 성공이 가능한 시기입니다.\n\n창의성을 인한 돈버는 방법으로 재운이 상승합니다.\n\n전문성을 기르면 더 큰 성공이 올 것입니다.`;
  } else {
    return `당신의 재운은 창의성을 인한 재운 관리가 필요합니다.\n\n세로운 사업이나 아이디어로 성공 가능합니다.\n\n전문성을 기른 분야에서 좋은 결과를 얻을 것입니다.\n\n긍정적인 태도가 부의 길을 밝혀줄 것입니다.`;
  }
}

function getLoveTemplate(birth: string): string {
  const month = parseInt(birth.split("-")[1]);
  
  if (month >= 1 && month <= 3) {
    return `당신의 애정운은 진지함과 책임감으로 이루어집니다.\n\n진심 어린 마음이 상대방의 마음을 움직입니다.\n\n한 번의 마음으로 오래갈 사랑을 이룹니다.\n\n배우자와의 신뢰가 좋은 결과를 가져올 것입니다.`;
  } else if (month >= 4 && month <= 6) {
    return `당신의 애정운은 따뜻함과 사려로 이루어집니다.\n\n많은 사람들에게서 호감을 받는 매력이 있습니다.\n\n현명함이 이루고 복잡한 관계를 잘 다룹니다.\n\n강렬하게 다가올 상대를 찾을 것입니다.`;
  } else if (month >= 7 && month <= 9) {
    return `당신의 애정운은 처음부터 긍정적입니다.\n\n이번 만남이 인생의 중요한 순간이 될 것입니다.\n\n깔끔함과 진심이 관계를 잘 만듭니다.\n\n소박한 행복 속에서 오래갈 사랑을 이룬다.`;
  } else {
    return `당신의 애정운은 깊숨함과 인내가 필요합니다.\n\n세로운 시간이 지남에 따라 좋은 만남이 찾아옵니다.\n\n태도를 지키는 관계의 중요함을 깨달을 것입니다.\n\n어려운 순간에 곁에 있을 상대를 만날 것입니다.`;
  }
}

function getHealthTemplate(birth: string): string {
  const year = parseInt(birth.split("-")[0]);
  
  if (year >= 1970 && year < 1980) {
    return `당신의 건강운은 중년 이후로 유의하셔야 합니다.\n\n규칙적인 생활로 건강을 잘 유지해야 합니다.\n\n지난해 이후 건강검진이 중요합니다.\n\n꾸준한 운동으로 수명을 늘릴 수 있습니다.`;
  } else if (year >= 1980 && year < 1990) {
    return `당신의 건강운은 강인한 체질을 타고났습니다.\n\n스트레스 관리가 건강의 관건입니다.\n\n특별한 질환이 없으면 건강할 수 있습니다.\n\n건강한 일상 습관이 수명을 결정합니다.`;
  } else if (year >= 1990 && year < 2000) {
    return `당신의 건강운은 매우 좋습니다.\n\n태도로운 생활이 건강을 지켜줄 것입니다.\n\n긍정적인 마음가짐이 건강의 핵심입니다.\n\n규칙적인 운동으로 좋은 건강을 유지한다.`;
  } else {
    return `당신의 건강운은 체질 관리가 필요합니다.\n\n좋은 생활 습관으로 건강을 지켜야 합니다.\n\n마음의 안정이 신체 건강을 결정합니다.\n\n긍정적인 생각이 건강을 지켜줄 것입니다.`;
  }
}

function getCoupleTemplate(birth: string): string {
  const year = parseInt(birth.split("-")[0]);
  const animalYear = (year - 1900) % 12;
  const animals = ["쥐", "소", "호랑이", "토끼", "뱀", "말", "양", "원숭이", "닭", "개", "돼지", ""];
  const currentAnimal = animals[animalYear];
  
  return `${currentAnimal}띠인 당신과 잘 맞는 짝은 좋은 결합입니다.\n\n상호 보완적인 관계가 오래갈 수 있습니다.\n\n마음을 나누는 대화가 중요합니다.\n\n함께 성장하는 부부가 될 것입니다.`;
}

function getYearlyTemplate(birth: string): string {
  const year = birth.split("-")[0];
  const templates: { [key: string]: string } = {
    "197": `${year}년생 당신께 올해는 새로운 변화의 시기입니다.\n\n이번 해는 정성과 노력이 중요합니다.\n\n변화에 두려워하지 마세요.\n\n이해가 개선되는 좋은 결과를 기대합니다.`,
    "198": `${year}년생 당신께 올해는 긍정과 전진의 시기입니다.\n\n기회를 잘 활용하면 좋은 성과를 얻습니다.\n\n여러 분야에서 활약할 시기입니다.\n\n좋은 결과와 금전 운을 기대합니다.`,
    "199": `${year}년생 당신께 올해는 안정과 성장의 시기입니다.\n\n전문성 강화가 중요합니다.\n\n좋은 운이 찾아올 것입니다.\n\n긍정적인 마음가짐으로 도움을 받을 것입니다.`,
    "200": `${year}년생 당신께 올해는 꼭짓점과 변화입니다.\n\n새로움을 추구하며 나아갑니다.\n\n도전의 시기가 오고 있습니다.\n\n이번 해는 도움을 받을 수 있는 좋은 해입니다.`,
  };

  for (const [key, value] of Object.entries(templates)) {
    if (year.startsWith(key)) {
      return value;
    }
  }
  
  return `올해는 안정과 변화의 시기입니다.\n\n긍정적인 마음으로 변화를 맞이하세요.\n\n좋은 운이 찾아올 것입니다.\n\n당신의 도움과 노력이 중요합니다.`;
}

function getMonthlyTemplate(birth: string): string {
  const month = parseInt(birth.split("-")[1]);
  const monthNames = ["", "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const monthTexts: { [key: number]: string } = {
    1: `${monthNames[month]}은 새로움의 시기입니다.\n\n좋은 기회가 찾아올 것입니다.\n\n계획 세우기에 좋은 시기입니다.\n\n긍정적인 변화가 시작될 것입니다.`,
    2: `${monthNames[month]}은 관계의 중요성입니다.\n\n주변 사람들과의 좋은 만남이 도움이 됩니다.\n\n이번 달은 여러 연결고리가 중요합니다.\n\n따뜻함과 정성이 운을 부릅니다.`,
    3: `${monthNames[month]}은 전진의 시기입니다.\n\n이번 달은 새로운 시작이 중요합니다.\n\n처음부터 좋은 결과를 얻을 것입니다.\n\n좋은 결과가 나타날 것입니다.`,
    4: `${monthNames[month]}은 현실화의 시기입니다.\n\n기초를 다지기에 좋은 시기입니다.\n\n차분함이 마음을 안정시킵니다.\n\n좋은 결과가 현실화될 것입니다.`,
    5: `${monthNames[month]}은 변화의 시기입니다.\n\n긍정적인 변화가 가득합니다.\n\n이번 달은 좋은 운이 찾아올 것입니다.\n\n성실함과 태도가 중요합니다.`,
    6: `${monthNames[month]}은 안정의 시기입니다.\n\n처음부터 좋은 기초를 마련하세요.\n\n차분함이 마음을 안정시킵니다.\n\n이번 달은 변화를 받아들이세요.`,
    7: `${monthNames[month]}은 변화의 시기입니다.\n\n이번 달은 새로운 시작이 중요합니다.\n\n창의적인 생각이 도움이 됩니다.\n\n좋은 운이 찾아올 것입니다.`,
    8: `${monthNames[month]}은 긍정의 시기입니다.\n\n여러 분야에서 좋은 기회가 옵니다.\n\n새로운 경험을 가져보세요.\n\n변화의 물결을 받아들이세요.`,
    9: `${monthNames[month]}은 정리의 시기입니다.\n\n복잡한 일들을 정리해보세요.\n\n처음부터 다시 시작할 수 있습니다.\n\n좋은 마음과 행동이 중요합니다.`,
    10: `${monthNames[month]}은 확실함의 시기입니다.\n\n지난 달의 결과가 나타나는 시기입니다.\n\n긍정적인 변화가 계속될 것입니다.\n\n좋은 결과를 기대할 수 있습니다.`,
    11: `${monthNames[month]}은 준비의 시기입니다.\n\n다음을 위한 준비를 하세요.\n\n차분함이 마음을 안정시킵니다.\n\n이번 달은 전진할 수 있습니다.`,
    12: `${monthNames[month]}은 마무리의 시기입니다.\n\n한 해를 정리하는 시간을 가져보세요.\n\n감사함으로 마음을 채우세요.\n\n내년에는 더 큰 성공이 올 것입니다.`,
  };

  return monthTexts[month] || `이번 달은 안정과 진행의 시기입니다.\n\n긍정적인 태도로 이 달을 보내세요.\n\n좋은 결과를 기대할 수 있습니다.\n\n당신의 노력이 보상받을 것입니다.`;
}

function getFullTemplate(birth: string): string {
  const [year, month, day] = birth.split("-");
  return `${year}년 ${month}월 ${day}일생 당신의 전체 사주 분석입니다.\n\n당신은 고뇌하는 강인한 성격을 가지고 있습니다.\n\n인생 전체 흐름에 따라 나아가는 것이 중요합니다.\n\n당신의 강점을 살려서 더 나은 미래를 만들어 나가세요.`;
}
