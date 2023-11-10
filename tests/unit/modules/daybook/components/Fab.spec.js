import Fab from "@/modules/daybook/components/Fab.vue";
import { shallowMount } from "@vue/test-utils";

describe("Testing the FAB component", () => {
  test("Should match to Snapshot", () => {
    const wrapper = shallowMount(Fab);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("Should contain the icon fa-plus by default", () => {
    const wrapper = shallowMount(Fab);
    const iTag = wrapper.find("i");
    expect(iTag.attributes("class")).toContain("fa-plus");
    expect(iTag.attributes("class")).toBeTruthy();
  });

  test("Show show the argument icon: fa-circle", () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: "fa-circle",
      },
    });
    const iTag = wrapper.find("i");
    expect(iTag.attributes("class")).toContain("fa-circle");
    expect(iTag.classes("fa-circle")).toBeTruthy();
  });
  test("should emit the event on:click when click on it", () => {
    const wrapper = shallowMount(Fab);
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
