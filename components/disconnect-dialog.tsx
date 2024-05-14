'use client';
import Image from 'next/image';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useDisconnect, useAccount } from '@starknet-react/core';
import { FaCopy } from 'react-icons/fa';
import { IoMdDoneAll } from 'react-icons/io';
import { useEffect, useState } from 'react';

export function DisconnectWallet({
    dialogOpen,
    setDialogOpen
}: {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { disconnect } = useDisconnect();
    const { address, connector } = useAccount();
    const [copySuccess, setCopySuccess] = useState(false);

    const truncateAddress = (addr: string | undefined) => {
        return `${addr?.slice(0, 6)}...${addr?.slice(-7)}`;
    };

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(address || '')
            .then(() => {
                setCopySuccess(true);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    useEffect(() => {
        setCopySuccess(false);
    }, [dialogOpen]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="sm:max-w-[425px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Account Overview</DialogTitle>
                </DialogHeader>
                <div className="flex justify-between items-center">
                    <h1 className="text-lg">
                        Connected with{' '}
                        <span className="font-bold text-[#EA580C]">
                            {connector?.name}
                        </span>
                    </h1>{' '}
                    <Button
                        onClick={() => {
                            // disconnect the wallet and close the dialog
                            disconnect();
                            setDialogOpen(false);
                        }}
                    >
                        Disconnect
                    </Button>
                </div>

                <div className="border border-[#EA580C] rounded-lg p-4 flex gap-2 items-center">
                    <Image
                        src={
                            connector?.name === 'Argent X'
                                ? '/images/argent.svg'
                                : '/images/braavos.svg'
                        }
                        height={45}
                        width={45}
                        alt="Bravoos wallet"
                    />
                    <p className="text-xl">{truncateAddress(address)}</p>
                </div>

                <div
                    onClick={copyToClipboard}
                    className={`flex gap-2 items-center w-fit cursor-pointer ${copySuccess ? 'hidden' : ''}`}
                >
                    <div>
                        <FaCopy />
                    </div>
                    <p>Copy address</p>
                </div>
                <div
                    className={`flex gap-2 items-center w-fit cursor-pointer ${copySuccess ? 'block' : 'hidden'}`}
                >
                    <div>
                        <IoMdDoneAll />
                    </div>
                    <p>Copied</p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
