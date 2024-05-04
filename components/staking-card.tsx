'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
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
import { useEffect, useState, useMemo } from 'react';
import { WalletDialog } from './wallet-dialog';
import { contractAddress, contractABI } from '@/lib/consts';

export function StakingCard() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const { isConnected, address } = useAccount();
    const { contract } = useContract({
        address: contractAddress,
        abi: contractABI
    });
    // currentUserRewards

    const connectWallet = () => {
        setDialogOpen(true);
    };

    const getCurrentUserRewards = useMemo(() => {
        if (!address || !contract) return [];
        return contract.populateTransaction['currentUserRewards']!(address);
    }, [contract, address]);

    const {
        write,
        reset,
        data: tx,
        isError: isSubmitError,
        error: submitError
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
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Amount</Label>
                            <Input
                                id="name"
                                type="number"
                                placeholder="Amount to stake"
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                {isConnected ? (
                    <>
                        <Button className="w-full">Stake</Button>
                        <Button onClick={() => write()}>Test</Button>
                    </>
                ) : (
                    <Button className="w-full" onClick={connectWallet}>
                        Connect Wallet
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
