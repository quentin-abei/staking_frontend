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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

export function StakingCard() {
    return (
        <Card className="w-[650px] border-[#d3500c]">
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
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="framework">Duration</Label>
                            <Select>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="next">Month</SelectItem>
                                    <SelectItem value="sveltekit">
                                        Year
                                    </SelectItem>
                                    <SelectItem value="astro">
                                        Something
                                    </SelectItem>
                                    <SelectItem value="nuxt">
                                        Something
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="w-full">Connect Wallet</Button>
            </CardFooter>
        </Card>
    );
}
