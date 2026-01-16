import { main } from "../src/main";
import output from "./output";

test("Golden master test", () => {
  expect(main().replace(/\s/g, "")).toEqual(output.replace(/\s/g, ""));
});
