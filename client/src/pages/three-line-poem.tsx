import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ClayFooter } from "@/components/clay-footer";

export default function ThreeLinePoem() {
  const [name, setName] = useState("");
  const [poem, setPoem] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // 삼행시 템플릿 모음
  const poemTemplates = {
    // 감성적인 템플릿들
    emotional: [
      {
        patterns: [
          "{char}밤하늘 별빛처럼 반짝이는",
          "{char}리듬에 맞춰 춤추는 우리의",
          "{char}든 순간이 소중한 추억이 되길"
        ]
      },
      {
        patterns: [
          "{char}은 아침 해처럼 밝은",
          "{char}소로 세상을 따뜻하게 만드는",
          "{char}말 멋진 사람이야"
        ]
      },
      {
        patterns: [
          "{char}기 좋은 오늘같은 날에",
          "{char}구와 함께 나누는 행복이",
          "{char}상 계속되길 바라요"
        ]
      },
      {
        patterns: [
          "{char}온한 미소로 인사하며",
          "{char}혜롭고 배려 깊은 마음으로",
          "{char}상 곁에 있어주는 고마운 사람"
        ]
      },
      {
        patterns: [
          "{char}봄꽃처럼 아름다운 마음과",
          "{char}실한 우정을 나누는 친구",
          "{char}치 않은 소중한 인연이야"
        ]
      }
    ],
    // 재미있는 템플릿들
    funny: [
      {
        patterns: [
          "{char}밥을 먹다가 깜짝 놀랐다",
          "{char}에서 나온 반찬이 너무 맛있어서",
          "{char}요일까지 계속 먹고 싶어졌다"
        ]
      },
      {
        patterns: [
          "{char}치찌개 끓는 냄새에",
          "{char}감하게 반응하는 우리집 고양이",
          "{char}요일 저녁이 이렇게 평화롭다니"
        ]
      },
      {
        patterns: [
          "{char}어서 일어나라고 알람이 울렸지만",
          "{char}간만 더 자고 싶어서",
          "{char}업 없이 지각했다"
        ]
      },
      {
        patterns: [
          "{char}러운 친구가 갑자기 나타나서",
          "{char}지 놀라며 인사를 했더니",
          "{char}말 반가웠어요 라고 했다"
        ]
      },
      {
        patterns: [
          "{char}피 한 잔 마시려다가",
          "{char}옆에 있던 케이크를 발견했고",
          "{char}과 함께 달콤한 오후를 보냈다"
        ]
      }
    ],
    // 일상적인 템플릿들
    daily: [
      {
        patterns: [
          "{char}늘 바쁜 일상 속에서도",
          "{char}운 친구들과 함께하는 시간이",
          "{char}상 소중하고 감사해"
        ]
      },
      {
        patterns: [
          "{char}근 커피 한 잔의 여유로",
          "{char}작한 하루를 시작하며",
          "{char}심히 살아가는 오늘"
        ]
      },
      {
        patterns: [
          "{char}저히 걸어가는 산책길에서",
          "{char}연히 마주친 예쁜 꽃처럼",
          "{char}순간이 참 아름다워"
        ]
      },
      {
        patterns: [
          "{char}단하고 맛있는 점심을 먹고",
          "{char}후의 달콤한 디저트까지",
          "{char}렇게 행복한 하루를 보냈다"
        ]
      },
      {
        patterns: [
          "{char}업 때문에 늦게 일어났지만",
          "{char}장 좋은 날씨에 기분이 업",
          "{char}늘도 열심히 살아보자"
        ]
      }
    ],
    // 귀여운 템플릿들
    cute: [
      {
        patterns: [
          "{char}작한 고양이가 야옹야옹",
          "{char}리 귀여운 소리를 내며",
          "{char}구를 좋아한다고 말하는 듯해"
        ]
      },
      {
        patterns: [
          "{char}무개를 쓰고 비 맞으며",
          "{char}덩쿵 물장구를 치다가",
          "{char}깜짝 넘어져서 웃었다"
        ]
      },
      {
        patterns: [
          "{char}콜릿처럼 달콤한 웃음과",
          "{char}지상 최고의 귀여움으로",
          "{char}구에게나 사랑받는 매력쟁이"
        ]
      }
    ]
  };

  const generatePoem = async () => {
    if (!name.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const nameChars = name.split("").slice(0, 3); // 최대 3글자만 사용

      // 랜덤하게 템플릿 선택
      const categories = Object.keys(poemTemplates);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const templates = poemTemplates[randomCategory as keyof typeof poemTemplates];
      const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

      // 입력된 글자 수에 맞춰 삼행시 생성 (1~3글자)
      const wordLength = nameChars.length;
      const generatedPoem = [];

      for (let i = 0; i < wordLength; i++) {
        const char = nameChars[i];
        const pattern = selectedTemplate.patterns[i];
        if (pattern) {
          generatedPoem.push(pattern.replace("{char}", char));
        }
      }

      setPoem(generatedPoem);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="clay-gradient min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/">
            <Button variant="outline" className="clay-button clay-text">
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-black clay-text mb-4">
            행시 만들기
          </h1>
          <p className="text-lg md:text-xl clay-text opacity-80 font-medium">
            재미있는 행시를 만들어보세요!
          </p>
        </motion.header>

        {/* Main Content */}
        <motion.div 
          className="grid gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card className="clay-button border-0">
            <CardHeader>
              <CardTitle className="clay-text text-2xl md:text-3xl text-center">
                행시 생성기
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <label className="clay-text font-medium">
                  단어를 입력하세요 (1~3글자)
                </label>
                <p className="clay-text text-sm opacity-70">
                  입력한 글자 수만큼 행시가 만들어져요! 이름, 사물, 감정 등 어떤 단어든 가능해요.
                </p>
                <Input
                  placeholder="예: 사랑(2글자), 커피(2글자), 김철수(3글자)"
                  value={name}
                  onChange={(e) => setName(e.target.value.slice(0, 3))}
                  className="text-lg p-4"
                />
              </div>

              <Button 
                onClick={() => window.open('https://threelinepoem.replit.app', '_blank')}
                className="w-full h-12 clay-button clay-text text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                행시 만들기
              </Button>
            </CardContent>
          </Card>

          {poem.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="clay-button border-0">
                <CardHeader>
                  <CardTitle className="clay-text text-xl text-center">
                    🎉 완성된 {poem.length}행시
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-center">
                    {poem.map((line, index) => (
                      <motion.p 
                        key={index}
                        className="clay-text text-lg font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.5 }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-4 justify-center">
                    <Button 
                      onClick={generatePoem}
                      className="clay-button clay-text"
                    >
                      다시 만들기
                    </Button>
                    <Button 
                      onClick={() => {
                        navigator.clipboard.writeText(poem.join('\n'));
                      }}
                      variant="outline"
                      className="clay-button clay-text"
                    >
                      복사하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
      <ClayFooter />
    </div>
  );
}