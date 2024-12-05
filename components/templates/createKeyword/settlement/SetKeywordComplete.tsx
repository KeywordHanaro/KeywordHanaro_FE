import { FormData } from '@/data/settlement';

export default function SetKeywordComplete({
  formData,
}: {
  formData: FormData;
}) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <span className=''>내 {formData.fromAccount.accountName} 계좌로</span>
      <div className='font-semibold text-[24px] justify-center items-center'>
        {formData.members.map((member, idx) => (
          <span key={member.id} className='text-hanaPrimary mr-[3px]'>
            {member.name}
            {idx !== formData.members.length - 1 ? ',' : ''}
          </span>
        ))}
        <span>
          님에게 {formData.category === 'Settlement' ? '정산' : '회비'}요청
          할게요
        </span>
      </div>

      {formData.checkEveryTime ? (
        <h3 className='font-semibold text-hanaPrimary text-[18px]'>
          키워드 호출 시 금액이 요청돼요
        </h3>
      ) : formData.category === 'Settlement' ? (
        <>
          <h3 className='font-semibold text-hanaPrimary text-[18px]'>
            {formData.amount}원이 요청돼요
          </h3>
        </>
      ) : (
        <>
          <h3 className='font-semibold text-hanaPrimary text-[18px]'>
            각각 {formData.amount}원씩 요청돼요
          </h3>
        </>
      )}
      <span></span>
    </div>
  );
}
