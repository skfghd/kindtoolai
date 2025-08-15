import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { ClayFooter } from "@/components/clay-footer";
import { SideMenu } from "@/components/side-menu";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      {/* Side Menu */}
      <SideMenu />
      
      <div className="max-w-4xl mx-auto">
        {/* 상단 네비게이션 */}
        <div className="mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="text-orange-700 hover:text-orange-800 hover:bg-orange-100/50 p-2"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-orange-100">
          <h1 className="text-4xl font-bold text-orange-800 mb-6 text-center">
            kindtool.ai에 오신 것을 환영합니다
          </h1>

          <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
            kindtool.ai는 일상을 더 재미있고 따뜻하게 만들어주는 AI 기반 감성 도구들을 제공합니다.
          </p>

          <div className="grid gap-6 mb-8">
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-3 flex items-center">
                📜 <span className="ml-2">삼행시 생성기</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                이름이나 단어를 입력하면 AI가 창의적이고 재미있는 삼행시를 만들어드립니다. 
                회사 워크샵, 자기소개, 친구들과의 모임에서 분위기를 끌어올리는 완벽한 아이스브레이킹 도구입니다. 
                단순한 언어유희를 넘어서 각 글자의 의미를 살려 감동적이고 유머러스한 시를 창작해드립니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-6 border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-3 flex items-center">
                🔍 <span className="ml-2">테토vs에겐 성향 분석기</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                프로필 사진 한 장만으로 그 사람의 성격과 기질을 재미있게 분석해드립니다. 
                '테토'(활발하고 외향적인 성격)와 '에겐'(차분하고 내향적인 성격) 중 어디에 더 가까운지 판단하며, 
                표정, 포즈, 배경 등을 종합적으로 분석하여 상세한 성격 리포트를 제공합니다. 
                새로운 사람들과의 만남에서 대화의 물꼬를 트는 데 탁월한 도구입니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-2xl p-6 border border-pink-200">
              <h3 className="text-xl font-semibold text-pink-800 mb-3 flex items-center">
                📊 <span className="ml-2">만다라트 목표 캔버스</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                일본의 전통적인 목표 설정 기법인 만다라트를 디지털로 구현한 도구입니다. 
                하나의 핵심 목표를 중심으로 8개의 세부 목표를 설정하고, 각 세부 목표마다 다시 8개의 실행 계획을 수립하여 
                총 64개의 구체적인 액션 플랜을 만들어낼 수 있습니다. 
                막연한 꿈을 체계적이고 실현 가능한 로드맵으로 변환하여 목표 달성률을 크게 높여드립니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                📹 <span className="ml-2">캐치업 미팅 MBTI</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                팀원들의 MBTI 성향을 파악하여 효과적인 소통 방식을 제안하는 미팅 도구입니다. 
                각 팀원의 성격 유형에 맞는 커뮤니케이션 스타일, 동기부여 방법, 피드백 전달 방식을 안내하며, 
                팀 전체의 성향 분포를 시각화하여 팀워크 향상 방안을 제시합니다. 
                원격 근무 환경에서 팀원들 간의 이해도를 높이고 협업 효율성을 극대화할 수 있는 필수 도구입니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl p-6 border border-purple-200">
              <h3 className="text-xl font-semibold text-purple-800 mb-3 flex items-center">
                🎨 <span className="ml-2">속뜻 번역기</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                일상 대화에서 직접적으로 표현하지 않는 숨겨진 의미와 진짜 속마음을 AI가 분석해서 알려드립니다. 
                '괜찮다', '상관없어', '별로 안 바빠'와 같은 표현 뒤에 숨어있는 진짜 의도와 감정을 파악하여 
                상대방이 정말로 전하고 싶었던 메시지를 해석해드립니다. 
                사회생활과 인간관계에서 오해를 줄이고 더 깊은 소통을 가능하게 해주는 현실적인 소통 도구입니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-2xl p-6 border border-teal-200">
              <h3 className="text-xl font-semibold text-teal-800 mb-3 flex items-center">
                💬 <span className="ml-2">다정한 번역기</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                차갑고 직설적인 표현 속에 숨겨진 따뜻한 마음을 AI가 찾아서 번역해드립니다. 
                '바쁘다', '별로다', '됐다'와 같은 쌀쌀한 말투 뒤에 있는 진짜 감정과 배려를 해석하여 
                상대방의 진심을 이해할 수 있도록 도와드립니다. 
                관계에서 생기는 오해를 줄이고, 소통의 벽을 허물어 더 깊은 이해와 공감을 만들어가는 감성 AI 도구입니다.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                📖 <span className="ml-2">Tales of Me</span>
              </h3>
              <p className="text-gray-700 leading-relaxed">
                사용자의 현재 기분, 경험, 관심사를 바탕으로 개인 맞춤형 이야기 그림책을 AI가 창작해드립니다. 
                일상의 소소한 에피소드나 특별한 추억을 동화 같은 스토리로 재구성하며, 
                감정을 표현하는 삽화와 함께 완성된 디지털 그림책을 제공합니다. 
                자기 성찰의 도구로 활용하거나, 소중한 사람들과 나누고 싶은 특별한 선물로 만들 수 있습니다.
              </p>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              이 모든 도구들은 단순한 기능을 넘어서 사용자의 감정과 개성을 존중하며, 
              일상 속에서 마주하는 다양한 상황에 작은 즐거움과 영감을 선사하고자 설계되었습니다. 
              각자의 고유한 스토리와 경험을 더욱 풍성하게 만들어주는 디지털 동반자 역할을 목표로 합니다.
            </p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">운영자 정보</h3>
            <p className="text-gray-700">
              <strong>운영자:</strong> 홍은리<br />
              <strong>이메일:</strong> skfghd@naver.com
            </p>
          </div>
        </div>
      </div>
      <ClayFooter />
    </div>
  );
}