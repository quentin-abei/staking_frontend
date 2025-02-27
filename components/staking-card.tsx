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
import { LoadingSpinner } from './loader';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { useToast } from './ui/use-toast';
import { useSetAtom } from 'jotai';
import { stakeUpdateAtom } from '@/lib/store';

export function StakingCard() {
    const setStakingUpdate = useSetAtom(stakeUpdateAtom);
    const { toast } = useToast();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [amount, setAmount] = useState<number | null>(null);
    const { isConnected, address } = useAccount();
    const { contract } = useContract({
        address: contractAddress,
        abi: contractABI
    });

    const connectWallet = () => {
        setDialogOpen(true);
    };

    // get the balance of the connected account
    const {
        data: tokenBalance,
        refetch: refetchBalance,
        isFetching: fetchingBalance
    } = useContractRead({
        address: tokenAddress,
        abi: tokenABI,
        args: [address as string],
        functionName: 'balance_of',
        watch: true
    });

    // stake the entered amount of tokens
    const stakeTokenCall = useMemo(() => {
        if (
            !address ||
            !contract ||
            amount === null ||
            !Number.isInteger(amount)
        )
            return [];
        return contract.populateTransaction['stake']!(amount);
    }, [contract, address, amount ?? 0]);

    // stake the entered amount of tokens
    const {
        isPending: stakingPending,
        writeAsync: stakeTokens,
        status: stakeStatus,
        data: stakeTx
    } = useContractWrite({
        calls: stakeTokenCall
    });

    const {
        isLoading: loadingStakeReceipt,
        status: stakeRecepitStatus,
        isError: isStakeError,
        error: stakeError,
        isSuccess: isStakeSuccess
    } = useWaitForTransaction({
        hash: stakeTx?.transaction_hash,
        watch: true
    });

    useEffect(() => {
        if (isStakeError) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: stakeError?.message,
                duration: 2000
            });
        }

        if (isStakeSuccess) {
            toast({
                variant: 'default',
                title: 'Success',
                description: `You successfully staked ${amount} tokens.`,
                duration: 2000
            });
        }
    }, [isStakeError, isStakeSuccess]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (amount !== null && !Number.isInteger(amount)) {
            // Display toast message for float value
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description:
                    'You can only stake whole tokens, please enter an integer value',
                duration: 2000
            });
            return;
        }
        if (amount && amount > Number(tokenBalance)) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description:
                    'The amount you are attempting to stake exceeds the number of tokens you currently own.',
                duration: 2000
            });

            return;
        }
        stakeTokens();
    };

    useEffect(() => {
        if (stakeRecepitStatus === 'success') {
            refetchBalance();
            setStakingUpdate((prev) => prev + 1);
        }
    }, [stakeRecepitStatus]);

    const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = !Number.isNaN(e.target.valueAsNumber)
            ? e.target.valueAsNumber
            : null;

        setAmount(value);
    };

    return (
        <Card className="w-[1024px] border-[#d3500c]">
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
                        tokenBalance !== undefined &&
                        !isNaN(Number(tokenBalance)) &&
                        fetchingBalance === false ? (
                            'Balance ' + tokenBalance.toString()
                        ) : (
                            <LoadingSpinner className="text-[#EA580C] h-5" />
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
                                value={amount ?? ''}
                                required
                                onChange={onNumberChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        {isConnected ? (
                            <>
                                <Button
                                    className=" flex items-center gap-2"
                                    disabled={
                                        stakingPending || loadingStakeReceipt
                                    }
                                    type="submit"
                                >
                                    {stakeStatus === 'pending' ||
                                    loadingStakeReceipt ? (
                                        <>
                                            <LoadingSpinner className="text-white" />
                                            Staking
                                        </>
                                    ) : (
                                        'Stake'
                                    )}
                                </Button>
                            </>
                        ) : (
                            <Button
                                type="button"
                                className="w-1/4"
                                onClick={connectWallet}
                            >
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
