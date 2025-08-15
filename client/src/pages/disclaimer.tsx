import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { ClayFooter } from "@/components/clay-footer";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
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
          <div className="text-center mb-8">
            <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-orange-800 mb-4">면책조항</h1>
            <p className="text-lg text-gray-600">
              본 사이트의 AI 도구들은 정보 제공 또는 재미 요소를 위한 것입니다.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">중요 안내사항</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    AI가 제공하는 결과는 절대적인 사실이나 전문적 진단이 아닙니다.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    사용자가 AI 도구를 통해 생성한 결과에 대해 사이트는 법적 책임을 지지 않습니다.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-700">
                    사이트 사용에 따른 판단은 전적으로 사용자 본인의 책임입니다.
                  </p>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-xl font-semibold text-red-800 mb-4">AI 도구 사용 시 주의사항</h3>
              <p className="text-gray-700 leading-relaxed">
                AI는 실수를 할 수 있으며, 결과는 해석에 따라 다를 수 있음을 양지해주시기 바랍니다.
                본 사이트의 모든 도구는 엔터테인먼트 목적으로 제작되었으며, 
                전문적인 상담이나 진단을 대체할 수 없습니다.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">안전한 사용을 위한 권장사항</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• AI 결과를 참고자료로만 활용하세요</li>
                <li>• 중요한 결정은 전문가와 상담하세요</li>
                <li>• 개인정보 보호에 주의하세요</li>
                <li>• 결과에 대해 과도하게 의존하지 마세요</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              본 면책조항은 사이트 이용 시 동의한 것으로 간주됩니다.
            </p>
          </div>
        </div>
      </div>
      <ClayFooter />
    </div>
  );
}