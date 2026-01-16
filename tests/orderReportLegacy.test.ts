import { run } from "../legacy/orderReportLegacy";
import output from "./output";

test("Golden master test", () => {
  expect(run().replace(/\s/g, "")).toEqual(output.replace(/\s/g, ""));
});
