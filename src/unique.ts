const unique = <T>(value: T, index: number, self: Array<T>): boolean => {
    return self.indexOf(value) === index;
};

export default unique;