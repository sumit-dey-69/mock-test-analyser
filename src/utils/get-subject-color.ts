function getSubjectColor(subject: string): string {
    const colors: Record<string, string> = {
        mathematics: "#3b82f6",
        logicalReasoning: "#f59e0b",
        computerScience: "#10b981",
        generalEnglish: "#ef4444",
    };
    return colors[subject] || "#8884d8";
}

export default getSubjectColor;
