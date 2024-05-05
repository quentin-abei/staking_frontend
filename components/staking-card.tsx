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
    useWaitForTransaction
} from '@starknet-react/core';
import { useEffect, useState, useMemo, FormEvent } from 'react';
import { WalletDialog } from './wallet-dialog';
import { contractAddress, contractABI } from '@/lib/consts';
import { cairo, Uint256 } from 'starknet';

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

        console.log('new amount', newAmount);
    };

    const connectWallet = () => {
        setDialogOpen(true);
    };

    const getCurrentUserRewards = useMemo(() => {
        if (!address || !contract) return [];
        return contract.populateTransaction['currentUserRewards']!(address);
    }, [contract, address]);

    const stakeAmount = useMemo(() => {
        if (!address || !contract) return [];
        return contract.populateTransaction['currentUserRewards']!(address);
    }, [contract, address]);

    const {
        writeAsync,
        reset,
        data: tx,
        isError: isSubmitError,
        error: submitError,
        variables
    } = useContractWrite({
        calls: getCurrentUserRewards
    });

    const {
        data: receipt,
        isLoading,
        isError,
        error
    } = useWaitForTransaction({
        hash: tx?.transaction_hash,
        watch: true,
        retry: true,
        refetchInterval: 2000
    });

    useEffect(() => {
        if (tx) {
            console.log('tx', tx);
            console.log('variables', variables);
        }
        if (receipt) {
            console.log('receipt', receipt);
        }
    }, [tx, receipt]);

    return (
        <Card className="w-[650px] border-[#d3500c]">
            <WalletDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <CardHeader>
                <CardTitle>Stake STBULL</CardTitle>
                <CardDescription>
                    Stake your tokens to earn rewards
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
                                <Button onClick={() => writeAsync()}>
                                    Test
                                </Button>
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
