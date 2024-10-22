import EditKeyword from '@/components/molecules/EditKeyword';
import { KeywordDetailList } from '@/data/keyword';

function page() {
  const data = KeywordDetailList;
  return (
    <div className='flex flex-col gap-2 p-3 h-full'>
      {/* {data.map((each) => (
        <EditKeyword key={each.id} data={each}></EditKeyword>
      ))} */}
      <EditKeyword key={data[1].id} data={data[1]}></EditKeyword>
    </div>
  );
}

export default page;
