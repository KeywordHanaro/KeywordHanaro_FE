'use client';

import Header from '@/components/atoms/Header';
import KeywordWithInputs from '@/components/molecules/KeywordWithInputs';
import TransactionList from '@/components/templates/useKeyword/inquiry/TransactionList';
import { KeywordDetail, KeywordDetailList } from '@/data/keyword';
import { Member } from '@/data/member';
import { useReducer, useEffect } from 'react';

type MultiKeyword = {
  id: number;
  amount?: number;
  memberList?: Member[];
};

type State = {
  keywords: MultiKeyword[];
  isNextButtonEnabled: boolean;
};

type Action =
  | { type: 'SET_KEYWORDS'; keywords: KeywordDetail[] }
  | { type: 'UPDATE_AMOUNT'; id: number; amount: number }
  | { type: 'UPDATE_MEMBER_LIST'; id: number; memberList: Member[] }
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
          const base = { id: keyword.id };
          if (keyword.type === 'transfer') {
            return { ...base, amount: undefined };
          }
          if (keyword.type === 'settlement') {
            return {
              ...base,
              amount: undefined,
              memberList: [...keyword.memberList],
            };
          }
          if (keyword.type === 'settlementAmount') {
            return { ...base, memberList: [...keyword.memberList] };
          }
          return base;
        }),
      };

    case 'UPDATE_AMOUNT':
      return {
        ...state,
        keywords: state.keywords.map((keyword) =>
          keyword.id === action.id
            ? { ...keyword, amount: action.amount }
            : keyword
        ),
      };

    case 'UPDATE_MEMBER_LIST':
      return {
        ...state,
        keywords: state.keywords.map((keyword) =>
          keyword.id === action.id
            ? { ...keyword, memberList: action.memberList }
            : keyword
        ),
      };

    case 'VALIDATE_KEYWORDS': {
      const allValid = state.keywords.every((keyword) => {
        if (
          keyword.amount === undefined ||
          keyword.amount <= 0 ||
          keyword.memberList === undefined ||
          keyword.memberList.length <= 0
        ) {
          console.log('keyword', keyword.id);
          return false;
        }

        return true;
      });

      console.log('allValid', allValid);
      return { ...state, isNextButtonEnabled: allValid };
    }

    default:
      return state;
  }
}

const MultiKeyword = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 초기 키워드 데이터를 가져옴
  useEffect(() => {
    const loadKeywords = async () => {
      try {
        // const keywords = await fetchKeywords();
        dispatch({ type: 'SET_KEYWORDS', keywords: KeywordDetailList });
      } catch (error) {
        console.error('Failed to load keywords:', error);
      }
    };
    loadKeywords();
  }, []);

  // 유효성 검사 실행
  useEffect(() => {
    dispatch({ type: 'VALIDATE_KEYWORDS' });
  }, [state.keywords]);

  // 금액 변경 핸들러
  const handleAmountChange = (id: number, amount: number) => {
    dispatch({ type: 'UPDATE_AMOUNT', id, amount });
  };

  // 멤버 리스트 변경 핸들러
  const handleMemberListChange = (id: number, members: Member[]) => {
    dispatch({ type: 'UPDATE_MEMBER_LIST', id, memberList: members });
    dispatch({ type: 'VALIDATE_KEYWORDS' });
  };
  return (
    <div className='flex flex-col h-full'>
      <Header
        text={'멀티 키워드 실행하기'}
        showActionButton={state.isNextButtonEnabled}
        actionLabel={state.isNextButtonEnabled ? '다음' : ''}
        // onAction={path === '1' ? handleSubmit : undefined}
        showBackButton={true}
      />
      <div className='flex flex-col gap-[24px] pt-[24px] px-[20px]'>
        <div>
          <div className='text-[24px] font-semibold'>
            조회 키워드를 먼저 실행했어요
          </div>
          <div className='text-[24px] font-semibold'>
            {' '}
            나머지 키워드를 실행하시겠어요?
          </div>
        </div>
        {/* 키워드 리스트 */}
        <TransactionList />
        <div className='flex flex-col gap-3 pb-10'>
          {KeywordDetailList.map((keyword) => (
            <KeywordWithInputs
              keyword={keyword}
              key={keyword.id}
              onInputChange={handleAmountChange}
              onMemberListChange={handleMemberListChange}
            ></KeywordWithInputs>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiKeyword;
