'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import {
    useAccount,
    useContract,
    useContractWrite,
    useWaitForTransaction,
    useContractRead
} from '@starknet-react/core';
import { useEffect, useState, useMemo, FormEvent } from 'react';
import { WalletDialog } from './wallet-dialog';
import {
    contractAddress,
    contractABI,
    tokenAddress,
    tokenABI
} from '@/lib/consts';
import { cairo, Uint256 } from 'starknet';
import { LoadingSpinner } from './loader';
import Image from 'next/image';

export function StakingCard() {
    const DECIMALS = 18;
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [amount, setAmount] = useState<string>('');
    const { isConnected, address } = useAccount();
    const { contract } = useContract({
        address: contractAddress,
        abi: contractABI
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newAmount: Uint256 = cairo.uint256(
            (amount as any) * 10 ** DECIMALS
        );

        // console.log('new amount', newAmount);
    };

    const connectWallet = () => {
        setDialogOpen(true);
    };

    // const getCurrentUserRewards = useMemo(() => {
    //     if (!address || !contract) return [];
    //     return contract.populateTransaction['currentUserRewards']!(address);
    // }, [contract, address]);

    // const stakeAmount = useMemo(() => {
    //     if (!address || !contract) return [];
    //     return contract.populateTransaction['stake']!(address);
    // }, [contract, address]);

    // const {
    //     writeAsync,
    //     reset,
    //     data: tx,
    //     isError: isSubmitError,
    //     error: submitError,
    //     variables
    // } = useContractWrite({
    //     calls: getCurrentUserRewards
    // });

    // const {
    //     data: receipt,
    //     isLoading,
    //     isError,
    //     error
    // } = useWaitForTransaction({
    //     hash: tx?.transaction_hash,
    //     watch: true,
    //     retry: true,
    //     refetchInterval: 2000
    // });

    // useEffect(() => {
    //     if (tx) {
    //         console.log('tx', tx);
    //         console.log('variables', variables);
    //     }
    //     if (receipt) {
    //         console.log('receipt', receipt);
    //     }
    // }, [tx, receipt]);

    // to get the balance of the connected account
    const { data: tokenBalance } = useContractRead({
        address: tokenAddress,
        abi: tokenABI,
        args: [address as string],
        functionName: 'balance_of',
        watch: true
    });

    return (
        <Card className="w-[650px] border-[#d3500c]">
            <WalletDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Stake STBULL</span>
                    <span className="flex items-center gap-2">
                        <Image
                            src={'/images/bull-logo.jpeg'}
                            alt="Token logo"
                            width={30}
                            height={30}
                            className="rounded-full"
                        />
                        <span className="text-lg">STBULL</span>
                    </span>
                </CardTitle>
                <CardDescription className="flex justify-between items-center">
                    <span>Stake your tokens to earn rewards</span>
                    {isConnected ? (
                        tokenBalance ? (
                            'Balance ' + tokenBalance.toString()
                        ) : (
                            <LoadingSpinner className="text-[#EA580C]" />
                        )
                    ) : (
                        <span>Connect your wallet</span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount">Amount</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Amount to stake"
                                value={amount}
                                required
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        {isConnected ? (
                            <>
                                <Button className="w-full" type="submit">
                                    Stake
                                </Button>
                                {/* <Button onClick={() => writeAsync()}>
                                    Test
                                </Button> */}
                            </>
                        ) : (
                            <Button className="w-full" onClick={connectWallet}>
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
