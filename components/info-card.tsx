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

import { useContractRead, useBlock, useAccount } from '@starknet-react/core';
import { contractAddress, contractABI } from '@/lib/consts';
import { LoadingSpinner } from './loader';
import { formatBalance, formatTime } from '@/lib/utils';

export function InfoCard() {
    const { isConnected } = useAccount();

    // get the staking window
    const { data: stakingDuration, isLoading: loadingStakingDuration } =
        useContractRead({
            address: contractAddress,
            abi: contractABI,
            functionName: 'get_staking_duration',
            watch: true,
            parseResult: true
        });

    // get total staked tokens
    const { data: totalStaked, isLoading: loadingTotalStaked } =
        useContractRead({
            address: contractAddress,
            abi: contractABI,
            functionName: 'total_Staked',
            watch: true,
            parseResult: true
        });

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
                            <Label htmlFor="totalStaked">
                                Staking Duration
                            </Label>

                            {isConnected ? (
                                stakingDuration &&
                                loadingStakingDuration === false ? (
                                    <span className="text-[#A8A29E]">
                                        {formatTime(
                                            stakingDuration?.toString()
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
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Total Staked</Label>
                            {isConnected ? (
                                totalStaked && loadingTotalStaked === false ? (
                                    <span className="text-[#A8A29E]">
                                        {formatBalance(totalStaked?.toString())}
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
