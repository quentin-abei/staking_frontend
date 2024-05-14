'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from './ui/button';
import {
    useContractWrite,
    useContract,
    useAccount,
    useWaitForTransaction,
    useContractRead
} from '@starknet-react/core';
import { contractAddress, contractABI } from '@/lib/consts';
import { useEffect, useMemo } from 'react';
import { LoadingSpinner } from './loader';
import { useToast } from './ui/use-toast';
import Image from 'next/image';
import { Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Rewards() {
    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    const { contract } = useContract({
        abi: contractABI,
        address: contractAddress
    });

    const claimRewardsCall = useMemo(() => {
        if (!address || !contract) return [];
        return contract.populateTransaction['claim']([]);
    }, [contract, address]);

    const {
        data: claimRewardsTx,
        writeAsync: claimRewards,
        status: claimRewardsStatus,
        isError: claimRewardsErrorStatus,
        error: claimRewardsError
    } = useContractWrite({
        calls: claimRewardsCall
    });

    const { data: rewardsData, isLoading: loadingRewards } = useContractRead({
        functionName: 'calculate_rewards_earned',
        args: [address as string],
        abi: contractABI,
        address: contractAddress,
        parseResult: true,
        watch: true
    });

    const { data: claimRewardReceipt, isLoading: loadingClaimRewardReceipt } =
        useWaitForTransaction({
            hash: claimRewardsTx?.transaction_hash,
            watch: true
        });

    // useEffect(() => {
    //     if (claimRewardReceipt) {
    //         console.log('receipt', claimRewardReceipt);
    //     }
    //     if (claimRewardsTx) {
    //         console.log('claim rewards', claimRewardsTx);
    //     }
    // }, [claimRewardReceipt, claimRewardsTx]);

    const handleClaimRewards = async () => {
        try {
            await claimRewards();
        } catch (error) {}
    };

    useEffect(() => {
        if (claimRewardsErrorStatus) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: claimRewardsError?.message,
                duration: 2000
            });
        }
    }, [claimRewardsErrorStatus]);

    // useEffect(() => {
    //     if (rewardsData) {
    //         console.log('rewards', rewardsData);
    //     }
    //     console.log('rev', rewardsData);
    // }, [rewardsData]);

    return (
        <Card className="w-[1250px] border-[#d3500c] relative">
            <div className="absolute top-5 right-5 w-1/2">
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Rewards Distribution</AlertTitle>
                    <AlertDescription>
                        Thank you for participating! Please note that rewards
                        will be distributed after the staking period ends. It's
                        important to keep your stake until the end to remain
                        eligible for rewards. Unstaking your tokens prematurely
                        will forfeit your eligibility for rewards. Only staked
                        addresses will receive rewards. Happy staking!
                    </AlertDescription>
                </Alert>
            </div>
            <CardHeader>
                <CardTitle>Rewards</CardTitle>
                <CardDescription>Claim your earned rewards</CardDescription>
            </CardHeader>
            <CardContent>
                <h1>Reward Token</h1>
                <span className="flex items-center gap-2 mt-2">
                    <Image
                        src={'/images/bull-logo.jpeg'}
                        alt="Token logo"
                        width={20}
                        height={20}
                        className="rounded-full"
                    />
                    <span className="text-sm text-[#A8A29E]">STBULL</span>
                </span>
                <h1 className="mt-4">Earned Reward Tokens</h1>
                <span className="mt-2">
                    {isConnected ? (
                        rewardsData !== undefined &&
                        !isNaN(Number(rewardsData)) &&
                        loadingRewards === false ? (
                            Number(rewardsData) !== 0 ? (
                                rewardsData.toString()
                            ) : (
                                'NaN'
                            )
                        ) : (
                            <LoadingSpinner className="text-[#EA580C] h-5" />
                        )
                    ) : (
                        <span>Connect your wallet</span>
                    )}
                </span>
                <div className="mt-8 flex justify-end items-center">
                    <Button
                        type="button"
                        onClick={handleClaimRewards}
                        disabled={
                            loadingClaimRewardReceipt ||
                            claimRewardsStatus === 'pending' ||
                            Number(rewardsData) === 0 ||
                            !isConnected
                        }
                    >
                        {loadingClaimRewardReceipt ||
                        claimRewardsStatus === 'pending' ? (
                            <div className="flex gap-1 items-center">
                                <LoadingSpinner className="text-white h-5 -ml-1" />
                                Claiming
                            </div>
                        ) : (
                            'Claim Rewards'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
