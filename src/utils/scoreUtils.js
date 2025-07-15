export const getColorClass = (score) => {
    if(score >= 5) return "bg-green-100 text-green-800";
    if(score >= 4) return "bg-blue-100 text-blue-800";
    if(score >= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
};

export const getBorderColor = (score) => {
    if(score >= 5) return "border-green-500";
    if(score >= 4) return "border-blue-500";
    if(score >= 2) return "border-yellow-500";
    return "border-red-500";
};

export const getProgressColor = (score) => {
    if(score >= 5) return "bg-green-500";
    if(score >= 4) return "bg-blue-500";
    if(score >= 2) return "bg-yellow-500";
    return "bg-red-500";
};

export const getIcon = (score) => {
    if(score >= 5) return "👍";
    if(score >= 4) return "👌";
    if(score >= 2) return "⚠️";
    return "❌";
};