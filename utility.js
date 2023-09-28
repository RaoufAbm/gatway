class Utility {
    static hexToAscii(h) {
        let listS = [];
        for (let i = 0; i < h.length; i += 2) {
            listS.push(String.fromCharCode(parseInt(h.substr(i, 2), 16)));
        }
        return listS.join('');
    }

    static asciiToHex(s) {
        let listH = [];
        for (let i = 0; i < s.length; i++) {
            listH.push(s.charCodeAt(i).toString(16).padStart(2, '0'));
        }
        return listH.join('');
    }

    // Func: convert hex data to float in IEEE754 format
    // Param: dataIn: input data in hex
    // Return: outData in float
    static IEEE754HexToFloat(dataIn) {
        const dataFirst = parseInt("0x" + dataIn, 16);
        const dataMiddle = Buffer.alloc(8);
        dataMiddle.writeBigInt64BE(BigInt(dataFirst));
        const dataOutBuffer = dataMiddle.slice(4, 8);
        return dataOutBuffer.readFloatBE();
    }

    // Func: IEEE754->hex, big endian
    // Param: dataIn, float data
    // Return: hex string
    static IEEE754FloatToHex(dataIn) {
        const dataBuffer = Buffer.alloc(4);
        dataBuffer.writeFloatBE(dataIn);
        const dataTemp = dataBuffer.readUInt32BE();
        const dataOut = dataTemp.toString(16).toUpperCase().padStart(8, '0');
        return dataOut;
    }
}
