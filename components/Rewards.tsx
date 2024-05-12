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
    useWaitForTransaction
} from '@starknet-react/core';
import { contractAddress, contractABI } from '@/lib/consts';
import { useEffect, useMemo } from 'react';
import { LoadingSpinner } from './loader';
import { getCalldata } from 'starknet';

export function Rewards() {
    const { address } = useAccount();

    const { contract } = useContract({
        abi: contractABI,
        address: contractAddress
    });

    const calculateRewardsCall = useMemo(() => {
        if (!address || !contract) return [];
        return contract.populateTransaction['calculate_rewards_earned']!(
            address
        );
    }, [contract, address]);

    const {
        data: calculatedRewardsTx,
        writeAsync: calculateRewards,
        isPending
    } = useContractWrite({
        calls: calculateRewardsCall
    });

    const {
        data: receipt,
        isLoading,
        status
    } = useWaitForTransaction({
        hash: calculatedRewardsTx?.transaction_hash,
        watch: true
    });

    useEffect(() => {
        if (receipt) {
            console.log('receipt', receipt);
        }
        if (calculatedRewardsTx) {
            console.log('rewards', calculatedRewardsTx);
        }
    }, [receipt, calculatedRewardsTx]);

    return (
        <Card className="w-[650px] border-[#d3500c]">
            <CardHeader>
                <CardTitle>Rewards</CardTitle>
                <CardDescription>Claim your earned rewards</CardDescription>
            </CardHeader>
            <CardContent>
                <h1>Rewards</h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium perferendis fugit aperiam porro, neque in. Minus,
                    odit ex obcaecati voluptates molestias tempore assumenda
                    exercitationem optio ab laborum necessitatibus quaerat
                    inventore!
                </p>
                <div className="mt-8 flex justify-between items-center">
                    <Button
                        className=""
                        type="button"
                        onClick={() => calculateRewards()}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex gap-2 items-center">
                                <LoadingSpinner className="text-white h-5" />
                                Calculating
                            </div>
                        ) : (
                            'Calculate Rewards'
                        )}
                    </Button>
                    <Button className="">Claim Rewards</Button>
                </div>
            </CardContent>
        </Card>
    );
}
