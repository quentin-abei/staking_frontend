'use client';
import { WalletDialog } from './wallet-dialog';
import { Button } from './ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { StarknetSVG } from './starknet-svg';
import { ModeToggle } from './mode-toggle';

export function Header() {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const connectWallet = () => {
        setDialogOpen(true);
    };

    return (
        <div className="p-6">
            <WalletDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
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
                    <Button className=" border border-orange-500 flex text-orange-500 dark:text-white gap-2 items-center bg-transparent hover:bg-transparent">
                        <StarknetSVG height="25" width="25" /> Starknet mainnet
                    </Button>
                    <Button onClick={connectWallet}>Connect Wallet</Button>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}
