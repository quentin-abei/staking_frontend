'use client';
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from './ui/dialog';
import { useConnect } from '@starknet-react/core';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';

export function WalletDialog({
    dialogOpen,
    setDialogOpen
}: {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { connect, connectors, error, isError, isSuccess } = useConnect();
    const { toast } = useToast();

    useEffect(() => {
        if (isError) {
            const data = JSON.stringify(error);
            const parsedError = JSON.parse(data);

            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: parsedError.message,
                duration: 2000
            });
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            setDialogOpen(false);
        }
    }, [isSuccess]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center">
                <DialogHeader>
                    <DialogTitle>Connect to a Wallet</DialogTitle>
                </DialogHeader>
                <ul className="flex flex-col gap-4 mt-4 w-full">
                    {connectors.map((connector) => (
                        <li key={connector.id}>
                            <Button
                                className="w-full"
                                onClick={() => connect({ connector })}
                            >
                                {connector.name}
                            </Button>
                        </li>
                    ))}
                </ul>
                <DialogFooter className="flex flex-col mt-4">
                    <p className="block">New to Starknet?</p>
                    <Link
                        href="https://www.starknet.io/en/ecosystem/wallets"
                        target="__blank"
                        rel="noreferrer noopener"
                        className="block underline"
                    >
                        Learn more about wallets
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
