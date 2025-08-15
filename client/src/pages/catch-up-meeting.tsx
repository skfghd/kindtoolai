import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, MessageCircle, Target } from "lucide-react";
import { motion } from "framer-motion";
import { ClayFooter } from "@/components/clay-footer";

export default function CatchUpMeeting() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "팀원 정보 입력",
    "소통 스타일 분석",
    "미팅 계획 수립",
    "결과 확인"
  ];

  const communicationStyles = [
    { name: "직접적", description: "명확하고 간결한 소통을 선호", color: "bg-red-500" },
    { name: "협력적", description: "팀워크와 합의를 중시", color: "bg-blue-500" },
    { name: "분석적", description: "데이터와 논리를 기반으로 소통", color: "bg-green-500" },
    { name: "창의적", description: "새로운 아이디어와 혁신을 추구", color: "bg-purple-500" }
  ];

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
            캐치업 미팅
          </h1>
          <p className="text-lg md:text-xl clay-text opacity-80 font-medium">
            팀원들의 소통 스타일을 이해하고 더 효과적인 회의를 만들어요
          </p>
        </motion.header>

        {/* Progress Steps */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-16 h-1 mx-2 ${
                      index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <span className="clay-text font-medium">{steps[currentStep]}</span>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="grid gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Card className="clay-button border-0">
            <CardHeader>
              <CardTitle className="clay-text text-2xl md:text-3xl text-center flex items-center justify-center">
                <Users className="w-8 h-8 mr-3" />
                효과적인 팀 소통
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="clay-text text-center opacity-80">
                팀원들의 다양한 소통 스타일을 파악하고 최적의 미팅 환경을 조성합니다
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="clay-text font-bold text-lg flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    소통 스타일 분석
                  </h3>
                  <div className="space-y-2">
                    {communicationStyles.map((style, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      >
                        <div className={`w-4 h-4 rounded-full ${style.color}`}></div>
                        <div>
                          <Badge variant="outline" className="mb-1">
                            {style.name}
                          </Badge>
                          <p className="clay-text text-sm opacity-75">
                            {style.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="clay-text font-bold text-lg flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    미팅 최적화
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 rounded-lg">
                      <h4 className="clay-text font-medium">시간 관리</h4>
                      <p className="clay-text text-sm opacity-75">
                        참여자 스타일에 맞는 적절한 미팅 시간 제안
                      </p>
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg">
                      <h4 className="clay-text font-medium">아젠다 구성</h4>
                      <p className="clay-text text-sm opacity-75">
                        효과적인 논의를 위한 맞춤형 아젠다
                      </p>
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg">
                      <h4 className="clay-text font-medium">참여 유도</h4>
                      <p className="clay-text text-sm opacity-75">
                        모든 팀원이 참여할 수 있는 환경 조성
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => window.open('https://catch-up-meeting-hongeunlee.replit.app', '_blank')}
                className="w-full h-12 clay-button clay-text text-lg"
              >
                미팅 분석 시작하기
              </Button>
            </CardContent>
          </Card>

          {currentStep > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="clay-button border-0">
                <CardHeader>
                  <CardTitle className="clay-text text-xl text-center">
                    📊 분석 진행 중...
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                      ></div>
                    </div>
                    <p className="clay-text">
                      {currentStep === steps.length - 1 
                        ? "분석이 완료되었습니다!" 
                        : "팀 소통 패턴을 분석하고 있습니다..."
                      }
                    </p>
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