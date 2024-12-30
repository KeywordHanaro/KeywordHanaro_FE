export default function LoadingDot() {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center bg-opacity-50 bg-black relative z-50 sm:max-w-[640px]'>
        <div className='dot-loading'>
          <div className='middle-dot'></div>
        </div>
      </div>
    </>
  );
}
