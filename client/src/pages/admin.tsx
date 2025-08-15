import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  Shield, 
  MessageSquare, 
  Lock, 
  Trash2, 
  User,
  Users,
  Calendar,
  Eye,
  Search,
  Filter
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ClayFooter } from "@/components/clay-footer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import type { Inquiry } from "@shared/schema";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState<Inquiry | null>(null);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // 로그인 처리
  const handleLogin = () => {
    if (password === "new1234!") {
      setIsAuthenticated(true);
      toast({
        title: "관리자 로그인 성공",
        description: "모든 문의사항을 관리할 수 있습니다.",
      });
    } else {
      toast({
        title: "로그인 실패",
        description: "패스워드가 올바르지 않습니다.",
        variant: "destructive",
      });
    }
  };

  // 모든 문의사항 조회 (비밀글 포함)
  const { data: inquiries = [], isLoading } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries/all"],
    enabled: isAuthenticated,
  });

  // 오늘 방문자 수 조회
  const { data: visitorsData } = useQuery<{ count: number }>({
    queryKey: ["/api/stats/visitors/today"],
    enabled: isAuthenticated,
  });
  
  const todayVisitors = visitorsData?.count || 0;

  // 문의사항 삭제
  const deleteInquiryMutation = useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/inquiries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries/all"] });
      setShowDeleteDialog(null);
      toast({
        title: "삭제 완료",
        description: "문의사항이 성공적으로 삭제되었습니다.",
      });
    },
    onError: () => {
      toast({
        title: "삭제 실패",
        description: "문의사항 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  // 필터링된 문의사항
  const filteredInquiries = inquiries?.filter(inquiry => {
    if (!inquiry) return false;
    
    const matchesSearch = 
      (inquiry.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inquiry.message || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || inquiry.type === typeFilter;
    
    return matchesSearch && matchesType;
  }) || [];

  // 로그인하지 않은 경우 로그인 폼 표시
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-clay-50 via-clay-100 to-clay-200">
        <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-clay-200 shadow-xl">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-clay-600 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-clay-800">관리자 로그인</CardTitle>
                <CardDescription>
                  KINDTOOLAI 관리 시스템에 접근하려면 패스워드를 입력하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="password">관리자 패스워드</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="패스워드를 입력하세요"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    className="mt-1"
                  />
                </div>
                <Button 
                  onClick={handleLogin} 
                  disabled={!password.trim()}
                  className="w-full bg-clay-600 hover:bg-clay-700 text-white"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  로그인
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-clay-50 via-clay-100 to-clay-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-clay-600 mx-auto mb-4"></div>
          <p className="text-clay-600">문의사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clay-50 via-clay-100 to-clay-200">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-clay-800 mb-2">KINDTOOLAI 관리 시스템</h1>
              <p className="text-clay-600">문의사항 관리 및 시스템 운영</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              로그아웃
            </Button>
          </div>
        </motion.div>

        {/* 통계 카드 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-clay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-clay-600">전체 문의</p>
                  <p className="text-2xl font-bold text-clay-800">{inquiries?.length || 0}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-clay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-clay-600">비밀글</p>
                  <p className="text-2xl font-bold text-clay-800">
                    {inquiries?.filter(i => i?.isPrivate).length || 0}
                  </p>
                </div>
                <Lock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-clay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-clay-600">버그 신고</p>
                  <p className="text-2xl font-bold text-clay-800">
                    {inquiries?.filter(i => i?.type === 'bug').length || 0}
                  </p>
                </div>
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-clay-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-clay-600">오늘 방문자</p>
                  <p className="text-2xl font-bold text-clay-800">{todayVisitors}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 검색 및 필터 */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-clay-200">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-clay-400" />
                    <Input
                      placeholder="이름, 제목, 내용으로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="md:w-48">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="유형 필터" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">전체</SelectItem>
                      <SelectItem value="inquiry">이용 문의</SelectItem>
                      <SelectItem value="bug">버그 신고</SelectItem>
                      <SelectItem value="suggestion">제안 및 피드백</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 문의사항 목록 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="bg-white/80 backdrop-blur-sm border-clay-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-clay-800">문의사항 관리</CardTitle>
              <CardDescription>
                총 {filteredInquiries.length}개의 문의사항 ({inquiries.filter(i => i.isPrivate).length}개 비밀글 포함)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-clay-600">문의사항을 불러오는 중...</div>
              ) : filteredInquiries.length === 0 ? (
                <div className="text-center py-8 text-clay-600">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-clay-400" />
                  {searchTerm || typeFilter !== "all" ? "검색 조건에 맞는 문의가 없습니다." : "등록된 문의가 없습니다."}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="border border-clay-200 rounded-lg p-4 hover:bg-clay-50/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-clay-500" />
                            <span className="font-medium text-clay-800">{inquiry.name}</span>
                          </div>
                          <Badge variant={
                            inquiry.type === 'bug' ? 'destructive' : 
                            inquiry.type === 'inquiry' ? 'default' : 'secondary'
                          }>
                            {inquiry.type === 'bug' ? '버그 신고' : 
                             inquiry.type === 'inquiry' ? '이용 문의' : '제안 및 피드백'}
                          </Badge>
                          {inquiry.isPrivate && (
                            <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                              <Lock className="h-3 w-3 mr-1" />
                              비밀글
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-clay-500">
                            {new Date(inquiry.createdAt).toLocaleString('ko-KR')}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedInquiry(inquiry)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            상세보기
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setShowDeleteDialog(inquiry)}
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h4 className="font-medium text-clay-800 mb-2">{inquiry.subject}</h4>
                      <p className="text-sm text-clay-600 line-clamp-2">{inquiry.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <ClayFooter />

      {/* 상세보기 다이얼로그 */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              문의사항 상세보기
              {selectedInquiry?.isPrivate && <Lock className="h-4 w-4 text-yellow-600" />}
            </DialogTitle>
          </DialogHeader>
          {selectedInquiry ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-clay-600">작성자</Label>
                  <p className="mt-1 text-clay-800">{selectedInquiry.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-clay-600">문의 유형</Label>
                  <p className="mt-1 text-clay-800">
                    {selectedInquiry.type === 'bug' ? '버그 신고' : 
                     selectedInquiry.type === 'inquiry' ? '이용 문의' : '제안 및 피드백'}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-clay-600">작성일시</Label>
                  <p className="mt-1 text-clay-800">
                    {new Date(selectedInquiry.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-clay-600">공개 설정</Label>
                  <p className="mt-1 text-clay-800">
                    {selectedInquiry.isPrivate ? '비밀글' : '공개글'}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-clay-600">제목</Label>
                <p className="mt-1 text-clay-800 font-medium">{selectedInquiry.subject}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-clay-600">내용</Label>
                <div className="mt-1 p-3 bg-clay-50 rounded-lg border">
                  <p className="text-clay-800 whitespace-pre-wrap">{selectedInquiry.message}</p>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={!!showDeleteDialog} onOpenChange={() => setShowDeleteDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>문의사항 삭제</DialogTitle>
            <DialogDescription>
              정말로 이 문의사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          {showDeleteDialog ? (
            <div className="space-y-4">
              <div className="p-3 bg-clay-50 rounded-lg border">
                <p className="font-medium text-clay-800">{showDeleteDialog.subject}</p>
                <p className="text-sm text-clay-600">작성자: {showDeleteDialog.name}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowDeleteDialog(null)}>
                  취소
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => deleteInquiryMutation.mutate(showDeleteDialog.id)}
                  disabled={deleteInquiryMutation.isPending}
                >
                  {deleteInquiryMutation.isPending ? "삭제 중..." : "삭제"}
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}