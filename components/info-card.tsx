'use client';
import * as React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { useContractRead, useAccount } from '@starknet-react/core';
import { contractAddress, contractABI } from '@/lib/consts';
import { LoadingSpinner } from './loader';
import { formatBalance, formatTime } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { stakeUpdateAtom } from '@/lib/store';

export function InfoCard() {
    const stakeUpdateValue = useAtomValue(stakeUpdateAtom);
    const { isConnected } = useAccount();
    const [remainingTime, setRemainingTime] = useState<null | number>(null);

    // get the staking window
    const { data: stakingDuration, isLoading: loadingStakingDuration } =
        useContractRead({
            address: contractAddress,
            abi: contractABI,
            functionName: 'get_remaining_time',
            watch: true,
            parseResult: true
        });

    // get total staked tokens
    const {
        data: totalStaked,
        isLoading: loadingTotalStaked,
        refetch: refetchTotalStaked
    } = useContractRead({
        address: contractAddress,
        abi: contractABI,
        functionName: 'total_Staked',
        watch: true,
        parseResult: true
    });

    useEffect(() => {
        if (stakingDuration) {
            setRemainingTime(Number(stakingDuration));
        }
    }, [stakingDuration]);

    useEffect(() => {
        refetchTotalStaked();
    }, [stakeUpdateValue]);

    useEffect(() => {
        if (remainingTime !== null) {
            const intervalId = setInterval(() => {
                setRemainingTime((prevRemainingTime) => {
                    if (prevRemainingTime === null || prevRemainingTime <= 0) {
                        clearInterval(intervalId);
                        return null;
                    }
                    return prevRemainingTime - 1;
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [remainingTime]);

    return (
        <Card className="w-[350px] border-[#d3500c]">
            <CardHeader>
                <CardTitle>Token Stats</CardTitle>
                <CardDescription>
                    Staking information on the token
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="totalStaked">Staking Window</Label>

                            {isConnected ? (
                                stakingDuration &&
                                remainingTime &&
                                loadingStakingDuration === false ? (
                                    <span className="text-[#A8A29E]">
                                        {formatTime(remainingTime)}
                                    </span>
                                ) : (
                                    <LoadingSpinner className="text-[#EA580C] h-5" />
                                )
                            ) : (
                                <span className="text-[#A8A29E] text-sm">
                                    Connect your wallet
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Total Staked</Label>
                            {isConnected ? (
                                totalStaked !== undefined &&
                                !isNaN(Number(totalStaked)) &&
                                !loadingTotalStaked ? (
                                    <span className="text-[#A8A29E]">
                                        {formatBalance(
                                            Number(totalStaked).toString()
                                        )}
                                    </span>
                                ) : (
                                    <LoadingSpinner className="text-[#EA580C] h-5" />
                                )
                            ) : (
                                <span className="text-[#A8A29E] text-sm">
                                    Connect your wallet
                                </span>
                            )}
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
