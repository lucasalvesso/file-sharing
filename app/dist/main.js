"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    try {
        console.log("evento: ", JSON.stringify(event.body));
        return {
            statusCode: 200,
        };
    }
    catch (e) {
        console.error(e);
        return {
            statusCode: 400,
        };
    }
};
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR08sTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUMxQixLQUFjLEVBQ2lCLEVBQUU7SUFDakMsSUFBSTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFFcEQsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1NBQ2hCLENBQUM7S0FDSDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQixPQUFPO1lBQ0wsVUFBVSxFQUFFLEdBQUc7U0FDaEIsQ0FBQztLQUNIO0FBQ0gsQ0FBQyxDQUFDO0FBZlcsUUFBQSxPQUFPLFdBZWxCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGFuZGxlclJvdXRlUmVzcG9uc2UgfSBmcm9tIFwiLi9pbmZyYXN0Y3J1Y3R1cmUvaW50ZXJmYWNlL0hhbmRsZXJSb3V0ZVJlc3BvbnNlXCI7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSBcImV4cHJlc3NcIjtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSBhc3luYyAoXG4gIGV2ZW50OiBSZXF1ZXN0XG4pOiBQcm9taXNlPEhhbmRsZXJSb3V0ZVJlc3BvbnNlPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc29sZS5sb2coXCJldmVudG86IFwiLCBKU09OLnN0cmluZ2lmeShldmVudC5ib2R5KSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIHJldHVybiB7XG4gICAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgfTtcbiAgfVxufTtcbiJdfQ==