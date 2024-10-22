import EditKeyword from '@/components/molecules/EditKeyword';
import { KeywordDetailList } from '@/data/keyword';

function page() {
  const data = KeywordDetailList;
  return (
    <div className='p-3 flex flex-col gap-2'>
      {data.map((each) => (
        <EditKeyword key={each.id} data={each}></EditKeyword>
      ))}
    </div>
  );
}

export default page;
