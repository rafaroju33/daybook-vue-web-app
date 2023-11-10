import AboutView from "@/views/AboutView.vue";
import { shallowMount } from "@vue/test-utils";

describe("Test AboutView component", () => {
  test("should redender the component correctly", () => {
    const wrapper = shallowMount(AboutView);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
