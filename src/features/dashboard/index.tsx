import { Link } from '@tanstack/react-router';
import { PATH } from '@/constants/PATH';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Main } from '@/components/layout/Main';

export default function Dashboard() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header/>

      {/* ===== Main ===== */}
      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
          <div className='flex items-center space-x-2'>
            <Link to={PATH.createInstance}>
              <Button>Create Instance</Button>
            </Link>
          </div>
        </div>
      </Main>
    </>
  );
}
