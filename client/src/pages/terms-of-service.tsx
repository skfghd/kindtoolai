
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Back to home button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/">
            <Button variant="ghost" className="text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100/50 p-2">
              <ArrowLeft className="w-5 h-5 mr-2" />
              홈으로 돌아가기
            </Button>
          </Link>
        </motion.div>

        {/* Main content */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-emerald-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <FileText className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-emerald-800 mb-4">이용약관</h1>
            <p className="text-lg text-gray-600">
              KindToolAI 서비스 이용에 관한 약관입니다
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제1조 (목적)</h2>
              <p className="text-gray-700 leading-relaxed">
                이 약관은 KindToolAI(이하 "서비스")가 제공하는 모든 서비스의 이용조건 및 절차, 이용자와 서비스 간의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제2조 (정의)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                이 약관에서 사용하는 용어의 정의는 다음과 같습니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>"서비스"라 함은 KindToolAI가 제공하는 모든 서비스를 의미합니다.</li>
                <li>"이용자"라 함은 이 약관에 따라 서비스를 이용하는 자를 의미합니다.</li>
                <li>"콘텐츠"라 함은 서비스에서 제공하는 정보, 텍스트, 이미지, 동영상, 음성 등의 자료를 의미합니다.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제3조 (약관의 효력과 변경)</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">① 약관의 효력</h3>
                  <p className="text-gray-700 leading-relaxed">
                    이 약관은 서비스에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력을 발생합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">② 약관의 변경</h3>
                  <p className="text-gray-700 leading-relaxed">
                    서비스는 필요하다고 인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 서비스에 공지함으로써 효력을 발생합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제4조 (서비스의 제공)</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  서비스는 다음과 같은 서비스를 제공합니다:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>테토vs에겐 성격 분석 서비스</li>
                  <li>삼행시 생성 서비스</li>
                  <li>캐치업 미팅 도구 서비스</li>
                  <li>기타 서비스가 정하는 서비스</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제5조 (서비스 이용)</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">① 서비스 이용시간</h3>
                  <p className="text-gray-700 leading-relaxed">
                    서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 서비스의 정기점검 등의 필요로 서비스가 정한 날이나 시간은 그러하지 않습니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">② 서비스 이용료</h3>
                  <p className="text-gray-700 leading-relaxed">
                    서비스는 기본적으로 무료로 제공됩니다. 다만, 일부 유료 서비스의 경우 별도의 요금이 부과될 수 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제6조 (이용자의 의무)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                이용자는 다음 행위를 하여서는 안됩니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                <li>다른 이용자의 서비스 이용을 방해하거나 그 정보를 도용하는 행위</li>
                <li>서비스를 이용하여 법령과 이 약관이 금지하거나 공서양속에 반하는 행위</li>
                <li>서비스에 게시된 정보를 변경하거나 서비스를 임의로 수정하는 행위</li>
                <li>기타 불법적이거나 부당한 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제7조 (서비스의 중단)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                서비스는 다음의 경우 서비스 제공을 중단할 수 있습니다:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>서비스용 설비의 보수 등 공사로 인한 부득이한 경우</li>
                <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
                <li>기타 불가항력적 사유가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제8조 (책임제한)</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">① 서비스의 책임</h3>
                  <p className="text-gray-700 leading-relaxed">
                    서비스는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">② 이용자 책임</h3>
                  <p className="text-gray-700 leading-relaxed">
                    이용자는 서비스를 이용함에 있어 본 약관 및 관련 법령을 준수하여야 하며, 이를 위반하여 발생하는 모든 결과에 대한 책임은 이용자에게 있습니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제9조 (지적재산권)</h2>
              <p className="text-gray-700 leading-relaxed">
                서비스가 제공하는 콘텐츠에 대한 저작권 및 기타 지적재산권은 서비스에 귀속됩니다. 이용자는 서비스가 명시적으로 승인한 경우를 제외하고는 서비스의 정보를 가공, 판매, 전시, 배포 등의 행위를 할 수 없으며, 서비스의 자료를 상업적으로 사용할 수 없습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제10조 (분쟁해결)</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">① 준거법</h3>
                  <p className="text-gray-700 leading-relaxed">
                    이 약관의 해석 및 서비스와 이용자 간의 분쟁에 대하여는 대한민국의 법을 적용합니다.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">② 관할법원</h3>
                  <p className="text-gray-700 leading-relaxed">
                    서비스와 이용자 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제기합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-emerald-800 mb-4">제11조 (연락처)</h2>
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  서비스 이용과 관련하여 문의사항이 있으시면 아래 연락처로 연락주시기 바랍니다:
                </p>
                <div>
                  <p className="font-semibold text-emerald-800">고객지원센터</p>
                  <p className="text-gray-700">이메일: skfghd@naver.com</p>
                </div>
              </div>
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
