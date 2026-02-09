import { notFound } from "next/navigation";

import { challenges } from "@/challenges";
import { Challenge } from "@/components/challenge";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return challenges.map((_, index) => ({
        id: (index + 1).toString(),
    }));
}

export default async function ChallengePage({ params }: Props) {
    const { id } = await params;
    const challengeIndex = parseInt(id, 10);

    if (isNaN(challengeIndex) || challengeIndex < 1 || challengeIndex > challenges.length) {
        notFound();
    }

    return <Challenge />;
}