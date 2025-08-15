import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowLeft, Camera, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ClayFooter } from "@/components/clay-footer";

export default function TetoVsEgen() {
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
            테토vs에겐, 나는 누구?!
          </h1>
          <p className="text-lg md:text-xl clay-text opacity-80 font-medium">
            사진 한 장으로 분석하는 나의 성향!
          </p>
        </motion.header>

        {/* Main Content */}
        <motion.div 
          className="grid gap-8 md:gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card className="clay-button border-0">
            <CardHeader>
              <CardTitle className="clay-text text-2xl md:text-3xl text-center">
                성격 분석 시작하기
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="clay-text text-center opacity-80">
                사진을 업로드하면 AI가 당신의 성격을 분석해드립니다!
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <Button 
                  className="clay-button clay-text h-24 flex-col space-y-2"
                  onClick={() => window.open('https://teto-vs-egen-hongeunlee.replit.app', '_blank')}
                >
                  <Upload className="w-8 h-8" />
                  <span>사진 업로드</span>
                </Button>

                <Button 
                  className="clay-button clay-text h-24 flex-col space-y-2"
                  onClick={() => window.open('https://teto-vs-egen-hongeunlee.replit.app', '_blank')}
                >
                  <Camera className="w-8 h-8" />
                  <span>카메라로 촬영</span>
                </Button>
              </div>

              <div className="text-center">
                <p className="clay-text text-sm opacity-60">
                  업로드된 사진은 분석 후 즉시 삭제됩니다.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="clay-button border-0">
            <CardHeader>
              <CardTitle className="clay-text text-xl text-center">
                어떻게 작동하나요?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <p className="clay-text font-medium">사진 업로드</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <p className="clay-text font-medium">AI 분석</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <p className="clay-text font-medium">결과 확인</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <ClayFooter />
    </div>
  );
}