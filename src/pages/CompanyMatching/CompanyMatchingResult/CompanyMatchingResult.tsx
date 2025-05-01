import {
  CompanyMatchingResultItem,
  fetchCompanyMatchingResults,
} from '../../../api/recruitment';
import CompanyMatchingResultPreviewItem from '../../../components/CompanyMatchingResultPreviewItem';
import { useLocation } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

function CompanyMatchingResult() {
  const { selectedResume } = useLocation().state; // 선택된 이력서 ID 가져오기

  // AI 기업 매칭 API 호출
  const {
    data: matchingResults = [],
    isLoading: isMatchingResultsLoading,
    isError: isMatchingResultsError,
  } = useQuery({
    queryKey: ['matchingResults', selectedResume],
    queryFn: () => fetchCompanyMatchingResults(selectedResume!),
    enabled: !!selectedResume,
  });

  // 기업 매칭 결과 조회 성공 시 로그 출력
  useEffect(() => {
    if (matchingResults) {
      console.log('기업 매칭 결과 조회 성공', matchingResults);
    }
  }, [matchingResults]);

  // 기업 매칭 결과 조회 실패 시 로그 출력
  useEffect(() => {
    if (isMatchingResultsError) {
      console.error('기업 매칭 결과 조회 실패');
    }
  }, [isMatchingResultsError]);

  return (
    <div className='w-main overflow-hidden'>
      <div className='mt-12.5'>
        <div className='flex flex-col items-center gap-39'>
          {/* 타이틀 */}
          <div className='flex flex-col items-center gap-2.5'>
            <h1 className='text-[28px] leading-[33.89px] font-bold text-[#111827]'>
              기업 매칭 결과
            </h1>
            <h2 className='text-xl leading-[24.2px] font-medium text-[#6B7280]'>
              상세 정보 보기 버튼을 눌러 채용 정보와 피드백을 확인해보세요
            </h2>
          </div>

          {/* 기업 매칭 결과 리스트 */}
          {matchingResults.length > 0 && (
            <div className='flex w-full flex-wrap justify-center gap-5'>
              {matchingResults.map((result, index) => (
                <CompanyMatchingResultPreviewItem
                  key={`${result.companyName}-${index}`}
                  result={result}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyMatchingResult;
