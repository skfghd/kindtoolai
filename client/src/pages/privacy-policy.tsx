
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to home button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/">
            <Button variant="ghost" className="text-indigo-700 hover:text-indigo-800 hover:bg-indigo-100/50 p-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </motion.div>

        {/* Main content */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-indigo-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-indigo-800 mb-4">개인정보처리방침</h1>
            <p className="text-lg text-gray-600">
              KindToolAI 서비스의 개인정보 보호에 대한 정책입니다
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">1. 개인정보의 처리목적</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KindToolAI(이하 "서비스")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>서비스 제공 및 운영</li>
                <li>회원관리 및 본인확인</li>
                <li>고객상담 및 민원처리</li>
                <li>서비스 개선 및 새로운 서비스 개발</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">2. 개인정보의 처리 및 보유기간</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                서비스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>서비스 이용 기록: 서비스 탈퇴 시까지</li>
                <li>문의사항 및 상담 기록: 처리 완료 후 3년</li>
                <li>부정이용 기록: 부정이용 확인일로부터 1년</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">3. 처리하는 개인정보 항목</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                서비스는 다음의 개인정보 항목을 처리하고 있습니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>필수항목: 이메일 주소, 이름</li>
                <li>선택항목: 전화번호</li>
                <li>자동수집항목: IP주소, 쿠키, 서비스 이용기록, 접속로그</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-gray-700 leading-relaxed">
                서비스는 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한 범위 내에서 처리하며, 정보주체의 사전 동의 없이는 본래의 목적 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>정보주체로부터 별도의 동의를 받은 경우</li>
                <li>법률에 특별한 규정이 있는 경우</li>
                <li>정보주체 또는 그 법정대리인이 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전 동의를 받을 수 없는 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">5. 개인정보 처리의 위탁</h2>
              <p className="text-gray-700 leading-relaxed">
                현재 서비스는 개인정보 처리업무를 외부에 위탁하고 있지 않습니다. 향후 개인정보 처리업무를 위탁하게 되는 경우, 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하겠습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">6. 정보주체의 권리·의무 및 행사방법</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                정보주체는 서비스에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>개인정보 처리현황 통지요구</li>
                <li>개인정보 처리정지 요구</li>
                <li>개인정보의 정정·삭제 요구</li>
                <li>손해배상 청구</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">7. 개인정보의 안전성 확보조치</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>개인정보 취급 직원의 최소화 및 대상자에 대한 교육</li>
                <li>개인정보에 대한 접근 제한</li>
                <li>개인정보를 처리하는 데이터베이스 시스템에 대한 접근권한의 부여·변경·말소를 통하여 개인정보에 대한 접근통제를 위해 필요한 조치</li>
                <li>개인정보의 안전한 저장을 위한 저장·전송 데이터의 암호화</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">8. 개인정보보호책임자</h2>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                <p className="text-gray-700 leading-relaxed mb-2">
                  서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.
                </p>
                <div className="mt-4">
                  <p className="font-semibold text-indigo-800">개인정보보호책임자</p>
                  <p className="text-gray-700">이메일: skfghd@naver.com</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-800 mb-4">9. 개인정보 처리방침 변경</h2>
              <p className="text-gray-700 leading-relaxed">
                이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mt-8">
              <p className="text-center text-gray-600">
                <strong>시행일자:</strong> 2025년 7월 31일
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
