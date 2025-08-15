import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Mail, MessageSquare, Bug, Lightbulb, Lock, Eye, Reply as ReplyIcon, Send, ArrowLeft, Edit, AlertCircle } from "lucide-react";
import { ClayFooter } from "@/components/clay-footer";
import { SideMenu } from "@/components/side-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Inquiry, Reply } from "@shared/schema";
import { Link } from "wouter";
import { trackEvent } from "@/lib/analytics";

// 작성자 키 관리 유틸리티
const generateAuthorKey = () => {
  return `author_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const getAuthorKey = (): string => {
  let authorKey = localStorage.getItem('inquiryAuthorKey');
  if (!authorKey) {
    authorKey = generateAuthorKey();
    localStorage.setItem('inquiryAuthorKey', authorKey);
  }
  return authorKey;
};

const isAuthorOfInquiry = (inquiry: Inquiry): boolean => {
  const authorKey = localStorage.getItem('inquiryAuthorKey');
  return authorKey === inquiry.authorKey;
};

// InquiryDetailDialog component
function InquiryDetailDialog({ inquiry }: { inquiry: Inquiry }) {
  const [replyMessage, setReplyMessage] = useState("");
  const [adminName, setAdminName] = useState("관리자");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: inquiryDetail } = useQuery<Inquiry & { replies: Reply[] }>({
    queryKey: ["/api/inquiries", inquiry.id],
    queryFn: () => {
      const authorKey = getAuthorKey();
      return fetch(`/api/inquiries/${inquiry.id}?authorKey=${authorKey}`)
        .then(res => res.json());
    },
    enabled: isDialogOpen,
  });

  const createReplyMutation = useMutation({
    mutationFn: (data: { message: string; adminName: string }) =>
      apiRequest("POST", `/api/inquiries/${inquiry.id}/replies`, data),
    onSuccess: () => {
      toast({
        title: "답변이 등록되었습니다",
      });
      setReplyMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries", inquiry.id] });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: (error) => {
      toast({
        title: "답변 등록 실패",
        description: "다시 시도해 주세요.",
        variant: "destructive",
      });
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    createReplyMutation.mutate({ message: replyMessage, adminName });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-clay-700 border-clay-300">
          <MessageSquare className="h-4 w-4 mr-1" />
          {inquiry.isPrivate && <Lock className="h-3 w-3 mr-1" />}
          상세보기
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{inquiry.subject}</span>
            {inquiry.isPrivate && <Lock className="h-4 w-4 text-gray-500" />}
          </DialogTitle>
          <DialogDescription>
            {inquiry.name} • {inquiry.type === 'bug' ? '버그 신고' : 
             inquiry.type === 'inquiry' ? '이용 문의' : '제안 및 피드백'} • 
            {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Inquiry */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">문의 내용</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
            {inquiry.email && (
              <p className="text-sm text-gray-500 mt-2">연락처: {inquiry.email}</p>
            )}
          </div>

          {/* Replies */}
          {inquiryDetail?.replies && inquiryDetail.replies.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800">답변</h4>
              {inquiryDetail.replies.map((reply) => (
                <div key={reply.id} className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-800">{reply.adminName}</span>
                    <span className="text-sm text-blue-600">
                      {new Date(reply.createdAt).toLocaleDateString('ko-KR')}
                    </span>
                  </div>
                  <p className="text-blue-700 whitespace-pre-wrap">{reply.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Reply Form */}
          <form onSubmit={handleReplySubmit} className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-gray-800">답변 작성</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adminName">관리자명</Label>
                <Input
                  id="adminName"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="관리자"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="replyMessage">답변 내용</Label>
              <Textarea
                id="replyMessage"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="답변을 작성해 주세요..."
                className="min-h-24"
              />
            </div>
            <Button
              type="submit"
              disabled={!replyMessage.trim() || createReplyMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createReplyMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  등록 중...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  답변 등록
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    subject: "",
    message: "",
    isPrivate: false
  });
  const [showNewInquiryForm, setShowNewInquiryForm] = useState(false);
  const [authorKey, setAuthorKey] = useState<string>("");

  useEffect(() => {
    setAuthorKey(getAuthorKey());
  }, []);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: inquiries = [], isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries", authorKey],
    queryFn: () => {
      const url = authorKey ? `/api/inquiries?authorKey=${authorKey}` : "/api/inquiries";
      return fetch(url, {
        credentials: "include",
      }).then(res => res.json());
    },
    enabled: !!authorKey,
  });

  const createInquiryMutation = useMutation({
    mutationFn: (data: typeof formData) => {
      const dataWithAuthorKey = { ...data, authorKey };
      console.log("Sending inquiry data:", dataWithAuthorKey);
      return apiRequest("/api/inquiries", "POST", dataWithAuthorKey);
    },
    onSuccess: () => {
      // Google Analytics 이벤트 추적
      trackEvent('inquiry_submit', 'contact', formData.type, 1);
      
      toast({
        title: "문의가 등록되었습니다",
        description: "빠른 시일 내에 답변드리겠습니다.",
      });
      setFormData({
        name: "",
        email: "",
        type: "",
        subject: "",
        message: "",
        isPrivate: false
      });
      setShowNewInquiryForm(false);
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: (error) => {
      toast({
        title: "문의 등록에 실패했습니다",
        description: "다시 시도해 주세요.",
        variant: "destructive",
      });
      console.error("Error creating inquiry:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInquiryMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 via-clay-100 to-clay-200">
      {/* Side Menu */}
      <SideMenu />
      
      {/* Header */}
      <motion.header
        className="relative z-10 px-4 py-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-clay-800 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Q & A
          </motion.h1>
          <motion.p
            className="text-lg text-clay-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            KindToolAI에 대한 문의사항이나 제안을 남겨주세요
          </motion.p>
        </div>
      </motion.header>

      <div className="container mx-auto max-w-4xl px-4 pb-16">
        {/* Service Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-clay-200 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-clay-800 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                KindToolAI
              </CardTitle>
              <CardDescription>
                재미있고 유용한 아이스브레이킹 도구들을 모은 서비스입니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-clay-600">
                삼행시 생성기, 성향 분석 테스트, 속뜻 번역기 등 다양한 콘텐츠를 통해 
                친구, 동료, 팀원과의 대화를 더 부드럽고 즐겁게 만들어드립니다.
              </p>
              <p className="text-sm text-clay-600">
                모든 기능은 개인정보를 수집하지 않는 안전한 일회성 서비스로 설계되어 
                안심하고 사용하실 수 있습니다.
              </p>
              <div className="flex items-center gap-2 text-clay-700 font-medium">
                <Mail className="h-4 w-4" />
                <span>문의 이메일: skfghd@naver.com</span>
              </div>
            </CardContent>
          </Card>

          {/* 문의 유형별 안내 */}
          <Card className="bg-white/80 backdrop-blur-sm border-clay-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-clay-800">문의 유형별 안내</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Bug className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-clay-800">버그 신고</h4>
                  <p className="text-sm text-clay-600">서비스 이용 중 발생한 오류나 문제점을 신고해 주세요.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-clay-800">이용 문의</h4>
                  <p className="text-sm text-clay-600">서비스 사용법이나 기능에 대한 질문을 남겨주세요.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-clay-800">제안 및 피드백</h4>
                  <p className="text-sm text-clay-600">서비스 개선을 위한 제안이나 의견을 공유해 주세요.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Inquiry List */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-clay-200 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-clay-800">문의 게시판</CardTitle>
                  <CardDescription>
                    등록된 문의사항들을 확인할 수 있습니다.
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={() => setShowNewInquiryForm(!showNewInquiryForm)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {showNewInquiryForm ? "문의 작성 닫기" : "새 문의 작성"}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* New Inquiry Form */}
              {showNewInquiryForm && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-4">새 문의 작성</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-clay-700">이름 *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="border-clay-300 focus:border-clay-500"
                          placeholder="이름을 입력하세요"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-clay-700">이메일</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="border-clay-300 focus:border-clay-500"
                          placeholder="답변받을 이메일 (선택사항)"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-clay-700">문의 유형 *</Label>
                      <Select onValueChange={(value) => setFormData({...formData, type: value})} required>
                        <SelectTrigger className="border-clay-300 focus:border-clay-500">
                          <SelectValue placeholder="문의 유형을 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bug">버그 신고</SelectItem>
                          <SelectItem value="inquiry">이용 문의</SelectItem>
                          <SelectItem value="feedback">제안 및 피드백</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-clay-700">제목 *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="border-clay-300 focus:border-clay-500"
                        placeholder="문의 제목을 입력하세요"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-clay-700">내용 *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="border-clay-300 focus:border-clay-500 min-h-32"
                        placeholder="문의 내용을 자세히 작성해 주세요..."
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2 p-3 bg-clay-50 rounded-lg border border-clay-200">
                      <Switch
                        id="private"
                        checked={formData.isPrivate}
                        onCheckedChange={(checked) => setFormData({...formData, isPrivate: checked})}
                      />
                      <div className="flex items-center space-x-2">
                        {formData.isPrivate ? (
                          <Lock className="h-4 w-4 text-clay-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-clay-600" />
                        )}
                        <Label htmlFor="private" className="text-clay-700 cursor-pointer">
                          {formData.isPrivate ? "비밀글로 작성" : "공개글로 작성"}
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowNewInquiryForm(false)}
                        className="flex-1"
                      >
                        취소
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!formData.name.trim() || !formData.type || !formData.subject.trim() || !formData.message.trim() || createInquiryMutation.isPending}
                      >
                        {createInquiryMutation.isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            등록 중...
                          </>
                        ) : (
                          <>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            문의 등록
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Inquiries List */}
              {isLoading ? (
                <div className="text-center py-8 text-clay-600">문의사항을 불러오는 중...</div>
              ) : inquiries.length === 0 ? (
                <div className="text-center py-8 text-clay-600">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-clay-400" />
                  아직 등록된 문의가 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inquiry) => {
                    const isAuthor = isAuthorOfInquiry(inquiry);
                    const isPrivateAndNotAuthor = inquiry.isPrivate && !isAuthor;
                    
                    return (
                      <div key={inquiry.id} className={`border border-clay-200 rounded-lg p-4 ${
                        inquiry.isPrivate ? 'bg-yellow-50/50 border-yellow-200' : 'bg-white/50'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-clay-800">{inquiry.name}</span>
                            <span className="text-xs bg-clay-100 text-clay-600 px-2 py-1 rounded">
                              {inquiry.type === 'bug' ? '버그 신고' : 
                               inquiry.type === 'inquiry' ? '이용 문의' : '제안 및 피드백'}
                            </span>
                            {inquiry.isPrivate && (
                              <div className="flex items-center gap-1">
                                <Lock className="h-3 w-3 text-yellow-600" />
                                <span className="text-xs text-yellow-700 font-medium">비밀글</span>
                              </div>
                            )}
                            {isAuthor && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium">
                                내가 작성한 글
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-clay-500">
                              {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                            </span>
                            {isAuthor && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-blue-600 border-blue-300 hover:bg-blue-50"
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                수정
                              </Button>
                            )}
                            <InquiryDetailDialog inquiry={inquiry} />
                          </div>
                        </div>
                        <h4 className="font-medium text-clay-800 mb-2">{inquiry.subject}</h4>
                        <div className="text-sm text-clay-600 whitespace-pre-wrap line-clamp-3">
                          {isPrivateAndNotAuthor ? (
                            <div className="flex items-center gap-2 text-yellow-700 italic">
                              <AlertCircle className="h-4 w-4" />
                              이 글은 비밀글입니다. 작성자만 확인할 수 있습니다.
                            </div>
                          ) : (
                            inquiry.message
                          )}
                        </div>
                        {inquiry.isPrivate && isAuthor && (
                          <div className="mt-2 text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
                            💡 이 글은 비밀글로 설정되어 있어 다른 사용자에게는 내용이 보이지 않습니다.
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-clay-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-clay-800">자주 묻는 질문</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-clay-700">Q. 개인정보가 저장되나요?</AccordionTrigger>
                  <AccordionContent className="text-clay-600">
                    A. 아닙니다. 저장되지 않으며, 세션 종료 시 모든 데이터가 삭제됩니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-clay-700">Q. 회원가입이 필요한가요?</AccordionTrigger>
                  <AccordionContent className="text-clay-600">
                    A. 아닙니다. 별도의 회원가입 없이 바로 이용하실 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-clay-700">Q. 모든 도구가 무료인가요?</AccordionTrigger>
                  <AccordionContent className="text-clay-600">
                    A. 네. KINDTOOLAI의 모든 아이스브레이킹 도구들은 완전 무료로 제공됩니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-clay-700">Q. 생성된 결과물을 상업적으로 이용해도 되나요?</AccordionTrigger>
                  <AccordionContent className="text-clay-600">
                    A. 네. 모든 도구에서 생성된 결과물에 대한 권리는 이용자에게 있으므로 자유롭게 이용하실 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-clay-700">Q. 어떤 도구들이 있나요?</AccordionTrigger>
                  <AccordionContent className="text-clay-600">
                    A. 테토vs에겐 성향분석, 삼행시 만들기, 만다라트 캔버스, 캐치업 미팅 MBTI, 속뜻 번역기 등 다양한 아이스브레이킹 도구를 제공합니다.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-clay-700">Q. 모바일에서도 사용할 수 있나요?</AccordionTrigger>
                  <AccordionContent className="text-clay-600">
                    A. 네. 모든 도구들이 모바일 환경에 최적화되어 있어 스마트폰에서도 편리하게 이용하실 수 있습니다.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ClayFooter />


    </div>
  );
}