import { Header } from '@/components/header';
import { StakingCard } from '@/components/staking-card';

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto">
            <Header />
            <div className='flex justify-center items-center pt-32'>
                <StakingCard />
            </div>
        </div>
    );
}
