import { Button } from './ui/button';
import { Info } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function Campaign() {
    return (
        <div>
            <Alert className="border-[#d3500c]">
                <Info className="h-4 w-4" />
                <AlertTitle>Launch Campaign! <span className='text-xs text-[#A8A29E]'>Coming soon...</span></AlertTitle>
                <AlertDescription>
                    You can launch your own campaign with your own token by providing the relevant details.
                </AlertDescription>
            </Alert>
            <Button className='mt-4'>Launch</Button>
        </div>
    );
}
