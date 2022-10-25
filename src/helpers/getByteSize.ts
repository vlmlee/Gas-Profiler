const byteSize = (str: string): number => {
    return new Blob([str]).size;
};

export default byteSize;
