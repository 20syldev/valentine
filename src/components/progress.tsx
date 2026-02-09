interface ProgressProps {
    current: number;
    total: number;
}

export function Progress({ current, total }: ProgressProps) {
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="fixed top-0 left-0 w-full h-1 bg-card z-50">
            <div
                className="h-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
}