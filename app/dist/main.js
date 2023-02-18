"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.handler = async (event) => {
    try {
        console.log(event.body);
        return {
            statusCode: 200,
        };
    }
    catch (e) {
        console.error(e);
    }
};
//# sourceMappingURL=main.js.map