import { Button } from '@/components/ui/button';
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { Search } from '@/components/Search';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';

export default function Products() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Create a new EC2 Instance</h1>
          <div className='flex items-center space-x-2'>
            <Button>Create Instance</Button>
          </div>
        </div>
      </Main>
    </>
  );
}
