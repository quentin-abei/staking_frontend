import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from './ui/button';
export function Rewards() {
    return (
        <Card className="w-[650px] border-[#d3500c]">
            <CardHeader>
                <CardTitle>Rewards</CardTitle>
                <CardDescription>Claim your earned rewards</CardDescription>
            </CardHeader>
            <CardContent>
                <h1>Rewards</h1>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Laudantium perferendis fugit aperiam porro, neque in. Minus,
                    odit ex obcaecati voluptates molestias tempore assumenda
                    exercitationem optio ab laborum necessitatibus quaerat
                    inventore!
                </p>
                <Button className="w-full mt-5">Claim</Button>
            </CardContent>
        </Card>
    );
}
