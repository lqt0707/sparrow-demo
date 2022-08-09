import { createRenderer } from "../../src/renderer/renderer";
import { createDiv, mount } from "../utils";

describe("createRenderer", () => {
  test(
    "createContext(width,height) returns expected context.",
    () => {
      const render = createRenderer(600, 400);
      const node = render.node();
      const group = render.group();

      expect(node.tagName).toBe("svg");
      expect(node.getAttribute("width")).toBe("600");
      expect(node.getAttribute("height")).toBe("400");
      expect(node.getAttribute("viewBox")).toBe("0 0 600 400");

      expect(group.tagName).toBe("g");
      expect(group.parentNode).toBe(node);

      mount(createDiv(), node);
    }
  );
});
