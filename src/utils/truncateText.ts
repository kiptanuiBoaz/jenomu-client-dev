export const truncateText = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...';
    }
    return description;
};