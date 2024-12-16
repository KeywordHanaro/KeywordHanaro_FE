import { IoReorderThree } from 'react-icons/io5';
import { useSidebar } from '../ui/sidebar';

export function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <button onClick={toggleSidebar}>
      <IoReorderThree size={30} />
    </button>
  );
}
