export default function LoadingDot() {
  return (
    <>
      <div className='w-screen h-screen flex justify-center items-center bg-opacity-50 bg-black relative z-50'>
        <div className='dot-loading'>
          <div className='middle-dot'></div>
        </div>
      </div>
    </>
  );
}
