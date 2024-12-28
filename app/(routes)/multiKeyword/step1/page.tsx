'use client';

import Header from '@/components/atoms/Header';
import InputPassword from '@/components/molecules/InputPassword';
import KeywordWithInputs from '@/components/molecules/KeywordWithInputs';
import TransactionList from '@/components/templates/useKeyword/inquiry/TransactionList';
import { useMultiKeywordResponse } from '@/contexts/MultiKeywordUseContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { useBranchApi } from '@/hooks/useBranch/useBranch';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { useSettlementApi } from '@/hooks/useSettlement/useSettlement';
import {
  groupMember,
  MultiKeywordDetail,
  MultiUsageResponse,
} from '@/types/Keyword';
import { SettlementRequest } from '@/types/Settlement';
import { useRouter, useSearchParams } from 'next/navigation';
import { useReducer, useEffect, useState } from 'react';

type State = {
  keywords: MultiKeywordDetail[];
  isNextButtonEnabled: boolean;
};

type Action =
  | { type: 'SET_KEYWORDS'; keywords: MultiKeywordDetail[] }
  | { type: 'UPDATE_AMOUNT'; id: number; amount: string }
  | { type: 'UPDATE_MEMBER_LIST'; id: number; groupMember: groupMember[] }
  | { type: 'UPDATE_TICKET'; id: number; serviceId: number; service: string }
  | { type: 'VALIDATE_KEYWORDS' };

const initialState: State = {
  keywords: [],
  isNextButtonEnabled: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_KEYWORDS':
      return {
        ...state,
        keywords: action.keywords.map((keyword) => {
          const base = { ...keyword };
          if (keyword.keyword.type === 'TRANSFER') {
            return { ...base, amount: keyword.keyword.amount || undefined };
          }
          if (
            keyword.keyword.type === 'SETTLEMENT' ||
            keyword.keyword.type === 'DUES'
          ) {
            return {
              ...base,
              amount: keyword.keyword.amount || undefined,
              keyword: {
                ...keyword.keyword,
                groupMember: [...keyword.keyword.groupMember],
              },
            };
          }
          if (keyword.keyword.type === 'TICKET') {
            return { ...base, serviceId: undefined };
          }
          return base;
        }),
      };

    case 'UPDATE_AMOUNT':
      return {
        ...state,
        keywords: state.keywords.map((keyword) =>
          keyword.keyword.id === action.id
            ? { ...keyword, amount: Number(action.amount.replace(/,/g, '')) }
            : keyword
        ),
      };

    case 'UPDATE_MEMBER_LIST':
      return {
        ...state,
        keywords: state.keywords.map((keyword) =>
          keyword.keyword.id === action.id
            ? {
                ...keyword,
                keyword: {
                  ...keyword.keyword,
                  groupMember: action.groupMember,
                },
              }
            : keyword
        ),
      };

    case 'UPDATE_TICKET':
      return {
        ...state,
        keywords: state.keywords.map((keyword) =>
          keyword.keyword.id === action.id
            ? {
                ...keyword,
                serviceId: action.serviceId,
              }
            : keyword
        ),
      };

    case 'VALIDATE_KEYWORDS': {
      const allValid = state.keywords.every((keyword) => {
        if (
          keyword.keyword.type === 'SETTLEMENT' ||
          keyword.keyword.type === 'TRANSFER' ||
          keyword.keyword.type === 'DUES'
        ) {
          if (
            keyword.keyword.checkEveryTime === true &&
            (keyword.amount === undefined || keyword.amount <= 0)
          ) {
            console.log('amount failed');
            return false;
          }
        }
        if (
          keyword.keyword.type === 'SETTLEMENT' ||
          keyword.keyword.type === 'DUES'
        ) {
          if (
            keyword.keyword.groupMember === undefined ||
            keyword.keyword.groupMember.length <= 0
          ) {
            console.log('groupMember failed');

            return false;
          }
        }
        if (keyword.keyword.type === 'TICKET') {
          if (keyword.serviceId === undefined) {
            console.log('serviceId failed');

            return false;
          }
        }
        return true;
      });

      return { ...state, isNextButtonEnabled: allValid };
    }

    default:
      return state;
  }
}

