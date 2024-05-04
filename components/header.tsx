'use client';
import { WalletDialog } from './wallet-dialog';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { StarknetSVG } from './starknet-svg';
import { ModeToggle } from './mode-toggle';
import { useAccount } from '@starknet-react/core';
import { DisconnectWallet } from './disconnect-dialog';

export function Header() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [disconnectDialog, setDisconnectDialog] = useState<boolean>(false);
    const connectWallet = () => {
        setDialogOpen(true);
    };

    const { address, isConnected } = useAccount();

    const truncateAddress = (addr: string | undefined) => {
        return `${addr?.slice(0, 6)}...${addr?.slice(-3)}`;
    };

    return (
        <div className="p-6">
            <WalletDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
            />
            <DisconnectWallet
                dialogOpen={disconnectDialog}
                setDialogOpen={setDisconnectDialog}
            />
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <Image
                        src={'/images/bull-logo.jpeg'}
                        alt="logo"
                        height={50}
                        width={50}
                        className="rounded-full"
                    />
                    <h1 className="font-bold italic">STUBULL</h1>
                </div>
                <div className="flex gap-4">
                    {isConnected ? (
                        <>
                            <Button className=" border border-orange-500 flex text-orange-500 dark:text-white gap-2 items-center bg-transparent hover:bg-transparent">
                                <StarknetSVG height="25" width="25" /> Starknet
                                mainnet
                            </Button>
                            <div>
                                <Button
                                    className="flex gap-2 items-center"
                                    onClick={() => {
                                        setDisconnectDialog(true);
                                    }}
                                >
                                    <StarknetSVG height="25" width="25" />{' '}
                                    {truncateAddress(address)}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button onClick={connectWallet}>Connect Wallet</Button>
                    )}

                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}
