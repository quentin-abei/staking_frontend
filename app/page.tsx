import { Rewards } from '@/components/Rewards';
import { Header } from '@/components/header';
import { InfoCard } from '@/components/info-card';
import { StakingCard } from '@/components/staking-card';

export default function Home() {
    return (
        <div className="max-w-7xl mx-auto">
            <Header />
            <div className="flex gap-6 pt-32 px-4">
                <InfoCard />
                <StakingCard />
            </div>
            <div className="flex justify-center items-center py-6 px-4">
                <Rewards />
            </div>
        </div>
    );
}