const MultiKeyword = () => {
  const searchParams = useSearchParams();
  const id = parseInt(searchParams?.get('state') || ''!);
  const code = searchParams?.get('code');
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState<boolean>(false);
  const { updateResponse } = useMultiKeywordResponse();
  const { checkMasterPswd } = useAccountApi();

  const [keyword, setKeyword] = useState<MultiUsageResponse>();

  const router = useRouter();
  // 금액 변경 핸들러
  const handleAmountChange = (id: number, amount: string) => {
    dispatch({ type: 'UPDATE_AMOUNT', id, amount });
  };

  // 멤버 리스트 변경 핸들러
  const handleMemberListChange = (id: number, members: groupMember[]) => {
    dispatch({ type: 'UPDATE_MEMBER_LIST', id, groupMember: members });
    dispatch({ type: 'VALIDATE_KEYWORDS' });
  };
  // 번호표 업무 변경 핸들러
  const handleTicketServiceChange = (
    id: number,
    serviceId: number,
    service: string
  ) => {
    console.log(id, serviceId);
    dispatch({ type: 'UPDATE_TICKET', id, serviceId, service });
  };

  const validatePassword = async (password: number[]): Promise<boolean> => {
    if (keyword && keyword.user.name) {
      try {
        await checkMasterPswd({
          password: password.join(''),
          id: keyword?.user.id,
        });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const { transfer } = useAccountApi();
  const { issueTicket } = useBranchApi();
  const { sendMultiMessage } = useSettlementApi();

  const handleSubmit = async () => {
    const settlementRequests: SettlementRequest[] = [];
    for (const keyword of state.keywords) {
      switch (keyword.keyword.type) {
        case 'TRANSFER':
          if (
            keyword.amount &&
            keyword.keyword.account &&
            keyword.keyword.subAccount
          ) {
            await transfer({
              fromAccountNumber: keyword.keyword.account.accountNumber,
              toAccountNumber: keyword.keyword.subAccount.accountNumber,
              amount: keyword.amount,
            })
              .then((res) => {
                updateResponse(res);
              })
              .catch((e) => console.log(e));
          }
          break;
        case 'TICKET':
          if (keyword.serviceId && keyword.keyword.branch) {
            issueTicket({
              keywordId: keyword.keyword.id,
              workNumber: keyword.serviceId,
              branchId: keyword.keyword.branch.id,
              branchName: keyword.keyword.branch.placeName,
            })
              .then((res) => {
                updateResponse(res);
              })
              .catch((e) => console.error(e));
          }
          break;
        case 'SETTLEMENT':
        case 'DUES':
          if (
            keyword.amount &&
            keyword.keyword.account &&
            keyword.keyword.groupMember
          ) {
            settlementRequests.push({
              amount: keyword.amount,
              account: keyword.keyword.account,
              groupMember: keyword.keyword.groupMember,
              type:
                keyword.keyword.type === 'SETTLEMENT' ? 'Settlement' : 'Dues',
            });
            updateResponse({
              keyword: keyword.keyword,
              amount: keyword.amount,
            });
          }
          break;
      }
    }
    if (settlementRequests.length > 0 && code) {
      await sendMultiMessage({
        code: code,
        settlementList: settlementRequests,
      })
        .then(() => {
          console.log('sendMessage success');
        })
        .catch((e) => console.log(e));
    }

    router.push(`/multiKeyword/complete?id=${id}`);
    setOpen(false);
  };

  // 초기 키워드 데이터를 가져옴
  const { getKeywordById } = useKeywordApi();
  useEffect(() => {
    getKeywordById(id).then((data) => {
      if (data.type === 'MULTI') {
        const sortedKeywordList = [...(data.multiKeyword || [])].sort(
          (a, b) => (a.seqOrder || 0) - (b.seqOrder || 0)
        );
        setKeyword({ ...data, multiKeyword: sortedKeywordList });
        dispatch({ type: 'SET_KEYWORDS', keywords: data.multiKeyword });
      }
    });
  }, []);

  // 유효성 검사 실행
  useEffect(() => {
    dispatch({ type: 'VALIDATE_KEYWORDS' });
  }, [state.keywords]);

  return (
    <div className='flex flex-col h-full'>
      <Header
        text={'멀티 키워드 실행하기'}
        showActionButton={state.isNextButtonEnabled}
        actionLabel={state.isNextButtonEnabled ? '다음' : ''}
        onAction={() => setOpen(true)}
        showBackButton={true}
      />
      <div className='flex flex-col gap-[24px] pt-[24px] px-[20px] overflow-y-scroll'>
        <div>
          {keyword?.multiKeyword.some((k) => k.keyword.type === 'INQUIRY') ? (
            <>
              <div className='text-[24px] font-semibold'>
                조회 키워드를 먼저 실행했어요
              </div>
              <div className='text-[24px] font-semibold'>
                나머지 키워드를 실행하시겠어요?
              </div>
            </>
          ) : (
            <div className='text-[24px] font-semibold'>
              아래 키워드들을 실행할게요
            </div>
          )}
        </div>
        {keyword?.multiKeyword?.map(
          (keyword) =>
            keyword.keyword.type === 'INQUIRY' && (
              <TransactionList
                key={keyword.id}
                tranactions={keyword.keyword.transactions}
              />
            )
        )}
        {/* 키워드 리스트 */}
        <div className='flex flex-col gap-3 pb-10'>
          <VoiceInputProvider>
            {keyword?.multiKeyword?.map((keyword) =>
              keyword.keyword.type !== 'INQUIRY' ? (
                <KeywordWithInputs
                  keyword={keyword.keyword}
                  key={keyword.id}
                  onInputChange={handleAmountChange}
                  onMemberListChange={handleMemberListChange}
                  onTicketServiceChange={handleTicketServiceChange}
                ></KeywordWithInputs>
              ) : null
            )}
          </VoiceInputProvider>
        </div>
        <div className='absolute bottom-0 '>
          <InputPassword
            onSubmit={handleSubmit}
            validatePassword={validatePassword}
            open={open}
            onClose={() => setOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiKeyword;
