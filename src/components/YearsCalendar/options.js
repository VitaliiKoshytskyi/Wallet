export const options = () => {
    const startYear = 1900;
    const endYear = 2023;
    const years = [];

    for (let i = startYear; i <= endYear; i++) {
        const element = {label: i.toString(), value: i};
        years.push(element)
    }

    const result = years.sort((prew, next) => next.value - prew.value);

    return result;
}