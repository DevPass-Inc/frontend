import { useLocation, useNavigate, useParams } from 'react-router-dom';
import arrowLeftIcon from '/images/svg/icons/arrow_left.svg';
import CompanyMatchingDetailInfo from '../../../components/CompanyMatchingDetailInfo';
import { useEffect, useState } from 'react';
import {
  fetchRecruitmentDetailById,
  RecruitmentDetail,
} from '../../../api/recruitment';

function CompanyMatchingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { result } = location.state;

  const [recruitmentDetail, setRecruitmentDetail] = useState<RecruitmentDetail>(
    {} as RecruitmentDetail
  );

  // 매칭 결과로 돌아가기 버튼 클릭 핸들러
  const handleGoBackToResult = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      fetchRecruitmentDetailById(Number(id))
        .then((res) => {
          setRecruitmentDetail(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  return (
    <div className='w-main flex justify-center overflow-hidden'>
      <div className='mt-12.75 w-200'>
        <div className='flex flex-col items-start gap-5.75'>
          {/* 매칭 결과로 돌아가기 */}
          <button
            type='button'
            className='flex cursor-pointer items-center gap-2.5'
            onClick={handleGoBackToResult}
          >
            <img src={arrowLeftIcon} alt='Go Back' className='w-6' />
            <span className='leading-[19.36px] font-medium'>
              매칭 결과로 돌아가기
            </span>
          </button>

          {/* 기업 상세 */}
          <CompanyMatchingDetailInfo
            result={result}
            recruitmentDetail={recruitmentDetail}
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyMatchingDetail;
